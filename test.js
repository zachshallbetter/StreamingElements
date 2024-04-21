import { Animator } from './animation/animator.js/index.js';

class InteractiveElement {
    #domElement;
    #animator;
    #interactionTypes;

    constructor({ elementId, interactionTypes, animationSequence }) {
        this.#domElement = document.getElementById(elementId);
        this.#interactionTypes = new Set(interactionTypes);
        this.#animator = new Animator({
            item: this.#domElement,
            animations: animationSequence
        });
    }

    initialize() {
        this.#interactionTypes.forEach(type => {
            this.#domElement.addEventListener(type, () => {
                this.#animator.startAnimation();
            });
        });
    }
}

const elements = [
    { elementId: 'item', interactionTypes: ['click'], animationSequence: [{ className: 'fadeIn', duration: 300 }] },
    { elementId: 'newItem', interactionTypes: ['click'], animationSequence: [{ className: 'grow-shadow', duration: 300 }, { className: 'increase-size', duration: 300 }] },
    { elementId: 'extraItem', interactionTypes: ['click'], animationSequence: [{ className: 'rotate', duration: 300 }, { className: 'change-color', duration: 300 }] }
];

elements.forEach(({ elementId, interactionTypes, animationSequence }) => {
    const element = new InteractiveElement({ elementId, interactionTypes, animationSequence });
    element.initialize();
});
// To utilize the InteractiveElement class, follow these steps:
// 1. Import the class into your project.
// 2. Instantiate the class by passing an object with the elementId, interactionTypes, and animationSequence.
// 3. Call the initialize method to activate the interactions and animations.

// Example:
// const interactiveElement = new InteractiveElement({
//     elementId: 'yourElementId',
//     interactionTypes: ['click', 'hover'],
//     animationSequence: [
//         { className: 'animation1', duration: 500 },
//         { className: 'animation2', duration: 300 }
//     ]
// });
// interactiveElement.initialize();
