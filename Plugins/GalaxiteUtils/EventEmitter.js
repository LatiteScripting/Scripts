"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.eventListeners = [];
    }
    getListeners(eventName) {
        const listeners = this.eventListeners.find((ev) => ev[0] === eventName);
        if (!listeners)
            return [];
        return listeners[1];
    }
    /**
     * Synchronously calls each of the listeners registered for the event named`eventName`, in the order they were registered, passing the supplied arguments
     * to each.
     *
     * Returns `true` if the event had listeners, `false` otherwise.
     *
     * ```js
     * import { EventEmitter } from 'node:events';
     * const myEmitter = new EventEmitter();
     *
     * // First listener
     * myEmitter.on('event', function firstListener() {
     *   console.log('Helloooo! first listener');
     * });
     * // Second listener
     * myEmitter.on('event', function secondListener(arg1, arg2) {
     *   console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
     * });
     * // Third listener
     * myEmitter.on('event', function thirdListener(...args) {
     *   const parameters = args.join(', ');
     *   console.log(`event with parameters ${parameters} in third listener`);
     * });
     *
     * console.log(myEmitter.listeners('event'));
     *
     * myEmitter.emit('event', 1, 2, 3, 4, 5);
     *
     * // Prints:
     * // [
     * //   [Function: firstListener],
     * //   [Function: secondListener],
     * //   [Function: thirdListener]
     * // ]
     * // Helloooo! first listener
     * // event with parameters 1, 2 in second listener
     * // event with parameters 1, 2, 3, 4, 5 in third listener
     * ```
     * @since v0.1.26
     */
    emit(eventName, ...args) {
        const listeners = this.getListeners(eventName);
        for (const listener of listeners)
            listener(...args);
        return listeners.length > 0;
    }
    /**
     * Adds the `listener` function to the end of the listeners array for the
     * event named `eventName`. No checks are made to see if the `listener` has
     * already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
     * times.
     *
     * ```js
     * server.on('connection', (stream) => {
     *   console.log('someone connected!');
     * });
     * ```
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
     * event listener to the beginning of the listeners array.
     *
     * ```js
     * import { EventEmitter } from 'node:events';
     * const myEE = new EventEmitter();
     * myEE.on('foo', () => console.log('a'));
     * myEE.prependListener('foo', () => console.log('b'));
     * myEE.emit('foo');
     * // Prints:
     * //   b
     * //   a
     * ```
     * @since v0.1.101
     * @param eventName The name of the event.
     * @param listener The callback function
     */
    on(eventName, listener) {
        const listeners = this.eventListeners.find((ev) => ev[0] === eventName);
        if (!listeners) {
            this.eventListeners.push([eventName, [listener]]);
        }
        else {
            listeners[1].push(listener);
        }
        return this;
    }
    /**
     * Alias for `emitter.on(eventName, listener)`.
     * @since v0.1.26
     */
    addListener(eventName, listener) {
        return this.on(eventName, listener);
    }
    /**
     * Adds a **one-time**`listener` function for the event named `eventName`. The
     * next time `eventName` is triggered, this listener is removed and then invoked.
     *
     * ```js
     * server.once('connection', (stream) => {
     *   console.log('Ah, we have our first user!');
     * });
     * ```
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * By default, event listeners are invoked in the order they are added. The`emitter.prependOnceListener()` method can be used as an alternative to add the
     * event listener to the beginning of the listeners array.
     *
     * ```js
     * import { EventEmitter } from 'node:events';
     * const myEE = new EventEmitter();
     * myEE.once('foo', () => console.log('a'));
     * myEE.prependOnceListener('foo', () => console.log('b'));
     * myEE.emit('foo');
     * // Prints:
     * //   b
     * //   a
     * ```
     * @since v0.3.0
     * @param eventName The name of the event.
     * @param listener The callback function
     */
    once(eventName, listener) {
        const wrapper = ((...args) => {
            this.removeListener(eventName, wrapper);
            return listener(...args);
        });
        this.on(eventName, wrapper);
        return this;
    }
    /**
     * Removes the specified `listener` from the listener array for the event named`eventName`.
     *
     * ```js
     * const callback = (stream) => {
     *   console.log('someone connected!');
     * };
     * server.on('connection', callback);
     * // ...
     * server.removeListener('connection', callback);
     * ```
     *
     * `removeListener()` will remove, at most, one instance of a listener from the
     * listener array. If any single listener has been added multiple times to the
     * listener array for the specified `eventName`, then `removeListener()` must be
     * called multiple times to remove each instance.
     *
     * Once an event is emitted, all listeners attached to it at the
     * time of emitting are called in order. This implies that any`removeListener()` or `removeAllListeners()` calls _after_ emitting and _before_ the last listener finishes execution
     * will not remove them from`emit()` in progress. Subsequent events behave as expected.
     *
     * ```js
     * import { EventEmitter } from 'node:events';
     * class MyEmitter extends EventEmitter {}
     * const myEmitter = new MyEmitter();
     *
     * const callbackA = () => {
     *   console.log('A');
     *   myEmitter.removeListener('event', callbackB);
     * };
     *
     * const callbackB = () => {
     *   console.log('B');
     * };
     *
     * myEmitter.on('event', callbackA);
     *
     * myEmitter.on('event', callbackB);
     *
     * // callbackA removes listener callbackB but it will still be called.
     * // Internal listener array at time of emit [callbackA, callbackB]
     * myEmitter.emit('event');
     * // Prints:
     * //   A
     * //   B
     *
     * // callbackB is now removed.
     * // Internal listener array [callbackA]
     * myEmitter.emit('event');
     * // Prints:
     * //   A
     * ```
     *
     * Because listeners are managed using an internal array, calling this will
     * change the position indices of any listener registered _after_ the listener
     * being removed. This will not impact the order in which listeners are called,
     * but it means that any copies of the listener array as returned by
     * the `emitter.listeners()` method will need to be recreated.
     *
     * When a single function has been added as a handler multiple times for a single
     * event (as in the example below), `removeListener()` will remove the most
     * recently added instance. In the example the `once('ping')`listener is removed:
     *
     * ```js
     * import { EventEmitter } from 'node:events';
     * const ee = new EventEmitter();
     *
     * function pong() {
     *   console.log('pong');
     * }
     *
     * ee.on('ping', pong);
     * ee.once('ping', pong);
     * ee.removeListener('ping', pong);
     *
     * ee.emit('ping');
     * ee.emit('ping');
     * ```
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     * @since v0.1.26
     */
    removeListener(eventName, listener) {
        const listeners = this.eventListeners.find((ev) => ev[0] === eventName);
        if (!listeners)
            return this;
        const lastListenerIndex = listeners[1].lastIndexOf(listener);
        if (lastListenerIndex === -1)
            return this;
        listeners[1].splice(lastListenerIndex, 1);
        return this;
    }
    /**
     * Alias for `emitter.removeListener()`.
     * @since v10.0.0
     */
    off(eventName, listener) {
        return this.removeListener(eventName, listener);
    }
    /**
     * Removes all listeners, or those of the specified `eventName`.
     *
     * It is bad practice to remove listeners added elsewhere in the code,
     * particularly when the `EventEmitter` instance was created by some other
     * component or module (e.g. sockets or file streams).
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     * @since v0.1.26
     */
    removeAllListeners(eventName) {
        const listeners = this.eventListeners.find((ev) => ev[0] === eventName);
        if (!listeners)
            return this;
        listeners[1].splice(0, listeners[1].length);
        return this;
    }
    /**
     * Returns a copy of the array of listeners for the event named `eventName`.
     *
     * ```js
     * server.on('connection', (stream) => {
     *   console.log('someone connected!');
     * });
     * console.log(util.inspect(server.listeners('connection')));
     * // Prints: [ [Function] ]
     * ```
     * @since v0.1.26
     */
    listeners(eventName) {
        const listeners = this.getListeners(eventName);
        return [...listeners];
    }
    /**
     * Returns the number of listeners listening for the event named `eventName`.
     * If `listener` is provided, it will return how many times the listener is found
     * in the list of the listeners of the event.
     * @since v3.2.0
     * @param eventName The name of the event being listened for
     * @param listener The event handler function
     */
    listenerCount(eventName, listener) {
        const listeners = this.getListeners(eventName);
        if (!listener)
            return listeners.length;
        const filtered = listeners.filter((l) => l === listener);
        return filtered.length;
    }
    /**
     * Adds the `listener` function to the _beginning_ of the listeners array for the
     * event named `eventName`. No checks are made to see if the `listener` has
     * already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
     * times.
     *
     * ```js
     * server.prependListener('connection', (stream) => {
     *   console.log('someone connected!');
     * });
     * ```
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     * @since v6.0.0
     * @param eventName The name of the event.
     * @param listener The callback function
     */
    prependListener(eventName, listener) {
        const listeners = this.eventListeners.find(ev => ev[0] === eventName);
        if (!listeners) {
            this.eventListeners.push([eventName, [listener]]);
        }
        else {
            listeners[1].unshift(listener);
        }
        return this;
    }
    /**
     * Adds a **one-time**`listener` function for the event named `eventName` to the _beginning_ of the listeners array. The next time `eventName` is triggered, this
     * listener is removed, and then invoked.
     *
     * ```js
     * server.prependOnceListener('connection', (stream) => {
     *   console.log('Ah, we have our first user!');
     * });
     * ```
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     * @since v6.0.0
     * @param eventName The name of the event.
     * @param listener The callback function
     */
    prependOnceListener(eventName, listener) {
        const wrapper = ((...args) => {
            this.removeListener(eventName, wrapper);
            return listener(...args);
        });
        this.prependListener(eventName, wrapper);
        return this;
    }
    /**
     * Returns an array listing the events for which the emitter has registered
     * listeners. The values in the array are strings or `Symbol`s.
     *
     * ```js
     * import { EventEmitter } from 'node:events';
     *
     * const myEE = new EventEmitter();
     * myEE.on('foo', () => {});
     * myEE.on('bar', () => {});
     *
     * const sym = Symbol('symbol');
     * myEE.on(sym, () => {});
     *
     * console.log(myEE.eventNames());
     * // Prints: [ 'foo', 'bar', Symbol(symbol) ]
     * ```
     * @since v6.0.0
     */
    eventNames() {
        return this.eventListeners.map(ev => ev[0]);
    }
}
exports.EventEmitter = EventEmitter;
