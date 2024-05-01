// EventManager.js
class EventManager {
    constructor() {
        this.listeners = new Map();
    }

    addEvent(eventType, callback) {
        if (!eventType || typeof eventType !== 'string') {
            throw new Error('Invalid event type provided.');
        }
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function.');
        }
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType).push(callback);
    }

    removeEvent(eventType, callback) {
        if (!eventType || typeof eventType !== 'string') {
            throw new Error('Invalid event type provided.');
        }
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function.');
        }
        if (this.listeners.has(eventType)) {
            const callbacks = this.listeners.get(eventType);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    invokeEvent(eventType, ...args) {
        if (!eventType || typeof eventType !== 'string') {
            throw new Error('Invalid event type provided.');
        }
        if (this.listeners.has(eventType)) {
            const callbacks = this.listeners.get(eventType);
            for (const callback of callbacks) {
                try {
                    callback(...args);
                } catch (error) {
                    console.error(`Error executing callback for event type ${eventType}: ${error}`);
                }
            }
        }
    }
}
