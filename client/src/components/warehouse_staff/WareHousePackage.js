import React, { useState, useEffect } from "react";
import axios from 'axios';
import './styles/orderlist.css';
import Navbar from "../bar/Navbar";
import Sidebar from "../bar/Sidebar";

const WarehousePackage = () => {

    const pointID = localStorage.getItem('pointID');
    const token = localStorage.getItem('token');

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleToTransactionPoint = (packageID) => {
        try {
            axios.get('http://127.0.0.1:3000/warehouse/order/create?type=toTransactionPoint&packageID=' + packageID + '&pointID=' + pointID, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((res) => {
                console.log(res.data);
            });
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    }

    const handleToArea = (packageID) => {
        try {
            axios.get('http://127.0.0.1:3000/warehouse/order/create?type=toArea&packageID=' + packageID + '&pointID=' + pointID, {
                headers: {
                    'Authorization': `Bearer ${token}`
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
                await axios.get('http://127.0.0.1:3000/warehouse/package?pointID=' + pointID + "&type=pending", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((res) => {
                    setPackages(res.data);
                    console.log( "packages: ", res.data);
                });
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };
        fetchPackages();
    }, []);

    // if (packages) {
    //     setLoading(false);
    // }

    return (
        <div className='container'>
            <Navbar />  
            <div className="content-container">

            <Sidebar />
            <div className='content'>
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
                                <th>Thao tác</th>
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
                                <td>{pack.senderDetails.name}</td>
                                <td>{pack.receiverDetails.name}</td>
                                <td></td>
                                <td></td>
                                <td>{pack.status}</td>
                                <td>
                                    <button onClick={() => handleToTransactionPoint(pack.ID)}>Đến điểm giao dịch </button>
                                    <button onClick={() => handleToArea(pack.ID)}>Đến khu vực đích</button>
                                </td>
                            </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    );
}

export default WarehousePackage;
