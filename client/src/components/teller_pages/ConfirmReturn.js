import React from 'react';

const ConfirmReturn = () => {
    const orderReturn = [
        { id: "AB12", sender: "Nguyễn Văn A", recipient: "", date: "2023-11-10", address: "Bưu cục A", reason: "lỗi sản phẩm"},
        { id: "AB23", sender: "Nguyễn Văn B", recipient: "", date: "2023-11-15", address: "Bưu cục B", reason: "không liên lạc được người nhận"},
    ];

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
                            <tr>
                                <td>DH123456</td>
                                <td>Nguyễn Văn A</td>
                                <td>Nguyễn Thị B</td>
                                <td>01/11/2023</td>
                                <td>Điểm A</td>
                                <td>Lỗi sản phẩm</td>
                                <td>
                                    <button>Xác Nhận</button>
                                </td>
                            </tr>
                            {/* Add more rows as needed */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ConfirmReturn;
