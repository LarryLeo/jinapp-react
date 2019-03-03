import { requestGet } from '../utils/utils'
import * as types from './actionTypes'

// 提取用户凭据
const userCredential = JSON.parse(localStorage.getItem('userCredential'))
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
    let res = await requestGet({
      apiUrl: '/app/v1/consult/getConsultSubjectList',
      data: {
        member_id: userCredential.member_id,
        member_token: userCredential.member_token,
        unit_id: unitId
      }
    })
    res.success && dispatch({
      type: types.FETCH_CONSULT_SUBJECT,
      list: res.data.list
    })
  }
}

// 我的历史记录
const receiveHistoryData = (calledName, list) => ({
  type: types.RECEIVE_HISTORY_DATA,
  calledName,
  list
})
export const updateHistory = (calledName) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.UPDATE_HISTORY_DATA,
      calledName
    })
    return dispatch(requestHistoryData(calledName))
  }
}
export const requestHistoryData = (calledName) => {
  return async(dispatch, getState) => {
    // 判断是否应该请求
    if(getState().getIn([calledName, 'noMoreData'])) return
    dispatch({type: types.REQUEST_HISTORY_DATA, calledName})
    // 判断请求参数
    let apiUrl = calledName === 'mySuggestions' ? '/app/v1/suggestion/mySuggestionList' : '/app/v1/consult/myConsultList'
    let data = {
      member_id: userCredential.member_id,
      member_token: userCredential.member_token,
      pn: getState().getIn([calledName, 'pn']),
      ps: getState().getIn([calledName, 'ps']),
    }
    let res = await requestGet({
      apiUrl,
      data
    })
    res.success && dispatch(receiveHistoryData(calledName, res.data.list))
  }
}

// 获取联系企业和企业联系人
export const fetchCompanies = () => {
  return async(dispatch, getState) => {
    if(getState().getIn(['companies', 'data']).size) return
    let res = await requestGet({
      apiUrl: '/app/v1/company/allList',
      data: {...userCredential}
    })
    return dispatch({
      type: types.FETCH_COMPANIES,
      list: res.list
    })
  }
}
export const fetchPersonList = () => {
  return async(dispatch, getState) => {
    let company_id = getState().getIn(['companies', 'selectedCompany', 'id'])
    let res = await requestGet({
      apiUrl: '/app/v1/company/allMemberList',
      data: {...userCredential, company_id}
    })
    return dispatch({
      type: types.FETCH_PERSON_LIST,
      list: res.list
    })
  }
}
export const cacheSelectedCompany = (selectedCompany) => ({
  type: types.CACHE_SELECTED_COMPANY,
  selectedCompany,
})
export const cacheSelectedPerson = (selectedPerson) => ({
  type: types.CACHE_SELECTED_PERSON,
  selectedPerson,
})
export const resetSelectedPerson = () => ({
  type: types.RESET_SELECTED_PERSON
})
export const updateChatList = () => {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_CHAT_LIST
    })
    return dispatch(fetchChatList())
  }
}
export const fetchChatList = () => {
  return async(dispatch, getState) => {
    let chatList = getState().get('chatList')
    if(chatList.get('noMoreData')) return
    dispatch({
      type: types.REQUEST_CHAT_LIST
    })
    let res = await requestGet({
      apiUrl: '/app/v1/chat/myChatList',
      data: {
        ...userCredential,
        pn: chatList.get('pn'),
        ps: chatList.get('ps')
      }
    })
    dispatch({
      type: types.RECEIVE_CHAT_LIST,
      list: res.list
    })
  }
}
export const cacheCompanyActiveTabIndex = (activeTabIndex) => ({
  type: types.CACHE_COMPANY_ACTIVE_TAB,
  activeTabIndex
})

// 追踪登录状态
export const checkLogin = (login) => ({
  type: types.CHECK_LOGIN,
  login
})
