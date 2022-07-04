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
        this.#intialArray.forEach(item => {
            const element = this.#renderer(item);
            this.addItem(element);
        });
    }
    addItem(element) {
        this.#container.prepend(element);
    }
}