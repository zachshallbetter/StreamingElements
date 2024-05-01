import { configModule } from './configHandler.js'  // Updated import path
import { EventManager } from './eventManager.js';  // Import EventManager for event handling

export default class AnimationController {
    #item;
    #animationEngine;
    #eventManager;  // Using EventManager for event handling

    constructor(item, configType) {
        this.#validateHTMLElement(item);
        this.#validateString(configType);

        this.#item = item;
        this.#animationEngine = configModule.createAnimationEngine(item, configType);
        if (!this.#animationEngine) {
            throw new Error(`Failed to create animation engine for config type: ${configType}`);
        }
        this.#eventManager = new EventManager();  // Initialize EventManager
        this.#initialize();
    }
    #initialize() {
        const animationConfig = this.#animationEngine.animationControls();
        animationConfig.forEach(({ type, className, duration }) => {
            const listener = () => this.#animationEngine.startAnimation(className, duration);
            this.#eventManager.addEvent(type, listener, this.#item);  // Use EventManager to manage events
        });
    }

    addEventListener(type, listener) {
        this.#validateString(type);
        this.#validateFunction(listener);

        this.#eventManager.addEvent(type, listener, this.#item);  // Use EventManager to manage events
    }

    removeEventListener(type) {
        this.#validateString(type);

        this.#eventManager.removeEvent(type, this.#item);  // Use EventManager to manage events
    }

    updateAnimationConfig(configType) {
        this.#validateString(configType);

        this.#animationEngine = configModule.createAnimationEngine(this.#item, configType);
        if (!this.#animationEngine) {
            throw new Error(`Failed to update animation engine for config type: ${configType}`);
        }
        this.#eventManager.removeAllEvents(this.#item);  // Use EventManager to manage events
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