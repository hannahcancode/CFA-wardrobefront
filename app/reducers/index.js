import { assoc } from 'ramda'

// const state = {
//
// }

import { GET_SELECTED_IMAGES } from '../actions/actions'

export default (state, action) => {
  let newState
  switch (action.type) {
    case 'GET_SELECTED_IMAGES':
      console.log(state)
      newState = assoc(['selected'], action.array)(state)
      console.log(newState)
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}