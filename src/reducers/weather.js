import http from '../modules/http'

// ------------------------------------
// Constants
// ------------------------------------
const SEARCH_IN_PROGRESS = 'weather::search_in_progress'
const SET_SEARCH_RESULTS = 'weather::set_search_results'
const APPEND_SEARCH_RESULTS = 'weather::append_search_results'

// ------------------------------------
// Actions
// ------------------------------------
export const setSearchResults = (query, data) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_RESULTS,
    payload: {
      query,
      data
    }
  })
}

export const appendSearchResults = (data) => (dispatch) => {
  dispatch({ type: APPEND_SEARCH_RESULTS, payload: data })
}

export const search = (query) => (dispatch) => {
  dispatch(searchInProgress(true))
  http.get('/search', {
    params: {
      query
    }
  }).then((response) => {
    dispatch(setSearchResults(query, response.data))
    dispatch(searchInProgress(false))
  })
}

export const loadMore = () => (dispatch, getState) => {
  dispatch(searchInProgress(true))
  http.get('/search', {
    params: {
      query: getState().weather.query,
      offset: getState().weather.results.length
    }
  }).then((response) => {
    dispatch(appendSearchResults(response.data))
    dispatch(searchInProgress(false))
  })
}

export const searchInProgress = (value) => (dispatch) => {
  dispatch({ type: SEARCH_IN_PROGRESS, payload: value })
}

export const actions = {
  setSearchResults,
  appendSearchResults,
  search,
  loadMore,
  searchInProgress,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SEARCH_IN_PROGRESS]: (state, { payload }) => {
    return {
      ...state,
      searchInProgress: payload,
    }
  },
  [SET_SEARCH_RESULTS]: (state, { payload: { query, data } }) => {
    return {
      ...state,
      query,
      results: data
    }
  },
  [APPEND_SEARCH_RESULTS]: (state, { payload }) => {
    return {
      ...state,
      results: [...(state.results), ...payload]
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  searchInProgress: false,
  results: [],
  query: ''
}

export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
