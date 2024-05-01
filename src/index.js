import { Animator } from './animator.js';
import { configModule } from './configHandler.js';

// Package setup for developers
export const setupAnimationPackage = (targetElement, configType) => {
    // Validate inputs
    if (!targetElement || typeof targetElement !== 'object') {
        throw new Error('Invalid target element provided.');
    }
    if (!configType || typeof configType !== 'string') {
        throw new Error('Invalid configuration type provided.');
    }

    // Create the animation engine using the provided configuration type
    const animationConfig = configModule.animationConfigs[configType];
    if (!animationConfig) {
        throw new Error(`Failed to find animation configuration for the provided configuration type: ${configType}`);
    }

    const animator = new Animator({ item: targetElement, animations: animationConfig.animationSequence });

    // Return the package
    return {
        animator,
        start: () => animator.startAnimation(),
        configure: (params) => {
            const { speed, loopCount, transitions } = params;
            // Update animation parameters
            animationConfig.controlParams.speed = speed ?? animationConfig.controlParams.speed;
            animationConfig.controlParams.loopCount = loopCount ?? animationConfig.controlParams.loopCount;
            animationConfig.controlParams.transitions = transitions ?? animationConfig.controlParams.transitions;
        }
    };
};