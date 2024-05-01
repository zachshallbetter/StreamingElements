import { configModule } from './configHandler.js'
import { EventManager } from './eventManager.js'; // Importing the EventManager class

export class ScheduleSequencer {
    #animator;

    constructor({ item, animationsSequence }) {
        this.#animator = new Animator({ item, animations: animationsSequence });
    }

    start() {
        this.#animator.startAnimation();
    }
}

// Defines a class to manage animation engines
export class AnimationEngine {
    #animationEngine; // Private field to hold the animation engine instance
    #eventManager; // Instance of EventManager to manage events

    // Constructor to initialize the animation engine with target element, animation sequence, and control parameters
    constructor({ targetElement, animationSequence, controlParams = {} }) {
        if (!targetElement) {
            throw new Error('No target element provided.');
        }
        // Creates an animation engine with provided configurations and default values for speed, loopCount, and transitions
        this.#animationEngine = configModule.createAnimationEngine(targetElement, {
            animationSequence,
            controlParams: {
                ...controlParams,
                speed: controlParams.speed || 1, // Default speed is 1
                loopCount: controlParams.loopCount || "infinite", // Default loopCount is "infinite"
                transitions: controlParams.transitions || [] // Default transitions is an empty array
            }
        });
        if (!this.#animationEngine) {
            throw new Error(`Failed to create animation engine for target element: ${targetElement}`);
        }
        this.#eventManager = new EventManager(); // Initializing EventManager
    }

    // Method to schedule an event listener on the animation engine
    scheduleEvent = (eventType = 'click') => {
        // Adds an event listener that starts the animation on the specified event type using EventManager
        this.#eventManager.addEventListener(eventType, () => this.#animationEngine.start());
    };

    // Method to remove an event listener from the animation engine
    removeEvent = (eventType) => {
        // Removes an event listener using EventManager
        this.#eventManager.removeEventListener(eventType);
    };

    // Method to configure animation parameters such as speed, loopCount, and transitions
    configureAnimation = ({ speed, loopCount, transitions }) => {
        // Updates the animation configuration with new parameters
        this.#animationEngine.updateAnimationConfig({
            speed,
            loopCount,
            transitions
        });
    };

    // Method to return an object containing functions to adjust animation settings
    animationControls = () => ({
        // Function to adjust animation speed
        adjustAnimationSpeed: (newSpeed) => { this.#animationEngine.setSpeed(newSpeed); },
        // Function to adjust animation loop count
        adjustAnimationLoopCount: (newLoopCount) => { this.#animationEngine.setLoopCount(newLoopCount); },
        // Function to adjust animation transitions
        adjustTransitions: (newTransitions) => { this.#animationEngine.setTransitions(newTransitions); },
    });
}
