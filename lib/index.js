'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_LOCATION_WITH_PARAMS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactRouterRedux = require('react-router-redux');

Object.keys(_reactRouterRedux).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reactRouterRedux[key];
    }
  });
});
exports.syncParams = syncParams;
exports.routeParamsReducer = routeParamsReducer;

var _matchRoutes = require('react-router/lib/matchRoutes');

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPDATE_LOCATION_WITH_PARAMS = exports.UPDATE_LOCATION_WITH_PARAMS = "@@router/UPDATE_LOCATION_WITH_PARAMS";


var initialState = {
  location: undefined,
  params: {}
};

function syncParams(store, routes, history) {
  var routesArray = (0, _reactRouter.createRoutes)(routes);
  return history.listen(function (location) {
    (0, _matchRoutes2.default)(routesArray, location, function (error, state) {
      if (!error) {
        store.dispatch({
          type: UPDATE_LOCATION_WITH_PARAMS,
          payload: {
            location: location,
            params: state ? state.params : {}
          }
        });
      }
    });
  });
}

function routeParamsReducer() {
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
