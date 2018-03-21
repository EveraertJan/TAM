import {
  FILE_UPLOAD_IMAGE
} from './../constants/FileConstants'

export function FileUploadImage(payload) {
  return {
    type: FILE_UPLOAD_IMAGE,
    payload
  }
}
