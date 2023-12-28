import React, { useState, useEffect } from 'react';
import './styles/trackingshipment.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrackShipment = () => {
    const [packageID, setPackageID] = useState('');
    const [shipmentData, setShipmentData] = useState(null);
    const [shipmentLocation, setShipmentLocation] = useState(null);

    const findShipmentByPackageID = async (packageID) => {
        var data = null;
        try {
            const response = await fetch(`http://localhost:3000/track`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ packageID })
            });
            data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const handleTrackShipment = () => {
        findShipmentByPackageID(packageID) // Updated function call
            .then((foundShipment) => {
                console.log('Found shipment:' + foundShipment);
                if (foundShipment && Object.keys(foundShipment).length > 0) {
                    setShipmentData(foundShipment);
                    setShipmentLocation(foundShipment.location);
                } else {
                    toast.error('Mã đơn hàng không tồn tại.');
                    setShipmentData(null);
                    setShipmentLocation(null);
                }
            }).catch((error) => {
                console.error(error);
            });
    };
    return (
        <div className='container'>
            <div className="trackshipment-container">
                <div className='tracshipment-content'>
                    <h2>Tra Cứu Trạng Thái và Tiến Trình Chuyển Phát</h2>
                    <div className='form-content'>

                        <form className='form-tracking' onSubmit={(e) => {
                            e.preventDefault(); // Ngăn chặn hành động submit mặc định của form
                            handleTrackShipment();
                        }}>
                            <div className="mb-3">
                                <h2>Mã phiếu gửi:</h2>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={packageID}
                                    onChange={(e) => setPackageID(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleTrackShipment();
                                        }
                                    }}
                                />
                            </div>

                            <div className="d-grid shipment-submit">
                                <button type="button" className="btn btn-primary" onClick={handleTrackShipment} >
                                    Tra Cứu
                                </button>
                            </div>

                            {shipmentData && (
                                <div className="mt-4">
                                    <h3>Trạng Thái và Tiến Trình Chuyển Phát</h3>
                                    <p><strong>Trạng Thái:</strong> {shipmentData.status}</p>
                                    <p><strong>Tiến Trình:</strong> {shipmentData.progress}</p>
                                    <p><strong>Dự Kiến Giao Hàng:</strong> {shipmentData.estimatedDelivery}</p>

                                    <h3>Lịch Sử Vận Chuyển</h3>
                                    <ul>
                                        {shipmentData.map((order, index) => (
                                        <li key={index}>
                                            {order.sendDate}:  
                                            {order.status === 'shipping' && (
                                            <span>Shipment is currently in transit from {order.send_point_id} to {order.receive_point_id}</span>
                                            )}
                                            {order.status === 'delivered' && (
                                                <span>Shipment has been delivered from {order.send_point_id} to {order.receive_point_id}</span>
                                            )}
                                            {order.status === 'failed' && (
                                                <span>Shipment delivery failed when sent from {order.send_point_id} to {order.receive_point_id}</span>
                                            )}
                                            {order.status === 'success' && (
                                                <span>Shipment delivered successfully from {order.send_point_id} to {order.receive_point_id}</span>
                                            )}
                                        </li>
                                        ))}
                                    </ul>
                                </div>

                            )}
                        </form>

                        {/* <img src='./styles/images/image-tracking.jpg' alt="Image Tracking" className="image-tracking" /> */}
                        <img src={process.env.PUBLIC_URL + '/images/image-tracking.jpg'} alt="Image Tracking" className="image-tracking" />
                    </div>


                    {/* {shipmentLocation && (
                        <div className="mt-4">
                            <h3>Vị Trí Đơn Hàng Hiện Tại</h3>
                            <MapShipment lat={shipmentLocation.lat} lng={shipmentLocation.lng} />
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default TrackShipment;
