import matchRoutes from 'react-router/lib/matchRoutes'
import { createRoutes } from 'react-router'
import { UPDATE_LOCATION } from 'react-router-redux'
export const UPDATE_LOCATION_WITH_PARAMS = "@@router/UPDATE_LOCATION_WITH_PARAMS"
export {
  TRANSITION,
  push,
  replace,
  go,
  goBack,
  goForward,
  routeActions,
  syncHistory
} from 'react-router-redux'

export function syncParams(routes, history) {
  const routesArray = createRoutes(routes)

  return (store) => {
    function dispatchLocationWithParams(location) {
      matchRoutes(routesArray, location, (error, state) => {
        if (!error) {
          store.dispatch({
            type: UPDATE_LOCATION_WITH_PARAMS,
            payload: {
              location: location,
              params: state.params
            }
          })
        }
      })
    }

    // dispatch initial route with params and unsubscribe immediately
    const unsubscribeHistory = history.listen(location => {
      dispatchLocationWithParams(location)
    })
    unsubscribeHistory()

    return next => action => {
      if (action.type === UPDATE_LOCATION) {
        dispatchLocationWithParams(action.payload)
      } else {
        return next(action)
      }
    }
  }

}

const initialState = {
  location: undefined,
  params: undefined
}

export function routeReducer(state = initialState, { type, payload }) {
  if (type === UPDATE_LOCATION_WITH_PARAMS) {
    return {
      ...state,
      location: payload.location,
      params: payload.params
    }
  }
  return state
}
