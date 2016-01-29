import matchRoutes from 'react-router/lib/matchRoutes'
import { createRoutes } from 'react-router'
import { UPDATE_LOCATION } from 'react-router-redux'
export const UPDATE_LOCATION_WITH_PARAMS = "@@router/UPDATE_LOCATION_WITH_PARAMS"

function updateWithParams(payload) {
  return {
    type: UPDATE_LOCATION_WITH_PARAMS,
    payload
  }
}

export function paramsMiddleware(routes, history) {
  const routesArray = createRoutes(routes)

  return store => next => action => {
    if (action.type === UPDATE_LOCATION) {
      matchRoutes(routesArray, action.payload, (error, state) => {
        if (!error) {
          store.dispatch(
            updateWithParams({
              location: action.payload,
              params: state.params
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
  location: undefined,
  params: {}
}

export function routeReducer(state = initialState, { type, payload }) {
  // support initial UPDATE_LOCATION that middleware does not catch for some reason
  // TODO: investigate why
  if (type === UPDATE_LOCATION) {
    return {
      ...state,
      location: payload
    }
  }
  if (type === UPDATE_LOCATION_WITH_PARAMS) {
    return {
      ...state,
      location: payload.location,
      params: payload.params
    }
  }
  return state
}
