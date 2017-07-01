const GET_SELECTED_IMAGES = 'GET_SELECTED_IMAGES'

export function dispatchGetSelectedImages(array) {
  return { type: GET_SELECTED_IMAGES, array }
}
