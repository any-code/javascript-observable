var Observable = require('../index'),
    sinon = require('sinon');

exports.testSubscribe = function(test) {
    var o = new Observable(),
        result = null;

    o.subscribe('foo-bar', function(value) {
        result = value;
    });

    o.publish('foo-bar', "RESULT");

    test.equal(result, "RESULT", "the subscriber's callback event was never called after the observer was published");
    test.done();
}

exports.testOnTrigger = function(test) {
    var o = new Observable(),
        result = null;

    o.on('foo-bar', function(value) {
        result = value;
    });

    o.trigger('foo-bar', "RESULT");

    test.equal(result, "RESULT", "the subscriber's callback event was never called after the observer was published");
    test.done();
}

exports.testDeferredSubscribe = function(test) {
    var o = new Observable(),
        result = null;

    var subscription = o.deferredSubscribe('foo-bar');
    subscription(function(value) {
        result = value;
    });

    o.publish('foo-bar', "RESULT");

    test.equal(result, "RESULT", "the subscriber's callback event was never called after the observer was published");
    test.done();
}

exports.testDeferredSubscribeOccursOnce = function(test) {
    var o = new Observable(),
        result = 0;

    var subscription = o.deferredSubscribe('foo-bar');
    subscription(function() {
        result++;
    });
    subscription(function() {
        result++;
    });
    subscription(function() {
        result++;
    });

    o.publish('foo-bar');

    test.equal(result, 1, "the subscriber's callback event was not called once after the observer was published");
    test.done();
}

exports.testDeferredSubscribeOccursAnyTimes = function(test) {
    var o = new Observable(),
        result = 0,
        subscription = o.deferredSubscribe('foo-bar', 5),
        i = 10;

    while (i--) {
        subscription(function() {
            result++;
        });
    }

    o.publish('foo-bar');

    test.equal(result, 5, "the subscriber's callback event was called " + result + " but the test expected 5");
    test.done();
}

exports.testSubscribeOccursAnyTimes = function(test) {
    var o = new Observable(),
        result = 0,
        i = 10;

    while (i--) {
        o.subscribe('foo-bar', function() {
            result++;
        }, 5)
    }

    o.publish('foo-bar');

    test.equal(result, 5, "the subscriber's callback event was called " + result + " but the test expected 5");
    test.done();
}

exports.testSubscribeOccursAnyTimesWithOn = function(test) {
    var o = new Observable(),
        result = 0,
        i = 10;

    while (i--) {
        o.on('foo-bar', function() {
            result++;
        }, 5)
    }

    o.publish('foo-bar');

    test.equal(result, 5, "the subscriber's callback event was called " + result + " but the test expected 5");
    test.done();
}

exports.testSubscribeOccursInfiniteTimes = function(test) {
    var o = new Observable(),
        result = 0,
        i = 50;

    while (i--) {
        o.subscribe('foo-bar', function() {
            result++;
        }, -1)
    }

    o.publish('foo-bar');

    test.equal(result, 50, "the subscriber's callback event was called " + result + " but the test expected 5");
    test.done();
}

exports.testSubscribeWithIdOccursOnce = function(test) {
    var o = new Observable(),
        result = 0,
        i = 50;

    while (i--) {
        o.subscribe('foo-bar', function() {
            result++;
        }, "static-event-handler")
    }

    o.publish('foo-bar');

    test.equal(result, 1, "the subscriber's callback event was called " + result + " but the test expected 5");
    test.done();
}

exports.testPublish = function(test) {
    var o = new Observable(),
        result = null;

    o.register = [{
        eventName: 'foo-bar',
        event: function(data) {
            result = data
        }
    }];
    o.publish('foo-bar', "RESULT");

    test.equal(result, "RESULT", "the subscriber's callback event was never called after the event was published");
    test.done();
}

exports.testGetSubscribers = function(test) {
    var o = new Observable(),
        result = null;

    o.register = [{
        eventName: 'foo-bar',
        event: function(data) { return 1; }
    },{
        eventName: 'foo-bar',
        event: function(data) { return 2; }
    },{
        eventName: 'foo-bar',
        event: function(data) { return 3; }
    }];

    o._getSubscribers('foo-bar')

    test.equal(o._getSubscribers('foo-bar').length, 3, "Wrong number of subscriber's were retrieved");
    test.done();
}


exports.testOnEachSubscriber = function(test) {
    var subscription = {
        eventName: 'foo-bar',
        event: function() {}
    };

    sinon.stub(subscription, "event", function(data) { return data });
    (new Observable())._onEachSubscriber({a: 1})(0, subscription);

    test.ok(subscription.event.called, "the subscriber's callback event was never called");
    test.done();
}
