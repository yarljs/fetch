const yarlReduce = require('@yarljs/reduce')
const yarlFetch = require('../index');
var redux = require('redux');

const defaultState = {
  yarl: {
  }
}



const store = redux.createStore(
  yarlReduce.reduce,
  defaultState,
  redux.applyMiddleware(yarlFetch.middleware)
);

window.App = {
  yarlFetch,
  yarlReduce,
  store
}

const getChuckStuff = yarlFetch.fetching(
  "http://localhost:8081/chuck/jokes/categories",
  {},
  "getChuckStuff");

yarlFetch.fetching(
  "http://localhost:8081/chuck/jokes/search",
  {},
  "searchChuckStuff");
