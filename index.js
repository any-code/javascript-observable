/*
            _                   ____          _
           / \   _ __  _   _   / ___|___   __| | ___
          / _ \ | '_ \| | | | | |   / _ \ / _` |/ _ \
         / ___ \| | | | |_| | | |__| (_) | (_| |  __/
        /_/   \_\_| |_|\__, |  \____\___/ \__,_|\___|
                       |___/

        javascript-observable
 */

var object = require('javascript-object-paraphernalia'),
    collection = require('javascript-collection-paraphernalia')

function Observable() {
    this.register = [];
}

Observable.prototype.publish = function(eventName, eventArguments) {
    collection.each(this._getSubscribers(eventName),
        this._onEachSubscriber(Array.prototype.slice.call(arguments)));
};

Observable.prototype._onEachSubscriber = function(eventArguments) {
    if (obj.is(subscriber.event, 'Function')) {
        return function(index, subscriber) { subscriber.event.apply(this, eventArguments); }
    }
}

module.exports = new Observable();
