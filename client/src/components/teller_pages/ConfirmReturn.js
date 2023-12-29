import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

const ConfirmReturn = () => {
    // const orderReturn = [
    //     { id: "AB12", sender: "Nguyễn Văn A", recipient: "", date: "2023-11-10", address: "Bưu cục A", reason: "lỗi sản phẩm"},
    //     { id: "AB23", sender: "Nguyễn Văn B", recipient: "", date: "2023-11-15", address: "Bưu cục B", reason: "không liên lạc được người nhận"},
    // ];

    const token = localStorage.getItem('token');
    const pointID = localStorage.getItem('pointID');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            axios.get('http://127.0.0.1:3000/transactionPoint/order?type=pending&pointID=' + pointID , {
                
            }).then((response) => {
                setOrders(response.data);
                console.log("pending orders:", response.data);
                if (orders) {
                    setLoading(false);
                }
            })
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, []);

    const handleConfirm = async (orderId) => {
        try {
            // Send the request here
            axios.get('http://127.0.0.1:3000/transactionPoint/order/confirm?orderID=' + orderId, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    console.log('Confirm response:', response.data);
                });
            
            // Perform any necessary actions after the request is successful
        } catch (error) {
            console.error('Error confirming orders:', error);
        }
    }


    return (
        <div className='container'>
            <div className='confirm-return-container'>
                <h2>Xác Nhận Hàng Chuyển Về</h2>

                <div className='list-order-return'>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã Đơn Hàng</th>
                                <th>Người Gửi</th>
                                <th>Người Nhận</th>
                                <th>Ngày Xác Nhận Đơn</th>
                                <th>Điểm Vận Chuyển Gửi Về</th>
                                <th>Lý Do Trả Về</th>
                                <th>Xác Nhận</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <div>Loading...</div> : 
                            (orders.map(order => (
                            <tr key={order.id}>
                                <td>
                                    {order.packageID}
                                {/* <input
                                    type="checkbox"
                                    checked={selectedOrders.includes(order.id)}
                                    onChange={() => handleCheckboxChange(order.id)}
                                /> */}
                                </td>
                                <td>{order._id}</td>
                                <td>{order.type}</td>
                                <td></td>
                                <td>{order.sendDate}</td>
                                <td>{order.status}</td>
                                <td>
                                <button onClick={() => handleConfirm(order.id)}>Xác nhận</button>
                                </td>
                            </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ConfirmReturn;
