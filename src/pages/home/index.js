import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Flex } from "antd-mobile";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { connect } from 'react-redux'
import { cacheHomeState } from '../../actions/index'


import { HomePageWrapper } from "./style";

import slideImage from "../../assets/images/slider.jpg";
import iconChat from "../../assets/icons/chat.png";
import iconConsult from "../../assets/icons/consult.png";
import iconGuide from "../../assets/icons/guide.png";
import iconPolicy from "../../assets/icons/policy.png";
import iconSuggestion from "../../assets/icons/suggestion.png";
import bgImgWeather from "../../assets/images/weather.jpg";

import { requestGet } from '../../utils/utils'


class Home extends Component {
  state = {
    slideImages: [slideImage, slideImage, slideImage],
    weather: {},
    consultNum: ''
  };

  fetchIndexPageData = async() => {
    let weatherRes = await requestGet({
      apiUrl: '/app/v1/index/weather'
    })
    let consultNumRes = await requestGet({
      apiUrl: '/app/v1/index/getIndexView'
    })
    this.setState({
      weather: weatherRes.data.weather,
      consultNum:consultNumRes.data.total_consult_member
    })
  }

  componentDidMount() {

  if(this.props.homeTabs.get('weather').size) {
    const state = this.props.homeTabs.toJS()
    return this.setState({
     weather: state.weather,
     consultNum: state.consultNum
    })
  }
  this.fetchIndexPageData()
  }
  componentWillUnmount() {
    this.props.cacheHomeState(this.state)
  }
  render() {
    return (
      <HomePageWrapper>
        <section className='slider'>
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
          >
            {this.state.slideImages.map((slide, index) => <img src={slide} alt='slide' className='slideImg' key={index} />)}
          </Carousel>
        </section>
        {/* 功能导航  */}
        <section className="menuGrid">
          <Flex wrap="wrap" justify="between">
            <div className="menuItem">
              <Link
                to={{
                  pathname: "/notice",
                  state: {
                    title: "政策宣传"
                  }
                }}
              >
                <Flex justify="center">
                  <img className="menuIcon" src={iconPolicy} alt="" />
                  <span>政策宣传</span>
                </Flex>
              </Link>
            </div>
            <div className="menuItem" style={{ backgroundColor: "#ffa800" }}>
              <Link to={{
                pathname: '/guide',
                state: {
                  title: '办事指南'
                }
              }}>
                <Flex justify="center">
                  <img className="menuIcon" src={iconGuide} alt="" />
                  <span>办事指南</span>
                </Flex>
              </Link>
            </div>
            <div className="menuItem" style={{ backgroundColor: "#ff5555" }}>
              <Link to={{pathname: '/make/suggestion', state: {title: '意见建议'}}}>
                <Flex justify="center">
                  <img className="menuIcon" src={iconSuggestion} alt="" />
                  <span>意见建议</span>
              </Flex>
              </Link>
            </div>
            <div className="menuItem" style={{ backgroundColor: "#00c9db" }}>
              <Link to={{pathname: '/make/consultation', state: {title: '求助咨询'}}}>
                <Flex justify="center">
                  <img className="menuIcon" src={iconConsult} alt="" />
                  <span>求助咨询</span>
              </Flex>
              </Link>
            </div>
            <div className="menuItem" style={{ backgroundColor: "#007aff" }}>
              <Flex justify="center">
                <img className="menuIcon" src={iconChat} alt="" />
                <span>警企互联</span>
              </Flex>
            </div>
          </Flex>
        </section>
        {/* 咨询人数 */}
        <section className="consultInfo">
          <Flex justify="between">
            <span style={{ fontSize: "16px" }}>{this.state.consultNum}人</span>
            <span style={{ fontSize: "16px" }}>立即咨询</span>
          </Flex>
          <p style={{ marginTop: "20px", color: "#9ed5ff" }}>已在警企e通咨询</p>
        </section>
        {/* 天气 */}
        <section className="weather">
          <img src={bgImgWeather} alt="weather" className="weatherBg" />
          <div className="weatherText">
            <p className="temp">{this.state.weather.temp1}~{this.state.weather.temp2}</p>
            <p className="text">今日天气：{this.state.weather.weather}</p>
          </div>
        </section>
      </HomePageWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  homeTabs: state.get('homeTabs')
})

const mapDispatchToProps = {
  cacheHomeState,
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
