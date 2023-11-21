import React, { useState } from 'react';
import MapShipment from './MapShipment';
import './styles/trackingshipment.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrackShipment = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [shipmentData, setShipmentData] = useState(null);
    const [shipmentLocation, setShipmentLocation] = useState(null);

    const findShipmentByTrackingNumber = (trackingNumber) => {
        // Dùng dữ liệu mẫu, bạn cần thay thế bằng logic thực tế để lấy dữ liệu từ server
        const sampleData = [
            {
                trackingNumber: '123456',
                status: 'Đang vận chuyển',
                progress: '50%',
                estimatedDelivery: '2023-12-31',
                location: {
                    lat: 37.7749, // Latitude
                    lng: -122.4194, // Longitude
                },
                history: [
                    { time: '10h30 2023-12-29', event: 'Đặt đơn thành công' },
                    { time: '9h30 2023-01-30', event: 'Đơn hàng đã bàn giao cho đơn vị vận chuyển' },
                    { time: '11h00 2023-01-30', event: 'Đơn hàng đã đến điểm bưu cục A' },
                    // Thêm sự kiện khác tùy ý
                ],
            },
            // Thêm dữ liệu đơn hàng khác tùy ý
        ];

        return sampleData.find((shipment) => shipment.trackingNumber === trackingNumber);
    };

    const handleTrackShipment = () => {
        // Kiểm tra xem mã đơn hàng có tồn tại trong dữ liệu hay không
        const foundShipment = findShipmentByTrackingNumber(trackingNumber);

        if (foundShipment) {
            // Nếu tồn tại, cập nhật trạng thái và vị trí
            setShipmentData(foundShipment);
            setShipmentLocation(foundShipment.location);
        } else {
            toast.error('Mã đơn hàng không tồn tại.');
        setShipmentData(null);
        setShipmentLocation(null);
        }
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
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
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
                                        {shipmentData.history.map((event, index) => (
                                            <li key={index}>{event.time}: {event.event}</li>
                                        ))}
                                    </ul>
                                </div>

                            )}
                        </form>

                        {/* <img src='./styles/images/image-tracking.jpg' alt="Image Tracking" className="image-tracking" /> */}
                        <img src={process.env.PUBLIC_URL + '/images/image-tracking.jpg'} alt="Image Tracking" className="image-tracking" />
                    </div>


                    {shipmentLocation && (
                        <div className="mt-4">
                            <h3>Vị Trí Đơn Hàng Hiện Tại</h3>
                            <MapShipment lat={shipmentLocation.lat} lng={shipmentLocation.lng} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackShipment;
