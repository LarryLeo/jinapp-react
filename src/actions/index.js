import { requestGet } from '../utils/utils'
import * as types from './actionTypes'

// 处理首页数据
export const switchHomeTabs = (activeTab) => ({
  type: types.SWITCH_HOME_TAB,
  activeTab,
})

export const cacheHomeState = (state)=> ({
  type: types.CACHE_HOME_DATA,
  state
})

// 处理Notice页面数据获取逻辑
export const requestNoticeData = () => ({
  type: types.REQUEST_NOTICE_DATA
})
export const receiveNoticeData = (list) => ({
  type: types.RECEIVE_NOTICE_DATA,
  list,
})
export const updateNoticeData = () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.UPDATE_NOTICE_DATA
    })
    return dispatch(fetchNoticeData())
  }
}

export const fetchNoticeData = () => {
  return async(dispatch, getState) => {
    let noticeState = getState().get('noticeState')
    if(noticeState.get('noMoreData')) return
    dispatch(requestNoticeData())
    let res = await requestGet({
      apiUrl: "/app/v1/index/articleList",
      data: {
        type_id: 3,
        pn: noticeState.get('pn'),
        ps: noticeState.get('ps')
      }
    });
    let list = res.data.list
    dispatch(receiveNoticeData(list))
  }
}

export const cacheNoticeState = (state) => ({
  type: types.CACHE_NOTICE_DATA,
  state: state
})
