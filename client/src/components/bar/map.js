// SimpleMap.js
import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import './map.css'

const AnyReactComponent = ({ text, onClick }) => (
  <div className="pin" onClick={onClick}>
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

const InfoWindow = ({ text, onCloseClick }) => (
  <div className="info-window">
    <p>{text}</p>
    <button onClick={onCloseClick}>Close</button>
  </div>
);

const Map = ({ text, center, location }) => (
  <div className="google-map">
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyCltF-uTOpg8LJFvLWSNEPUjCMUyBYNG6g" }}
      defaultCenter={center}
      defaultZoom={100}
    >
      <AnyReactComponent
        lat={location.lat}
        lng={location.lng}
        text={text}
      />

    </GoogleMapReact>
  </div>
);

export { Map };


export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 21.02674047010943,
      lng: 105.8362758651441
    },
    zoom: 11
  };

  const [infoWindow, setInfoWindow] = useState(null);

  const handleMarkerClick = (text) => {
    setInfoWindow(text);
  };

  const handleInfoWindowClose = () => {
    setInfoWindow(null);
  };

  return (
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCltF-uTOpg8LJFvLWSNEPUjCMUyBYNG6g" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={21.026837216273547}
          lng={105.7790183602429}
          text={[
            <h3>Magic Post 1</h3>,
            <p>ĐCT20, Mỹ Đình, Từ Liêm, Hà Nội, Việt Nam</p>,
            <p>Hàng gửi: 100</p>,
            <p>Hàng nhận: 50</p>,
            <a href="">More detail</a>]}
        //onClick={() => handleMarkerClick("Magic Post 1")}
        />

        <AnyReactComponent
          lat={21.036786}
          lng={105.782470}
          text={[
            <h3>Magic Post 2</h3>,
            <p>Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội, Việt Nam</p>,
            <p>Hàng gửi: 50</p>,
            <p>Hàng nhận: 100</p>,
            <a href="">More detail</a>]}
        //onClick={() => handleMarkerClick("Magic Post 2")}
        />

        <AnyReactComponent
          lat={21.017005}
          lng={105.828398}
          text={[
            <h3>Magic Post 3</h3>,
            <p>Nguyễn Lương Bằng/Ngõ 40 Tổ 40+Tổ 41, Chợ Dừa, Đống Đa, Hà Nội, Việt Nam</p>,
            <p>Hàng gửi: 50</p>,
            <p>Hàng nhận: 100</p>,
            <a href="">More detail</a>]}
        //onClick={() => handleMarkerClick("Magic Post 3")}
        />

        {infoWindow && (
          <InfoWindow
            text={infoWindow}
            onCloseClick={handleInfoWindowClose}
          />
        )}
      </GoogleMapReact>
    </div>
  );
}