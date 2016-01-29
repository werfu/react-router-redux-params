# react-router-redux-params

Provides middleware and alternative reducer for [react-router-redux](https://github.com/rackt/react-router-redux) that stores [react-router](https://github.com/rackt/react-router) route params in addition to history location object.

You won't need this if your only use case is accessing route params inside your components, react-router already provides params as props. This is meant for usage outside component tree.

**NOTE** This hasn't been tested with [redux-devtools](https://github.com/gaearon/redux-devtools), breakage might ensue.

## Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, syncParams, routeReducer } from 'react-router-redux-params'
import reducers from '<project-path>/reducers'

const routes = (
  <Route path="foo" component={Foo}/>
  <Route path="bar" component={Bar}/>
)

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

// Sync dispatched route actions to the history
const createStoreWithMiddleware = applyMiddleware(
  syncParams(routes, browserHistory),
  syncHistory(browserHistory)
)(createStore)

const store = createStoreWithMiddleware(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        {routes}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('mount')
)
```
