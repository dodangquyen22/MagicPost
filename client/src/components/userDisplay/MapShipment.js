import React from 'react';
import GoogleMapReact from 'google-map-react';

const MapShipment = ({ lat, lng }) => {
  const center = { lat, lng };
  const zoom = 15;

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }} // Đặt khóa API của bạn ở đây
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/* Marker đơn hàng */}
        <Marker lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
};

const Marker = () => <div style={{ color: 'red', fontSize: '24px' }}>📍</div>;

export default MapShipment;
