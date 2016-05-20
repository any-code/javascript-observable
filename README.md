# javascript-observable

[![Build Status](https://travis-ci.org/any-code/javascript-observable.svg?branch=master)](https://travis-ci.org/any-code/javascript-observable)

> Javascript observable class - useful for publishing and subscribing to messages in a component driven system

## Getting Started

### 1. Installation

``` bash
npm install javascript-observable
```

### 2. Examples

``` javascript
var Observable = require('javascript-observable'),
    observable = new Observable()

  /*
    Subscribe to an observable right now
  */
  observable.subscribe('event-name', function(data) {
   console.log('event-name', data)
  })

  /*
   Defer subscription of an observable
  */
  var subscriber = observable.deferredSubscribe('event-name')

  /*
   Subscribe to a deferred subscription
  */
  subscriber(function(data) {
    console.log('event-name', data)
  });

  /*
   Publish an observable
   each subscriber event will be triggered
  */  
  observable.publish('event-name')
  //or
  observable.publish('event-name', {property: "value"}, 1, "argument", "etc")

```

## Copyright and license
Copyright (c) 2015-2016, [Anycode](https://anycode.io/ "Anycode") <lee@anycode.io>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
