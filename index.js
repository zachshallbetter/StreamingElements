import { configModule } from './animation/controller.js';

document.addEventListener('DOMContentLoaded', () => {
    const elements = [
        { elementId: 'item', configType: 'itemAddition' },
        { elementId: 'newItem', configType: 'global' },
        { elementId: 'extraItem', configType: 'itemAddition' }
    ];

    elements.forEach(({ elementId, configType }) => {
        const domElement = document.getElementById(elementId);
        const interactionHandler = configModule.createInteractionHandler(domElement, configModule.interactionConfig.interactionTypes);
        const animationEngine = configModule.createAnimationEngine(domElement, configType);

        interactionHandler.onInteraction((type) => {
            console.log(`Interaction of type ${type} detected on element ${elementId}`);
            animationEngine.start();
        });
    });
});
