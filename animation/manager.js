import { configModule } from './animationController.js'

export default class AnimationManager {
    #item;
    #animationEngine;
    #eventListeners;

    constructor(item, configType) {
        this.#validateHTMLElement(item);
        this.#validateString(configType);

        this.#item = item;
        this.#animationEngine = configModule.createAnimationEngine(item, configType);
        if (!this.#animationEngine) {
            throw new Error(`Failed to create animation engine for config type: ${configType}`);
        }
        this.#eventListeners = new Map();
        this.#initialize();
    }

    #initialize() {
        const animationConfig = this.#animationEngine.animationControls();
        animationConfig.forEach(({ type, className, duration }) => {
            const listener = () => this.#animationEngine.startAnimation(className, duration);
            this.#item.addEventListener(type, listener);
            this.#eventListeners.set(type, listener);
        });
    }

    addEventListener(type, listener) {
        this.#validateString(type);
        this.#validateFunction(listener);

        this.#item.addEventListener(type, listener);
        this.#eventListeners.set(type, listener);
    }

    removeEventListener(type) {
        this.#validateString(type);

        const listener = this.#eventListeners.get(type);
        if (listener) {
            this.#item.removeEventListener(type, listener);
            this.#eventListeners.delete(type);
        }
    }

    updateAnimationConfig(configType) {
        this.#validateString(configType);

        this.#animationEngine = configModule.createAnimationEngine(this.#item, configType);
        if (!this.#animationEngine) {
            throw new Error(`Failed to update animation engine for config type: ${configType}`);
        }
        this.#eventListeners.forEach((listener, type) => {
            this.#item.removeEventListener(type, listener);
        });
        this.#eventListeners.clear();
        this.#initialize();
    }

    #validateHTMLElement(element) {
        if (!(element instanceof HTMLElement)) {
            throw new TypeError('Expected an instance of HTMLElement as the first argument');
        }
    }

    #validateString(value) {
        if (typeof value !== 'string') {
            throw new TypeError('Expected a string');
        }
    }

    #validateFunction(value) {
        if (typeof value !== 'function') {
            throw new TypeError('Expected a function');
        }
    }
}