import { combineReducers } from "redux-immutable";
import { fromJS, List } from "immutable";
import * as types from "../actions/actionTypes";

// Tab导航激活Tab数据
const homeTabsInitialState = fromJS({
  activeTab: "home",
  weather: {},
  consultNum: 0
});
const homeTabs = (state = homeTabsInitialState, action) => {
  switch (action.type) {
    case types.SWITCH_HOME_TAB:
      return state.merge({
        activeTab: action.activeTab
      });
    case types.CACHE_HOME_DATA:
      return state.mergeDeep({
        weather: action.state.weather,
        consultNum: action.state.consultNum
      });
    default:
      return state;
  }
};
// 政策宣传
const noticeState = (
  state = fromJS({
    noticeData: [],
    pn: 1,
    ps: 10,
    loading: false,
    noMoreData: false
  }),
  action
) => {
  switch (action.type) {
    case types.REQUEST_NOTICE_DATA:
      return state.merge({
        loading: true
      });
    case types.RECEIVE_NOTICE_DATA:
      let pageSize = state.get("ps");
      let pageNum = state.get("pn");
      let noticeData = state.get("noticeData");
      return state.merge({
        loading: false,
        noticeData: noticeData.merge(action.list), // 直接mergeDeep也是可以的
        pn: action.list.length >= pageSize ? ++pageNum : pageNum,
        noMoreData: action.list.length < pageSize
      });
    case types.UPDATE_NOTICE_DATA:
      return state.merge({
        pn: 1,
        noMoreData: false,
        noticeData: List([]) // 这里不能写普通的空数组，会导致丢失toJS特性，引发错误
      });
    case types.CACHE_NOTICE_DATA:
      return state.merge(action.state);
    default:
      return state;
  }
};
// 办事指南
const guide = (state=fromJS({
  data:[],
  loading: false,
  noMoreData: false
}), action) => {
  switch (action.type) {
    case types.REQUEST_GUIDE_DATA:
      return state.merge({
        loading: true
      })
    case types.RECEIVE_GUIDE_DATA:
      return state.mergeDeep({
        loading: false,
        data: action.list
      })
    default:
      return state
  }
}
// 提建议，咨询
export const makeCenter = (state=fromJS({
  unitList: [],
  consultSubjectList: []
}), action) => {
  switch (action.type) {
    case types.FETCH_UNIT_LIST:
      return state.mergeDeep({
        unitList: action.list
      })
    case types.FETCH_CONSULT_SUBJECT:
      return state.set('consultSubjectList', List(action.list))
      // 这里不能merge, 因为是一个刷新操作
    default:
      return state
  }
}

export default combineReducers({
  homeTabs,
  noticeState,
  guide,
  makeCenter
});
