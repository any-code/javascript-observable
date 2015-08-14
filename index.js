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

Observable.prototype.subscribe = function(eventName, event, numberOfTimesThisSpecificSubscriptionCanBeRegistered) {
    if (eventName.length < 1) {
        throw new EventException('Cannot subscribe to an unnamed observable event');
    }

    if (!obj.is(event, 'Function')) {
        throw new EventException('Cannot subscribe to an observable without a valid event');
    }

    if (numberOfTimesThisSpecificSubscriptionCanBeRegistered === undefined) {
        numberOfTimesThisSpecificSubscriptionCanBeRegistered = 1;
    }

    if (this._isRegistered(eventName, event) < numberOfTimesThisSpecificSubscriptionCanBeRegistered) {
        this.register.push({
            eventName: eventName,
            event: event
        });
    }

    return true;
};

Observable.prototype.deferredSubscribe = function(eventName, numberOfTimesThisSpecificSubscriptionCanBeRegistered) {
    var $this = this;
    return function(callback) {
        $this.subscribe(eventName, callback, numberOfTimesThisSpecificSubscriptionCanBeRegistered);
    }
}

Observable.prototype._isRegistered = function(eventName, event) {
    var registered = 0;
    if (this.register.length > 0) {
        collection.each(this.register, function(index, item) {
            if (item.event.toString() === event.toString() && item.eventName === eventName) {
                registered++;
            }
        });
    }

    return registered;
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
