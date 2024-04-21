import { configModule } from './controller.js'

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

    // Constructor to initialize the animation engine with target element, animation sequence, and control parameters
    constructor({ targetElement, animationSequence, controlParams = {} }) {
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
    }

    // Method to schedule an event listener on the animation engine
    scheduleEvent = (eventType = 'click') => {
        // Adds an event listener that starts the animation on the specified event type
        this.#animationEngine.addEventListener(eventType, () => this.#animationEngine.start());
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



/*
 * Usage:
 * 
 * // Import the necessary classes from the animationFactory module
 * import { Animator, AnimationFactory, AnimationEngine } from './animationFactory.js';
 * 
 * // Instantiate the AnimationFactory class
 * // Pass an object with the HTML element to animate and the sequence of animations
 * const animationFactory = new AnimationFactory({
 *     item: document.getElementById('item'), // The HTML element to animate
 *     animationsSequence: [ // The sequence of animations to apply
 *         { className: 'fadeIn', duration: 300 }, // Each animation is an object with a CSS class name and duration
 *         { className: 'expand', duration: 200 },
 *         { className: 'settle', duration: 100 },
 *     ],
 * });
 * 
 * // Start the animation sequence
 * animationFactory.start();
 * 
 * // Instantiate the AnimationEngine class
 * // Pass an object with the target HTML element, the animation sequence, and control parameters
 * const animationEngine = new AnimationEngine({
 *     targetElement: document.getElementById('item'), // The HTML element to animate
 *     animationSequence: [ // The sequence of animations to apply
 *         { className: 'fadeIn', duration: 300 }, // Each animation is an object with a CSS class name and duration
 *         { className: 'expand', duration: 200 },
 *         { className: 'settle', duration: 100 },
 *     ],
 *     controlParams: { loopCount: 1, speed: 1.5 }, // Control parameters for the animation sequence
 * });
 * 
 * // Schedule an event to trigger the start of the animation sequence
 * // In this case, the animation will start when the target element is clicked
 * animationEngine.scheduleEvent('click');
 * 
 * // Configure the animation sequence with new parameters
 * // This will update the speed, loop count, and transitions of the animation sequence
 * // Configure the animation
 * animationEngine.configureAnimation({ speed: 2, loopCount: 2, transitions: ['ease-in', 'ease-out'] });
 * 
 * // Get the animation controls
 * const controls = animationEngine.animationControls();
 * 
 * // Adjust the animation speed
 * controls.adjustAnimationSpeed(2);
 * 
 * // Modify the animation loop count
 * // Example: controls.adjustAnimationLoopCount(3);
 * // The above example will set the animation loop count to 3.
 * // The loop count is a parameter that determines the repetition of the animation sequence.
 * // If the loop count is set to 1, the animation sequence will play once and then halt.
 * // If the loop count is set to 0, the animation sequence will continue to play indefinitely until it is manually stopped.
 */
