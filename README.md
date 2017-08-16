# Yarl Fetch
Store Restful Resources in Redux.

## Why do I need this?
Use this to gracefully transition between remote request states:

```dot
start -> pending
pending -> success
pending -> failure
```

Redux subscribers can use this to keep track of such a request

## Install
```
yarn add @yarljs/fetch
```

### Usage
Assuming you've an appropriate endpoint:
```js
// import  
const yarlReduce = require('@yarljs/reduce')
const yarlFetch = require('@yarljs/fetch');

// Make space for yarl in your store
const defaultState = {
  yarl: {

  }
}

// Create a store with our middleware
const store = redux.createStore(
  yarlReduce.reduce,
  defaultState,
  redux.applyMiddleware(yarlFetch.middleware)
);

// Build a Dispatchable redux action
const getChuckStuff = yarlFetch.fetching(
  "http://localhost:8081/chuck/jokes/categories",
  {method: "GET"},
  "getChuckStuff");

// ...
// invoke the method
store.dispatch(getChuckStuff({limit: 10, someParam: "baz"}))
```

## Why No ES6?
You can and should use this in a transpilied project.
Distributing common code which uses es6 features however puts constraint on
the end user:

* You have to have the same language features in your project
* You are limited in what your minifier can perform
* You are limited in code splitting


## API

### fetching(uri, slice, [options])
Generate a new Redux Action and Reducer for a given uri

#### Arguments

* **uri** String REST endpoint
* **slice** String Resulting Action name and storage location
* **options** [fetch](https://github.github.io/fetch/) options. Defaults to empty

#### Returns function slice(params, [transform])
Invokable Action.

##### Args
* **params** Either an Object of params, or a function which will be passed the current redux state, which may be mapped into the request. These fields will be placed in the queryParam or Body section of your request, depending on the HTTP method
* **transform** An optional function to mutate the the resulting data before it's placed in the redux store


### middleware()
Redux Middleware function which handles disatching the async request.
