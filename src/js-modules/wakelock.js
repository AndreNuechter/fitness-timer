export default (() => {
    let wakeLockSentinel;

    async function request() {
        wakeLockSentinel = await navigator.wakeLock?.request?.('screen');
    }

    async function release() {
        if (!wakeLockSentinel) return;
        await wakeLockSentinel.release();
        wakeLockSentinel = undefined;
    }

    return { request, release };
})();