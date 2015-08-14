var Observable = require('./index'),
    observable = new Observable()

/*
 Subscribe to an observable right now
 */
observable.subscribe('event-name', function(data) {
    console.log('event-name', arguments)
})

/*
 Defer subscription of an observable
 */
var subscriber = observable.deferredSubscribe('event-name')

/*
 Subscribe to a deferred subscription
 */
subscriber(function(data) {
    console.log('event-name', arguments)
});

/*
 Allow a subscription to occur multiple times
 the following would allow the variable subscriber to register a subscription no more than 10 times
 */
var subscriber = observable.deferredSubscribe('event-name', 10)

/*
 Publish an observable
 each subscriber event will be triggered
 */
observable.publish('event-name')
//or
observable.publish('event-name', {property: "value"}, 1, "argument", "etc")
