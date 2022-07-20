
export class SectionElement {
    #container;
    constructor(containerSelector) {
        this.#container = document.querySelector(containerSelector);
    };


    addItem(element) {
        this.#container.prepend(element);
    }
}