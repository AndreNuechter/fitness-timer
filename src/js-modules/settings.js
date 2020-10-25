export default new Proxy(JSON.parse(localStorage.getItem('fitness-timer-settings')) || {
    durations: [90, 15],
    numberOfSets: 6
}, {
    set(obj, key, val) {
        if (key in obj) {
            Reflect.set(obj, key, val);
            localStorage.setItem('fitness-timer-settings', JSON.stringify(obj));
            return true;
        }
        return false;
    }
});