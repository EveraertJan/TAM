import {
  TOGGLE_SIDE_MENU

} from './../constants/GlobalConstants'

const initialState = {
  menu: {
    display: false
  }
}

export function GlobalReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDE_MENU: {
      return {
        ...state,
        menu: {
          ...state.menu,
          display: !state.menu.display
        }
      }
    }
    default:
      return state
  }
}
