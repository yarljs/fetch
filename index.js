const reduce = require('@yarljs/reduce');
const ReduxThunk = require('redux-thunk').default;
const queryString = require('query-string');

function fetching(uri, slice, options={}) {
  let res = (params, transform) => {
    const type = this.type;
    return (dispatch, getState) => {
      dispatch({
        type: slice,
        loading: true,
        data: null,
        error: null
      });

      const p = (typeof params === "function") ? params(getState()): params;

      let opts = options;
      let ur = uri;

      if(opts.method === "POST" || opts.method === "PUT")
      {
        opts.body = JSON.stringify(p);
      }
      else
      {
        ur = `${uri}?${queryString.stringify(p)}`;
      }

      fetch(ur, opts)
        .then((response) => {
          return response.json()
        }).then(function(json) {
          dispatch({
            type: slice,
            loading: false,
            error: false,
            data: (transform) ? transform(json): json
          })
        }, (err) => {
          dispatch({
            type: slice,
            loading: false,
            error: err,
            data: null
          })
        })
    };
  }

  Object.defineProperty(res, 'name', {
    get : function () {
        return slice;
    }
  });
  return reduce.Reducable((state, action) => {
    let target = {};
    target[action.type] = {
      data: action.data,
      loading: action.loading,
      error: action.error
    };

    const yarl = Object.assign({}, state.yarl, target);
    const res = Object.assign({}, state, {
      yarl: yarl
    });

    return res;
  })(res);
}

module.exports = {
  fetching: fetching,
  middleware: ReduxThunk
}
