'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncHistory = exports.routeActions = exports.goForward = exports.goBack = exports.go = exports.replace = exports.push = exports.TRANSITION = exports.UPDATE_LOCATION_WITH_PARAMS = undefined;

var _reactRouterRedux = require('react-router-redux');

Object.defineProperty(exports, 'TRANSITION', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.TRANSITION;
  }
});
Object.defineProperty(exports, 'push', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.push;
  }
});
Object.defineProperty(exports, 'replace', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.replace;
  }
});
Object.defineProperty(exports, 'go', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.go;
  }
});
Object.defineProperty(exports, 'goBack', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.goBack;
  }
});
Object.defineProperty(exports, 'goForward', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.goForward;
  }
});
Object.defineProperty(exports, 'routeActions', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.routeActions;
  }
});
Object.defineProperty(exports, 'syncHistory', {
  enumerable: true,
  get: function get() {
    return _reactRouterRedux.syncHistory;
  }
});
exports.syncParams = syncParams;
exports.routeReducer = routeReducer;

var _matchRoutes = require('react-router/lib/matchRoutes');

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPDATE_LOCATION_WITH_PARAMS = exports.UPDATE_LOCATION_WITH_PARAMS = "@@router/UPDATE_LOCATION_WITH_PARAMS";
function syncParams(routes, history) {
  var routesArray = (0, _reactRouter.createRoutes)(routes);

  return function (store) {
    function dispatchLocationWithParams(location) {
      (0, _matchRoutes2.default)(routesArray, location, function (error, state) {
        if (!error) {
          store.dispatch({
            type: UPDATE_LOCATION_WITH_PARAMS,
            payload: {
              location: location,
              params: state.params
            }
          });
        }
      });
    }

    // dispatch initial route with params and unsubscribe immediately
    var unsubscribeHistory = history.listen(function (location) {
      dispatchLocationWithParams(location);
    });
    unsubscribeHistory();

    return function (next) {
      return function (action) {
        if (action.type === _reactRouterRedux.UPDATE_LOCATION) {
          dispatchLocationWithParams(action.payload);
        } else {
          return next(action);
        }
      };
    };
  };
}

var initialState = {
  location: undefined,
  params: undefined
};

function routeReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var payload = _ref.payload;

  if (type === UPDATE_LOCATION_WITH_PARAMS) {
    return _extends({}, state, {
      location: payload.location,
      params: payload.params
    });
  }
  return state;
}
