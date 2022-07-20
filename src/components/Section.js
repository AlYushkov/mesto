export class Section {
    #renderer;
    #container;
    #intialArray;
    constructor({ data, renderer }, containerSelector) {
        this.#intialArray = data;
        this.#renderer = renderer;
        this.#container = document.querySelector(containerSelector);
    }

    renderItems() {
        if (!Array.isArray(this.#intialArray)) return;
        this.#intialArray.forEach(item => {
            this.#renderer(item);
        });
    }
    addItem(element) {
        this.#container.prepend(element);
    }
}