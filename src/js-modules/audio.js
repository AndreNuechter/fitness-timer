const ctx = new window.AudioContext();
const masterGainNode = ctx.createGain();

masterGainNode.connect(ctx.destination);

export default (
    freq,
    { volume = 0.25, duration = 200 } = { volume: 0.25, duration: 200 }
) => {
    const osc = ctx.createOscillator();

    masterGainNode.gain.value = volume;

    osc.connect(masterGainNode);
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.start();
    setTimeout(() => osc.stop(), duration);
};

export const frequencies = {
    countdown: 2000,
    set: 1500,
    break: 1000,
    finish: 1750
};