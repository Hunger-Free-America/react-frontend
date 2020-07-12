import React, { useReducer } from "react"

export interface TLocation {
  address?: string
  lat: number
  lng: number
}

interface IProps {
  children: any
}

interface LocationContextState {
  location: TLocation
  userLocation: TLocation
  searchState: any
  selectedHit: string
}

type Action =
  | ChangeUserLocationAction
  | ChangeLocationAction
  | ChangeSearchStateAction
  | ChangeSelectedHit

interface ChangeUserLocationAction {
  type: "CHANGE_USER_LOCATION"
  payload: {
    location: TLocation
  }
}

interface ChangeLocationAction {
  type: "CHANGE_LOCATION"
  payload: {
    location: TLocation
  }
}

interface ChangeSearchStateAction {
  type: "CHANGE_SEARCH_STATE"
  payload: {
    searchState: any
  }
}

interface ChangeSelectedHit {
  type: "CHANGE_SELECTED_HIT"
  payload: {
    selectedHit: string
    location: TLocation
  }
}

interface ILocationContext {
  state: LocationContextState
  dispatch: React.Dispatch<Action>
}

const US_LOCATION = { lat: 40.413993, lng: -99.034504 }

const initialState: LocationContextState = {
  location: US_LOCATION,
  userLocation: US_LOCATION,
  searchState: { query: "" },
  selectedHit: "",
}

const reducer = (
  state: LocationContextState,
  action: Action
): LocationContextState => {
  switch (action.type) {
    case "CHANGE_LOCATION":
      return {
        ...state,
        location: action.payload.location,
        searchState: { query: "" },
      }
    case "CHANGE_USER_LOCATION":
      return {
        ...state,
        userLocation: action.payload.location,
        location: action.payload.location,
        searchState: { query: "" },
      }
    case "CHANGE_SEARCH_STATE":
      return {
        ...state,
        searchState: action.payload.searchState,
      }
    case "CHANGE_SELECTED_HIT":
      return {
        ...state,
        selectedHit: action.payload.selectedHit,
        location: action.payload.location,
      }
    default:
      throw new Error("Action type not recognized for LocationContext reducer")
  }
}

export const LocationContext = React.createContext<ILocationContext>({
  state: initialState,
  dispatch: () => {},
})

function LocationProvider(props: IProps) {
  // by default it's US location
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <LocationContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {props.children}
    </LocationContext.Provider>
  )
}

export default LocationProvider
