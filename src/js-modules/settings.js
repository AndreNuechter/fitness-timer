const settings = JSON.parse(localStorage.getItem('fitness-timer-settings')) || {
    durations: [90, 15],
    numberOfSets: 6
};
const saveSettings = () => localStorage.setItem('fitness-timer-settings', JSON.stringify(settings));

export default {
    get durations() {
        return settings.durations;
    },
    setDuration(id, val) {
        settings.durations[id] = val;
        saveSettings();
    },
    get numberOfSets() {
        return settings.numberOfSets;
    },
    set numberOfSets(val) {
        settings.numberOfSets = val;
        saveSettings();
    }
};