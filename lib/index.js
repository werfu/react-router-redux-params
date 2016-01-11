'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeReducer = exports.UPDATE_PATH_EXTENDED = undefined;
exports.paramsAndQueryMiddleware = paramsAndQueryMiddleware;

var _matchRoutes = require('react-router/lib/matchRoutes');

var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

var _reactRouter = require('react-router');

var _reduxSimpleRouter = require('redux-simple-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// declaring INIT_PATH here as redux-simple-router doesn't export it for some reason
var INIT_PATH = '@@router/INIT_PATH';
var UPDATE_PATH_EXTENDED = exports.UPDATE_PATH_EXTENDED = "@@router/UPDATE_PATH_EXTENDED";

function updateWithParamsAndQuery(payload) {
  return {
    type: UPDATE_PATH_EXTENDED,
    payload: payload
  };
}

function paramsAndQueryMiddleware(routes, history) {
  var createLocation = history.createLocation;

  var routesArray = (0, _reactRouter.createRoutes)(routes);

  return function (store) {
    return function (next) {
      return function (action) {
        if (action.type === INIT_PATH || action.type === _reduxSimpleRouter.UPDATE_PATH) {
          (function () {
            var location = createLocation(action.payload.path);
            (0, _matchRoutes2.default)(routesArray, location, function (error, state) {
              if (!error) {
                store.dispatch(updateWithParamsAndQuery({
                  path: action.payload.path,
                  avoidRouterUpdate: action.payload.avoidRouterUpdate,
                  state: action.payload.state,
                  replace: action.payload.replace,
                  params: state.params,
                  query: location.query
                }));
              }
            });
          })();
        } else {
          return next(action);
        }
      };
    };
  };
}

var initialState = {
  changeId: 1,
  path: undefined,
  state: undefined,
  replace: false,
  params: undefined,
  query: undefined
};

function update() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var payload = _ref.payload;

  if (type === UPDATE_PATH_EXTENDED) {
    return _extends({}, state, {
      path: payload.path,
      changeId: state.changeId + (payload.avoidRouterUpdate ? 0 : 1),
      state: payload.state,
      replace: payload.replace,
      params: payload.params,
      query: payload.query
    });
  }
  return state;
}

exports.routeReducer = update;
