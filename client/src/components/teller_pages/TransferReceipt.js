import React from 'react';
import './styles/transferreceipt.css';
import ReactToPrint from 'react-to-print';

function TransferReceipt() {
    const handlePrint = () => {
        window.print();
    };
    return (
        <div className='print-container'>
            <div className='print-content'>
                <div className='logo-QR'>
                    <img src="./images/logo.png" className='logo' alt="logo" />
                    <div className='QRcode'>
                        <div className='QR'>QR</div>
                        <div className='ID'>Mã đơn hàng: </div>
                    </div>
                </div>

                <table>
                    <tbody>
                        <tr>
                            <td className='print'>
                                <p>1. Họ tên địa chỉ người gửi:</p>
                                <p>Điện thoại:</p>
                                <p>Mã khách hàng:</p>
                                <p>Mã bưu chính:</p>
                            </td>
                            <td colSpan="2" className='print'>
                                <p>2. Họ tên địa chỉ người nhận:</p>
                                <p>Điện thoại:</p>
                                <p>Mã khách hàng</p>
                                <p>Mã bưu chính:</p>
                            </td>
                        </tr>
                        <tr>
                            <td className='print'>
                                <p>3. Loại hàng gửi:</p>
                                <p>4. Nội dung trị giá bưu gửi:</p>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Nội dung</td>
                                            <td>Số lượng</td>
                                            <td>Trị giá</td>
                                            <td>Giấy tờ kèm theo</td>
                                        </tr>
                                        <tr>
                                            <td>Tong</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td className='print'>
                                <p>9. Cước</p>
                                <p>a. Cước chính:</p>
                                <p>b. Phụ phí:</p>
                                <p>c. Cước GTGT:</p>
                                <p>d. Tổng cước (gồm VAT):</p>
                                <p>e. Thu khác: </p>
                                <p><strong>f. Tổng thu:</strong></p>
                            </td>
                            <td className='print'>
                                <p>10. Khối lượng (kg):</p>
                                <p><strong>Khối lượng thực tế: </strong></p>
                                <p><strong>Khối lượng quy đổi: </strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td className='print'>
                                <p>5. Dịch vụ đặc biệt/Cộng thêm:</p>
                                <p>...........................................................................</p>
                                <p>...........................................................................</p>
                                <p> Mã hợp đồng EMSC/PPA</p>
                            </td>
                            <td className='print'>
                                <p>11. Thu của người nhận:</p>
                                <p>COD: </p>
                                <p>Thu khác: </p>
                                <p>Tổng thu: </p>
                            </td>
                            <td className='print'>
                                <p>12. Chú dẫn nghiệp vụ:</p>
                            </td>
                        </tr>
                        <tr>
                            <td className='print'>
                                <p>6. Chỉ dẫn của người gửi khi không phát được bưu gửi:</p>
                            </td>
                            <td colSpan="2" className='print'>
                                <p>13. Bưu cục chấp nhận</p>
                                <p>Chữ ký giao dịch viên nhận:</p>
                            </td>
                        </tr>
                        <tr>
                            <td className='print'>
                                <p>7. Cam kết của người gửi </p>
                                <p>Tôi chấp nhận các điều khoản và cam đoan bưu gửi này không chứa những mặt hàng nguy hiểm. Trường hợp không phát được hãy thực hiện chỉ dẫn ở mục 6, tôi sẽ trả cước chuyển hoàn</p>
                                <p>8. Ngày giờ gửi:</p>
                                <p>Chữ ký người gửi</p><br /><br />
                            </td>
                            <td colSpan="2" className='print'>
                                <p>14. Ngày giờ nhận:</p>
                                <p>Người nhận/Người được uỷ quyền nhận</p>
                                <p>(Ký và ghi rõ họ tên)</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>

                <button onClick={handlePrint}>Xác nhận in</button>
                <button className="cancel-button" onClick={() => window.history.back()}>Huỷ</button>
            </div>
        </div>
    );
}

export default TransferReceipt;
