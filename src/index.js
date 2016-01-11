import matchRoutes from 'react-router/lib/matchRoutes'
import { createRoutes } from 'react-router'

// declaring INIT_PATH here as redux-simple-router doesn't export it for some reason
const INIT_PATH = '@@router/INIT_PATH'
import { UPDATE_PATH } from 'redux-simple-router'
export const UPDATE_PATH_EXTENDED = "@@router/UPDATE_PATH_EXTENDED"

function updateWithParamsAndQuery(payload) {
  return {
    type: UPDATE_PATH_EXTENDED,
    payload
  }
}

export function paramsAndQueryMiddleware(routes, history) {
  const { createLocation } = history
  const routesArray = createRoutes(routes)

  return store => next => action => {
    if (action.type === INIT_PATH || action.type === UPDATE_PATH) {
      const location = createLocation(action.payload.path)
      matchRoutes(routesArray, location, (error, state) => {
        if (!error) {
          store.dispatch(
            updateWithParamsAndQuery({
              path: action.payload.path,
              avoidRouterUpdate: action.payload.avoidRouterUpdate,
              state: action.payload.state,
              replace: action.payload.replace,
              params: state.params,
              query: location.query
            })
          )
        }
      })
    } else {
      return next(action)
    }
  }
}

const initialState = {
  changeId: 1,
  path: undefined,
  state: undefined,
  replace: false,
  params: undefined,
  query: undefined
}

function update(state = initialState, { type, payload }) {
  if (type === UPDATE_PATH_EXTENDED) {
    return {
      ...state,
      path: payload.path,
      changeId: state.changeId + (payload.avoidRouterUpdate ? 0 : 1),
      state: payload.state,
      replace: payload.replace,
      params: payload.params,
      query: payload.query
    }
  }
  return state
}

export { update as routeReducer }
