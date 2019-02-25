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
// 办事指南
const requestGuideData = () => ({
  type: types.REQUEST_GUIDE_DATA
})
const receiveGuideData = (list) => ({
  type: types.RECEIVE_GUIDE_DATA,
  list
})
export const fetchGuideData = () => {
  return async(dispatch, getState) => {
    dispatch(requestGuideData())
    let res = await requestGet({
      apiUrl: '/app/v1/guide/getGuideList',
      data: {
        filter: 'common'
      }
    });
    return dispatch(receiveGuideData(res.data.list))
  }
}
//提建议，咨询
export const fetchUnitList = () => {
  return async(dispatch, getState) => {
    let res = await requestGet({apiUrl: '/app/v1/index/getUnitList'})
    res.success && dispatch({
      type: types.FETCH_UNIT_LIST,
      list: res.data.list
    })
  }
}
export const fetchConsultSubject = (unitId) => {
  return async(dispatch, getState) => {
    let userCredential = JSON.parse(localStorage.getItem('userCredential'))
    let res = await requestGet({
      apiUrl: '/app/v1/consult/getConsultSubjectList',
      data: {
        member_id: userCredential.member_id,
        member_token: userCredential.member_token,
        unitId,
      }
    })
    res.success && dispatch({
      type: types.FETCH_CONSULT_SUBJECT,
      list: res.data.list
    })
  }
}
