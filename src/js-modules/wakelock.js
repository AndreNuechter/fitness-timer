export default (async () => {
    if (!('WakeLock' in window && 'request' in window.WakeLock)) return;

    const getWakeLock = () => navigator.wakeLock.request('screen');
    await getWakeLock();

    document.addEventListener('visibilitychange', async () => {
        if (document.visibilityState === 'visible') {
            await getWakeLock();
        }
    });
})();