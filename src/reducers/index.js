import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
import * as types from '../actions/actionTypes'

// Tab导航激活Tab数据
const homeTabsInitialState = fromJS({
  activeTab: 'home'
})
const homeTabs = (state = homeTabsInitialState, action) => {
  switch (action.type) {
    case types.SWITCH_HOME_TAB:
      return state.merge({
        activeTab: action.activeTab
      })
    default:
      return state
  }
}
const noticeState = (state = fromJS({
  noticeData: [],
    pn: 1,
    ps: 10,
    loading: false,
    noMoreData: false
}), action) => {
  switch (action.type) {
    case types.CACHE_NOTICE_DATA:
      return state.merge(action.state)
    default:
      return state
  }
}

export default combineReducers({
  homeTabs,
  noticeState
})
