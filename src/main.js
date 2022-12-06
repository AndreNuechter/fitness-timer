import './js-modules/service-worker-init.js';
import wakeLock from './js-modules/wakelock.js';
import playSound, { frequencies } from './js-modules/audio.js';
import {
    app,
    durationVisualization,
    mainDisplay,
    playButton,
    resetButton,
    setDisplay,
    subDisplay
} from './js-modules/dom-selections.js';
import {
    setBtnIconId,
    setMainDisplay,
    setMainLabel,
    setSetDisplay,
    setSubDisplay,
    setSubLabel,
    setValue
} from './js-modules/dom-manipulations.js';
import settings from './js-modules/settings.js';

const labelTexts = ['Hussle', 'Chill'];
const btnIconIds = ['play', 'pause'];
const digitRe = /^\d+$/;
let playing;
let resting;
let remainingSets;
let currentlyRemainingSeconds;
let lastTick;
let timerId;
let setDurationVisualLength;
let durationsOnePercent;

window.addEventListener('DOMContentLoaded', () => {
    init();
    reset();
}, { once: true });
app.addEventListener('focusin', ({ target }) => {
    if (!playing && target.tagName === 'INPUT') {
        target.select();
    }
});
setDisplay.addEventListener('change', ({ target: { value } }) => {
    if (digitRe.test(value)) {
        settings.numberOfSets = Number(value);
        reset();
    } else setSetDisplay(settings.numberOfSets);
});
mainDisplay.addEventListener('change', ({ target }) => {
    setDuration(Number(resting), target);
});
subDisplay.addEventListener('change', ({ target }) => {
    setDuration(Number(!resting), target);
});
playButton.addEventListener('click', togglePlaying);
resetButton.addEventListener('click', reset);

function init() {
    const pathLength = durationVisualization.getTotalLength();
    const onePercentLength = pathLength * 0.01;

    setDurationVisualLength = (percentage) => {
        durationVisualization.style.strokeDashoffset = `-${onePercentLength * (100 - percentage)}`;
    };
    setDurationOnePercent();
    durationVisualization.style.strokeDasharray = pathLength;
}

function reset() {
    lastTick = undefined;
    playing = false;
    resting = false;
    remainingSets = settings.numberOfSets;
    [currentlyRemainingSeconds] = settings.durations;
    clearTimer();
    setDurationVisualLength(100);
    setSetDisplay(remainingSets);
    setMainDisplay(currentlyRemainingSeconds);
    setMainLabel(labelTexts[0]);
    setSubDisplay(settings.durations[1]);
    setSubLabel(labelTexts[1]);
    setBtnIconId(btnIconIds[0]);
    playButton.addEventListener('click', startWorkout, { once: true });
    app.classList.remove('timer-is-running');
    wakeLock.release();
    resetButton.classList.add('hidden');
}

function setDurationOnePercent() {
    durationsOnePercent = settings.durations.map((num) => num * 0.01);
}

function togglePlaying() {
    playing = !playing;

    setBtnIconId(btnIconIds[Number(playing)]);

    if (playing) {
        timerId = requestAnimationFrame(animationLoop);
        app.classList.add('timer-is-running');
        wakeLock.request();
    } else {
        clearTimer();
        app.classList.remove('timer-is-running');
        wakeLock.release();
    }
}

function setDuration(currentRole, target) {
    const { value } = target;
    if (digitRe.test(value)) {
        settings.setDuration(currentRole, Number(value));
        setDurationOnePercent();
        reset();
    } else setValue(target, settings.durations[currentRole]);
}

function startWorkout() {
    playSound(frequencies.set, { duration: 600 });
    resetButton.classList.remove('hidden');
}

function animationLoop(timestamp) {
    if (lastTick === undefined) {
        lastTick = timestamp;
    }

    timerId = requestAnimationFrame(animationLoop);

    if ((timestamp - lastTick) >= 1000) {
        lastTick = timestamp;
        countDown();
    }
}

function countDown() {
    currentlyRemainingSeconds -= 1;

    const phaseIsOver = currentlyRemainingSeconds < 0;

    setMainDisplay(currentlyRemainingSeconds);
    setDurationVisualLength(phaseIsOver
        ? 100
        : currentlyRemainingSeconds / durationsOnePercent[Number(resting)]
    );

    if (phaseIsOver) {
        resting = !resting;

        if (!resting) remainingSets -= 1;

        if (!remainingSets) {
            playSound(frequencies.finish, { duration: 700 });
            reset();
            return;
        }

        currentlyRemainingSeconds = settings.durations[Number(resting)];

        playSound(frequencies[resting ? 'break' : 'set']);
        setSetDisplay(remainingSets);
        setMainDisplay(currentlyRemainingSeconds);
        setSubDisplay(settings.durations[Number(!resting)]);
        setMainLabel(labelTexts[Number(resting)]);
        setSubLabel(labelTexts[Number(!resting)]);
    } else if (currentlyRemainingSeconds < 10) {
        playSound(
            frequencies.countdown,
            { volume: 0.25 + (10 - currentlyRemainingSeconds) * 1.3 }
        );
    }
}

function clearTimer() {
    cancelAnimationFrame(timerId);
}