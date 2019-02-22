import { combineReducers } from 'redux-immutable'
import { fromJS } from 'immutable'
import * as types from '../actions/actionTypes'

// Tab导航激活Tab数据
const HomeTabsInitialState = fromJS({
  activeTab: 'home'
})
const HomeTabs = (state = HomeTabsInitialState, action) => {
  switch (action.type) {
    case types.SWITCH_HOME_TAB:
      return state.merge({
        activeTab: action.activeTab
      })
    default:
      return state
  }
}

export default combineReducers({
  HomeTabs,
})
