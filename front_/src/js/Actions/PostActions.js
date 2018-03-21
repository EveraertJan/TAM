export const POST_FETCH_LIST = 'POST_FETCH_LIST';
export const POST_FETCH_LIST_SUCCESS = 'POST_FETCH_LIST_SUCCESS';
export const POST_FETCH_LIST_FAILED = 'POST_FETCH_LIST_FAILED';
export const POST_FETCH_DETAIL = 'POST_FETCH_DETAIL';
export const POST_FETCH_DETAIL_SUCCESS = 'POST_FETCH_DETAIL_SUCCESS';
export const POST_FETCH_DETAIL_FAILED = 'POST_FETCH_DETAIL_FAILED';
export const POST_CREATE_ITEM = 'POST_CREATE_ITEM';

export function PostCreateItem(data) {
  return {
    type: POST_CREATE_ITEM,
    data
  }
}

export function PostFetchList(data) {
  console.log('triggered')
  return {
    type: POST_FETCH_LIST,
    data
  }
}

export function PostFetchDetail(data) {
  return {
    type: POST_FETCH_DETAIL,
    data
  }
}