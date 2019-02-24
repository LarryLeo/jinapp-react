import * as types from './actionTypes'

export const switchHomeTabs = (activeTab) => ({
  type: types.SWITCH_HOME_TAB,
  activeTab,
})

export const cacheNoticeState = (state) => ({
  type: types.CACHE_NOTICE_DATA,
  state: state
})
