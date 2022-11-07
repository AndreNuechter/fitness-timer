import serviceWorkerUrl from './service-worker?worker&url';

export default (() => {
    window.addEventListener('DOMContentLoaded', () => {
        if ('serviceWorker' in window.navigator) {
            window.navigator.serviceWorker
                .register(serviceWorkerUrl);
        }
    }, { once: true });
})();