import {
    mainDisplay,
    mainLabel,
    subDisplay,
    subLabel,
    setDisplay,
    playButton
} from './dom-selections.js';

export function setMainDisplay(text) {
    setValue(mainDisplay, text);
}

export function setMainLabel(text) {
    setTextContent(mainLabel, text);
}

export function setSubDisplay(text) {
    setValue(subDisplay, text);
}

export function setSubLabel(text) {
    setTextContent(subLabel, text);
}

export function setBtnIconId(id) {
    playButton.firstElementChild.setAttribute('href', `#${id}`);
}

export function setSetDisplay(text) {
    setValue(setDisplay, text);
}

function setTextContent(element, text) {
    element.textContent = text;
}

export function setValue(element, value) {
    element.value = value;
}