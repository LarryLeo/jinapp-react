import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Flex } from "antd-mobile";

import Swiper from "swiper/dist/js/swiper.js";
import "swiper/dist/css/swiper.min.css";

import slideImage from "../../assets/images/slider.jpg";
import iconChat from "../../assets/icons/chat.png";
import iconConsult from "../../assets/icons/consult.png";
import iconGuide from "../../assets/icons/guide.png";
import iconPolicy from "../../assets/icons/policy.png";
import iconSuggestion from "../../assets/icons/suggestion.png";
import bgImgWeather from "../../assets/images/weather.jpg";

import { requestGet } from '../../utils/utils'

import { HomePageWrapper } from "./style";

export default class Home extends Component {
  state = {
    slideImages: [slideImage, slideImage, slideImage]
  };
  componentDidMount() {
    // 实例化Swiper
    var mySwiper = new Swiper(".swiper-container", {
      loop: true, //循环
      pagination: {
        el: ".swiper-pagination",
        clickable: true // 允许点击跳转
      }
    });
    // 测试异步请求
    requestGet({
      apiUrl: '/app/v1/index/weather',
    }).then(res => {
      console.log(res)
    })
  }
  render() {
    return (
      <HomePageWrapper>
        <section className="swiper-container">
          <div className="swiper-wrapper">
            {this.state.slideImages.map((slide, index) => (
              <div className="swiper-slide" key={index}>
                <img
                  className="slideImg"
                  style={{ width: "100%" }}
                  src={slide}
                  alt="slide"
                />
              </div>
            ))}
          </div>
          <div className="swiper-pagination" />
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
              <Flex justify="center">
                <img className="menuIcon" src={iconGuide} alt="" />
                <span>办事指南</span>
              </Flex>
            </div>
            <div className="menuItem" style={{ backgroundColor: "#ff5555" }}>
              <Flex justify="center">
                <img className="menuIcon" src={iconSuggestion} alt="" />
                <span>意见建议</span>
              </Flex>
            </div>
            <div className="menuItem" style={{ backgroundColor: "#00c9db" }}>
              <Flex justify="center">
                <img className="menuIcon" src={iconConsult} alt="" />
                <span>求助咨询</span>
              </Flex>
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
            <span style={{ fontSize: "16px" }}>152人</span>
            <a href="">立即咨询</a>
          </Flex>
          <p style={{ marginTop: "20px", color: "#9ed5ff" }}>已在警企e通咨询</p>
        </section>
        {/* 天气 */}
        <section className="weather">
          <img src={bgImgWeather} alt="weather" className="weatherBg" />
          <div className="weatherText">
            <p className="temp">9~11℃</p>
            <p className="text">今日天气：小雨</p>
          </div>
        </section>
        {/* <Link
          to={{
            pathname: "/notice",
            state: {
              title: "政策宣传"
            }
          }}
        >
          <p>跳转至政策宣传</p>
        </Link> */}
      </HomePageWrapper>
    );
  }
}
