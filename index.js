/*
            _                   ____          _
           / \   _ __  _   _   / ___|___   __| | ___
          / _ \ | '_ \| | | | | |   / _ \ / _` |/ _ \
         / ___ \| | | | |_| | | |__| (_) | (_| |  __/
        /_/   \_\_| |_|\__, |  \____\___/ \__,_|\___|
                       |___/

        javascript-observable
 */

var obj = require('javascript-object-paraphernalia'),
    collection = require('javascript-collection-paraphernalia')

function Observable() {
    this.register = [];
}

Observable.prototype.publish = function(eventName, eventArguments) {
    collection.each(this._getSubscribers(eventName),
        this._onEachSubscriber(Array.prototype.slice.call(arguments, 1)));
};

Observable.prototype._onEachSubscriber = function(eventArguments) {
    return function(index, subscriber) {
        if (obj.is(subscriber.event, 'Function')) {
            subscriber.event.apply(this, eventArguments);
        }
    }
}

Observable.prototype._getSubscribers = function(eventName) {
    return collection.filter(this.register, function(subscription) {
        return subscription.eventName === eventName;
    })
}


module.exports = Observable;
