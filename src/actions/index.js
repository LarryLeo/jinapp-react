import * as types from './actionTypes'

export const switchHomeTabs = (activeTab) => ({
  type: types.SWITCH_HOME_TAB,
  activeTab,
})
