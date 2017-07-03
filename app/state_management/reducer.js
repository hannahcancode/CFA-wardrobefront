import { assoc, evolve, merge, compose, not } from 'ramda'

import {
  GET_SELECTED_IMAGES,
  TOGGLE_SHUFFLE,
  TOGGLE_UPLOADER,
  UPLOAD_IMAGE,
  FINISH_UPLOADING,
  FETCHED_CLOTHES
} from './constants'

export default (stateSoFar, {type, data}) => {
  let newState
  console.log("ACTION DATA", stateSoFar, type, data)
  switch (type) {

    case GET_SELECTED_IMAGES:
      newState = assoc(['selected'], data, stateSoFar)
      if (data.length > 0) {
        return assoc(['uploadButton'], false, newState)
      }
      else {
        return assoc(['uploadButton'], true, newState)
      }

    case TOGGLE_SHUFFLE:
      return evolve({shuffling: not})(stateSoFar)

    case TOGGLE_UPLOADER:
      return evolve({uploaderActive: not})(stateSoFar)

    case UPLOAD_IMAGE:
      newState = assoc(['selectedType'], data, stateSoFar)
      return evolve({uploading: not, animating: not})(newState)

    case FINISH_UPLOADING:
      newState = assoc(['url'], data, stateSoFar)
      newState = assoc(['selected'], [], newState)
      newState = assoc(['selectedType'], '', newState)
      console.log(newState)
      return evolve({uploading: not, uploadButton: not, animating: not})(newState)

    case FETCHED_CLOTHES:
      return assoc(data.path, data.array, stateSoFar)

    default:
      return stateSoFar
  }
}