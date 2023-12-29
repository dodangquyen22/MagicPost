import React, { useState, useEffect } from "react";
import axios from 'axios';
import './styles/orderlist.css';
import Sidebar from "../bar/Sidebar";
import { faL } from "@fortawesome/free-solid-svg-icons";

const StoredPackages = () => {

    const pointID = localStorage.getItem('pointID');
    const token = localStorage.getItem('token');

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleToCustomer = (packageID) => {
        try {
            axios.get('http://127.0.0.1:3000/transactionPoint/order/create?type=toCustomer&packageID=' + packageID + '&pointID=' + pointID, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
            });
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    }

    const handleToWarehouse = (packageID) => {
        try {
            axios.get('http://127.0.0.1:3000/transactionPoint/order/create?type=toWarehouse&packageID=' + packageID + '&pointID=' + pointID, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
            });
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    }

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                await axios.get('http://127.0.0.1:3000/transactionPoint/package?pointID=' + pointID, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    setPackages(res.data);
                    console.log( "packages: ", res.data);
                    if (packages) {
                        setLoading(false);
                    }
                });
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };
        fetchPackages();
    }, []);

    

    return (
        <div className='container'>
            <div className='confirm-return-container'>
                <h2>Xác Nhận Hàng Chuyển Hàng</h2>

                <div className='list-order-return'>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã Đơn Hàng</th>
                                <th>Người Gửi</th>
                                <th>Người Nhận</th>
                                <th>Ngày Xác Nhận Đơn</th>
                                <th> Gửi Đến Điểm Tập Kết</th>
                                <th>Thông tin hàng</th>
                                <th>Tạo đơn</th>
                            </tr>
                        </thead>
                        <tbody>
                        {loading? <div>Loading...</div> : 
                            (packages.map(pack => (
                            <tr key={pack.ID}>
                                <td>
                                    {pack.ID}
                                {/* <input
                                    type="checkbox"
                                    // checked={selectedOrders.includes(pack.id)}
                                    // onChange={() => handleCheckboxChange(pack.id)}
                                /> */}
                                </td>
                                <td>{"Tên: "+pack.senderDetails.name}
                                {", SĐT:"+pack.senderDetails.phone}{
                                }</td>
                                <td>{"Tên: "+pack.receiverDetails.name +", SĐT:"+pack.receiverDetails.phone}</td>
                                <td>{pack.receiveDate}</td>
                                <td></td>
                                <td>{pack.status}</td>
                                <td>
                                    <button onClick={() => handleToCustomer(pack.ID)}>Đến khách </button>
                                    <button onClick={() => handleToWarehouse(pack.ID)}>Đến tập kết</button>
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

export default StoredPackages;
