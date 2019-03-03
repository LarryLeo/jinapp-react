import React, { Component } from "react";
import { Map, Marker } from "react-amap";

export default class Navigation extends Component {
  render() {
    const mapCenter = { latitude: 29.308723, longitude: 106.265378 };
    const mapPlugins = [
      {
        name: "ToolBar",
        options: {
          liteStyle: false,
          position: "LT"
        }
      }
    ];
    return (
      <div style={{ height: document.documentElement.clientHeight - 45 }}>
        <Map
          amapkey="3b64fd5f5dec27923b2636127395b9f6"
          plugins={mapPlugins}
          zoom={16}
          center={mapCenter}
        >
          <Marker position={mapCenter} title='江津公安局' />
        </Map>
      </div>
    );
  }
}
