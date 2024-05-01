export class Animator {
    #item;
    #animations;
    #currentAnimationIndex = 0;
    #isPaused = false;

    constructor({ item, animations }) {
        if (!item || !(item instanceof HTMLElement)) {
            throw new Error("Invalid 'item' provided. Must be an HTMLElement.");
        }
        if (!Array.isArray(animations)) {
            throw new Error("Invalid 'animations' provided. Must be an array.");
        }
        this.#item = item;
        this.#animations = animations;
    }

    #onAnimationEnd = () => {
        if (this.#isPaused) return;
        const { className } = this.#animations[this.#currentAnimationIndex];
        requestAnimationFrame(() => {
            this.#item.classList.remove(className);
        });
        this.#currentAnimationIndex++;
        if (this.#currentAnimationIndex < this.#animations.length) {
            this.#executeAnimation(); // Execute next animation immediately
        } else {
            this.#currentAnimationIndex = 0; // Reset to allow animations to be replayed
        }
    };

    #executeAnimation = () => {
        if (this.#currentAnimationIndex >= this.#animations.length || this.#isPaused) return;

        const { className, duration } = this.#animations[this.#currentAnimationIndex];
        requestAnimationFrame(() => {
            this.#item.classList.add(className);
            setTimeout(() => {
                requestAnimationFrame(() => {
                    this.#item.classList.remove(className);
                });
                this.#currentAnimationIndex++;
                if (this.#currentAnimationIndex < this.#animations.length) {
                    this.#executeAnimation();
                } else {
                    this.#currentAnimationIndex = 0; // Reset to allow animations to be replayed
                }
            }, duration);
        });
    };

    setAnimationsSequence = (animationsSequence) => {
        if (!Array.isArray(animationsSequence)) {
            throw new Error("Invalid 'animationsSequence' provided. Must be an array.");
        }
        this.#animations = animationsSequence;
        this.#currentAnimationIndex = 0;
    };

    startAnimation = () => {
        if (!this.#isPaused && this.#currentAnimationIndex === 0) {
            this.#executeAnimation();
        }
    };

    pauseAnimation = () => {
        this.#isPaused = true;
    };

    resumeAnimation = () => {
        if (this.#isPaused) {
            this.#isPaused = false;
            if (this.#currentAnimationIndex < this.#animations.length) {
                this.#executeAnimation();
            }
        }
    };

    resetAnimation = () => {
        this.#currentAnimationIndex = 0;
        this.#isPaused = false;
        requestAnimationFrame(() => {
            this.#item.className = ''; // Remove all animation classes
        });
    };
}