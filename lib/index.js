'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_LOCATION_WITH_PARAMS = undefined;
exports.paramsMiddleware = paramsMiddleware;
exports.routeReducer = routeReducer;

var _matchRoutes = require('react-router/lib/matchRoutes');

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPDATE_LOCATION_WITH_PARAMS = exports.UPDATE_LOCATION_WITH_PARAMS = "@@router/UPDATE_LOCATION_WITH_PARAMS";

function updateWithParams(payload) {
  return {
    type: UPDATE_LOCATION_WITH_PARAMS,
    payload: payload
  };
}

function paramsMiddleware(routes, history) {
  var routesArray = (0, _reactRouter.createRoutes)(routes);

  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === _reactRouterRedux.UPDATE_LOCATION) {
          (0, _matchRoutes2.default)(routesArray, action.payload, function (error, state) {
            if (!error) {
              store.dispatch(updateWithParams({
                location: action.payload,
                params: state.params
              }));
            }
          });
        } else {
          return next(action);
        }
      };
    };
  };
}

var initialState = {
  location: undefined,
  params: {}
};

function routeReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var payload = _ref.payload;

  // support initial UPDATE_LOCATION that middleware does not catch for some reason
  // TODO: investigate why
  if (type === _reactRouterRedux.UPDATE_LOCATION) {
    return _extends({}, state, {
      location: payload
    });
  }
  if (type === UPDATE_LOCATION_WITH_PARAMS) {
    return _extends({}, state, {
      location: payload.location,
      params: payload.params
    });
  }
  return state;
}
