var Observable = require('../index'),
    sinon = require('sinon');

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
