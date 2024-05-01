import { setupAnimationPackage } from './index.js';

document.addEventListener('DOMContentLoaded', () => {
    const elements = [
        { elementId: 'item', configType: 'itemAddition' },
        { elementId: 'newItem', configType: 'global' },
        { elementId: 'extraItem', configType: 'itemAddition' }
    ];

    elements.forEach(({ elementId, configType }) => {
        const domElement = document.getElementById(elementId);
        const { animator, start } = setupAnimationPackage(domElement, configType);

        domElement.addEventListener('interaction', (event) => {
            console.log(`Interaction of type ${event.type} detected on element ${elementId}`);
            start();
        });
    });
});
