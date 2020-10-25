const ctx = new window.AudioContext();
const masterGainNode = ctx.createGain();
masterGainNode.gain.value = 0.25;
masterGainNode.connect(ctx.destination);

export default (freq, duration = 200) => {
    const osc = ctx.createOscillator();

    osc.connect(masterGainNode);
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.start();
    setTimeout(() => osc.stop(), duration);
};

export const frequencies = {
    countdown: 2500,
    set: 220,
    break: 1000,
    finish: 1500
};