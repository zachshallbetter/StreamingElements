import { AnimationEngine } from './animationEngine.js';
import { InteractionHandler, interactionTypes } from '../interationManager.js';
import { Animator } from './animator.js';

export const configModule = (() => {
    const createInteractionHandler = (domElement, types = []) => {
        const filteredTypes = types.filter(type => interactionTypes.has(type));
        return new InteractionHandler(domElement, filteredTypes);
    };

    const animationConfigs = {
        itemAddition: {
            animationSequence: [
                { className: 'fadeIn', duration: 300 },
                { className: 'expand', duration: 200 },
                { className: 'settle', duration: 100 },
            ],
            controlParams: { loopCount: 1, speed: 1.5 },
        },
        global: {
            animationSequence: [
                { className: 'fadeInGlobal', duration: 500 },
                { className: 'expandGlobal', duration: 400 },
                { className: 'settleGlobal', duration: 300 },
            ],
            controlParams: { loopCount: 1, speed: 1 },
        },
    };

    const interactionConfig = {
        interactionTypes: ['click', 'mouseover', 'mouseout'],
    };

    const createAnimationEngine = (targetElement, configType) => {
        if (!targetElement) {
            console.warn('No target element provided.');
            return null;
        }
        const config = animationConfigs[configType];
        if (!config) {
            console.warn(`Animation config for '${configType}' not found.`);
            return null;
        }
        const { animationSequence, controlParams } = config;
        return new AnimationEngine(targetElement, animationSequence, controlParams);
    };

    return {
        createInteractionHandler,
        animationConfigs,
        interactionConfig,
        createAnimationEngine,
    };
})();
