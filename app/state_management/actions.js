import {
  GET_SELECTED_IMAGES,
  TOGGLE_SHUFFLE,
  TOGGLE_UPLOADER,
  UPLOAD_IMAGE,
  FINISH_UPLOADING,
  FETCHED_CLOTHES
} from './constants'

export const dispatchGetSelectedImages = (data) => {
  return { type: GET_SELECTED_IMAGES, data }
}

export const dispatchToggleShuffle = () => {
  return { type: TOGGLE_SHUFFLE }
}

export const dispatchToggleUploader = () => {
  return { type: TOGGLE_UPLOADER }
}

export const dispatchUploadImage = (data) => {
  return { type: UPLOAD_IMAGE, data }
}

export const dispatchFinishUploading = (data) => {
  return { type: FINISH_UPLOADING, data }
}

export const dispatchFetchedClothes = (data) => {
  return { type: FETCHED_CLOTHES, data }
}
