export const interactionTypes = new Set(['adding', 'alerting', 'dragging', 'dropping', 'sorting', 'deleting']);

export class InteractionHandler {
    #domElement;
    #interactionTypes;
    #timeoutId;

    constructor(domElement, interactionTypes) {
        this.#domElement = domElement;
        this.#interactionTypes = interactionTypes;
        this.#timeoutId = null;
    }

    addInteractionType(interactionType) {
        this.#interactionTypes.add(interactionType);
    }

    handleInteraction(interactionType) {
        if (this.#interactionTypes.has(interactionType)) {
            this.#resetInteractionClasses();
            this.#applyInteractionClass(interactionType);
            this.#resetClassAfterTimeout(interactionType);
        } else {
            console.error(`Interaction type "${interactionType}" does not exist.`);
        }
    }

    onInteraction(callback) {
        this.#interactionTypes.forEach(type => {
            this.#domElement.addEventListener(type, () => {
                callback(type);
            });
        });
    }

    #resetInteractionClasses() {
        this.#interactionTypes.forEach(type => {
            this.#domElement.classList.remove(type);
        });
    }

    #applyInteractionClass(interactionType) {
        this.#domElement.classList.add(interactionType);
    }

    #resetClassAfterTimeout(interactionType, timeout = 1000) {
        this.#clearTimeout();
        this.#timeoutId = setTimeout(() => this.#domElement.classList.remove(interactionType), timeout);
    }

    #clearTimeout() {
        if (this.#timeoutId !== null) {
            clearTimeout(this.#timeoutId);
            this.#timeoutId = null;
        }
    }

    debounceInteraction(callback, delay = 1000) {
        this.#clearTimeout();
        this.#timeoutId = setTimeout(callback, delay);
    }
}

