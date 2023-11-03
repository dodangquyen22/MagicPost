import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarker, faPhone, faClipboard, faBox, faFileAlt, faList, faWeight, faDollarSign, faComment } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import './styles/recordtransaction.css';

const RecordTransaction = () => {
    const [sender, setSender] = useState({ name: '', address: '', phone: '' });
    const [recipient, setRecipient] = useState({ name: '', address: '', phone: '' });
    const [packageDetails, setPackageDetails] = useState({
        code: '',
        type: '',
        name: '',
        quantity: '',
        weight: '',
        price: '',
        specialFeatures: [],
    });
    const [request, setRequest] = useState('');

    const [termsAccepted, setTermsAccepted] = useState(false);


    const handleRecordTransaction = () => {

    
    if (!termsAccepted) {
        alert('Vui lòng chấp nhận điều khoản trước khi ghi nhận đơn hàng.');
        return;
    }

    if (sender.name === '' || sender.address === '' || sender.phone === '') {
        alert('Vui lòng nhập đầy đủ thông tin người gửi.');
        return;
    }

    if (recipient.name === '' || recipient.address === '' || recipient.phone === '') {
        alert('Vui lòng nhập đầy đủ thông tin người nhận.');
        return;
    }

    if (packageDetails.code === '' || packageDetails.type === '' || packageDetails.name === '' || packageDetails.quantity === '' || packageDetails.weight === '' || packageDetails.price === '') {
        alert('Vui lòng nhập đầy đủ thông tin hàng hoá.');
        return;
    }


    if (!validatePhoneNumber(sender.phone) || !validatePhoneNumber(recipient.phone)) { 
        alert('Vui lòng nhập đúng định dạng số điện thoại.');
        return;
    }

        

        // Xử lý ghi nhận đơn hàng, có thể gửi dữ liệu lên server tại đây
        console.log('Đã ghi nhận đơn hàng:', {
            sender,
            recipient,
            packageDetails,
            request,
        });
        // Thực hiện các bước cần thiết

        // Reset form sau khi ghi nhận
        setSender({ name: '', address: '', phone: '' });
        setRecipient({ name: '', address: '', phone: '' });
        setPackageDetails({ code: '', type: '', name: '', quantity: '', weight: '', price: '', specialFeatures: [] });
        setRequest('');
        setTermsAccepted(false);

    };

    const handleResetForm = () => {
        setSender({ name: '', address: '', phone: '' });
        setRecipient({ name: '', address: '', phone: '' });
        setPackageDetails({ code: '', type: '', name: '', quantity: '', weight: '', price: '', specialFeatures: [] });
        setRequest('');
        setTermsAccepted(false);
    };

    const validatePhoneNumber = (phoneNumber) => {
        // Use a regular expression to validate the phone number format
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };
    


    return (
        <div className="record-transaction-container">

            <h2>Ghi Nhận Đơn Hàng</h2>
            <div className="row-content">
                <div className='information'>

                    <form className='form-transaction'>

                        <div className="mb-3">
                            <h3>Thông Tin Người Gửi</h3>
                            <label><FontAwesomeIcon icon={faUser} /> Tên:</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={sender.name}
                                onChange={(e) => setSender({ ...sender, name: e.target.value })}
                            />
                            {/* <div className="invalid-feedback">{senderErrors.name}</div> */}

                            <label><FontAwesomeIcon icon={faMapMarker} /> Địa Chỉ:</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={sender.address}
                                onChange={(e) => setSender({ ...sender, address: e.target.value })}
                            />
                            {/* <div className="invalid-feedback">{senderErrors.address}</div> */}
                            <label><FontAwesomeIcon icon={faPhone} /> Số Điện Thoại:</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={sender.phone}
                                onChange={(e) => setSender({ ...sender, phone: e.target.value })}
                            />
                            {/* <div className="invalid-feedback">{senderErrors.phone}</div> */}
                        </div>
                    </form>

                    <form className='form-transaction'>

                        <div className="mb-3">
                            <h3>Thông Tin Người Nhận</h3>
                            <label><FontAwesomeIcon icon={faUser} /> Tên:</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={recipient.name}
                                onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
                            />
                            {/* <div className="invalid-feedback">{recipientErrors.name}</div> */}
                            <label><FontAwesomeIcon icon={faMapMarker} /> Địa Chỉ:</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={recipient.address}
                                onChange={(e) => setRecipient({ ...recipient, address: e.target.value })}
                            />
                            {/* <div className="invalid-feedback">{recipientErrors.address}</div> */}
                            <label><FontAwesomeIcon icon={faPhone} /> Số Điện Thoại:</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={recipient.phone}
                                onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                            />
                            {/* <div className="invalid-feedback">{recipientErrors.phone}</div> */}
                        </div>
                    </form>
                </div>

                <div className='product'>

                    <form className='form-transaction'>

                        <div className="mb-3">
                            <h3>Thông Tin Hàng Hoá</h3>
                            <label><FontAwesomeIcon icon={faClipboard} /> Mã đơn hàng:</label>
                            <input
                                type='text'
                                required
                                className="form-control"
                                value={packageDetails.code}
                                onChange={(e) => setPackageDetails({ ...packageDetails, code: e.target.value })}
                            />
                            {/* <div className="invalid-feedback">{packageDetailsErrors.code}</div> */}
                            <label><FontAwesomeIcon icon={faList} /> Loại hàng hoá</label>
                            <div className='product-type'>
                                <label>
                                    <input
                                        type='radio'
                                        value='Bưu kiện'
                                        className='parcel'
                                        checked={packageDetails.type === 'Bưu kiện'}
                                        onChange={(e) => setPackageDetails({ ...packageDetails, type: e.target.value })}
                                    />
                                    Bưu kiện
                                </label>
                                <label>
                                    <input
                                        type='radio'
                                        value='Tài liệu'
                                        className='document'
                                        checked={packageDetails.type === 'Tài liệu'}
                                        onChange={(e) => setPackageDetails({ ...packageDetails, type: e.target.value })}
                                    />
                                    Tài liệu
                                </label>
                            </div>


                            <label><FontAwesomeIcon icon={faBox} /> Tên hàng:</label>
                            <input
                                type='text'
                                required
                                className="form-control"
                                value={packageDetails.name}
                                onChange={(e) => setPackageDetails({ ...packageDetails, name: e.target.value })}
                            />
                            {/* <div className="invalid-feedback">{packageDetailsErrors.name}</div> */}
                            <div className='product-info'>
                                <input
                                    type='text'
                                    required
                                    placeholder='Số lượng'
                                    className="form-control"
                                    value={packageDetails.quantity}
                                    onChange={(e) => setPackageDetails({ ...packageDetails, quantity: e.target.value })}
                                />
                                {/* <div className="invalid-feedback">{packageDetailsErrors.quantity}</div> */}
                                <input
                                    type='text'
                                    required
                                    placeholder='Khối lượng'
                                    className="form-control"
                                    value={packageDetails.weight}
                                    onChange={(e) => setPackageDetails({ ...packageDetails, weight: e.target.value })}
                                />
                                {/* <div className="invalid-feedback">{packageDetailsErrors.weight}</div> */}
                                <input
                                    type='text'
                                    required
                                    placeholder='Giá trị'
                                    className="form-control"
                                    value={packageDetails.price}
                                    onChange={(e) => setPackageDetails({ ...packageDetails, price: e.target.value })}
                                />
                                {/* <div className="invalid-feedback">{packageDetailsErrors.price}</div> */}
                            </div>

                            <label><FontAwesomeIcon icon={faList} /> Đặc tính đặc biệt:</label>
                            <div className='product-special-features'>
                                <label>
                                    <input
                                        type='checkbox'
                                        value='HighValue'
                                        checked={packageDetails.specialFeatures.includes('HighValue')}
                                        onChange={(e) => {
                                            const updatedFeatures = e.target.checked
                                                ? [...packageDetails.specialFeatures, 'HighValue']
                                                : packageDetails.specialFeatures.filter((feature) => feature !== 'HighValue');
                                            setPackageDetails({ ...packageDetails, specialFeatures: updatedFeatures });
                                        }}
                                    />
                                    Giá trị cao
                                </label>
                                <label>
                                    <input
                                        type='checkbox'
                                        value='Fragile'
                                        checked={packageDetails.specialFeatures.includes('Fragile')}
                                        onChange={(e) => {
                                            const updatedFeatures = e.target.checked
                                                ? [...packageDetails.specialFeatures, 'Fragile']
                                                : packageDetails.specialFeatures.filter((feature) => feature !== 'Fragile');
                                            setPackageDetails({ ...packageDetails, specialFeatures: updatedFeatures });
                                        }}
                                    />
                                    Dễ vỡ
                                </label>
                                <label>
                                    <input
                                        type='checkbox'
                                        value='Monolithic'
                                        checked={packageDetails.specialFeatures.includes('Monolithic')}
                                        onChange={(e) => {
                                            const updatedFeatures = e.target.checked
                                                ? [...packageDetails.specialFeatures, 'Monolithic']
                                                : packageDetails.specialFeatures.filter((feature) => feature !== 'Monolithic');
                                            setPackageDetails({ ...packageDetails, specialFeatures: updatedFeatures });
                                        }}
                                    />
                                    Nguyên khối
                                </label>
                                <label>
                                    <input
                                        type='checkbox'
                                        value='Oversized'
                                        checked={packageDetails.specialFeatures.includes('Oversized')}
                                        onChange={(e) => {
                                            const updatedFeatures = e.target.checked
                                                ? [...packageDetails.specialFeatures, 'Oversized']
                                                : packageDetails.specialFeatures.filter((feature) => feature !== 'Oversized');
                                            setPackageDetails({ ...packageDetails, specialFeatures: updatedFeatures });
                                        }}
                                    />
                                    Quá khổ
                                </label>
                                <label>
                                    <input
                                        type='checkbox'
                                        value='Liquid'
                                        checked={packageDetails.specialFeatures.includes('Liquid')}
                                        onChange={(e) => {
                                            const updatedFeatures = e.target.checked
                                                ? [...packageDetails.specialFeatures, 'Liquid']
                                                : packageDetails.specialFeatures.filter((feature) => feature !== 'Liquid');
                                            setPackageDetails({ ...packageDetails, specialFeatures: updatedFeatures });
                                        }}
                                    />
                                    Chất lỏng
                                </label>
                                <label>
                                    <input
                                        type='checkbox'
                                        value='Magnetic/battery'
                                        checked={packageDetails.specialFeatures.includes('Magnetic/battery')}
                                        onChange={(e) => {
                                            const updatedFeatures = e.target.checked
                                                ? [...packageDetails.specialFeatures, 'Magnetic/battery']
                                                : packageDetails.specialFeatures.filter((feature) => feature !== 'Magnetic/battery');
                                            setPackageDetails({ ...packageDetails, specialFeatures: updatedFeatures });
                                        }}
                                    />
                                    Từ tính, pin
                                </label>
                                <label>
                                    <input
                                        type='checkbox'
                                        value='Frozen'
                                        checked={packageDetails.specialFeatures.includes('Frozen')}
                                        onChange={(e) => {
                                            const updatedFeatures = e.target.checked
                                                ? [...packageDetails.specialFeatures, 'Frozen']
                                                : packageDetails.specialFeatures.filter((feature) => feature !== 'Frozen');
                                            setPackageDetails({ ...packageDetails, specialFeatures: updatedFeatures });
                                        }}
                                    />
                                    Đồ lạnh
                                </label>
                            </div>

                        </div>
                    </form>

                    <form className='form-transaction'>

                        <div className="mb-3">
                            <label><FontAwesomeIcon icon={faComment} /> Yêu Cầu Khi Giao:</label>
                            <textarea
                                className="form-control"
                                value={request}
                                onChange={(e) => setRequest(e.target.value)}
                            />
                        </div>
                    </form>
                </div>


            </div>

            <div className="checkbox-container">
                <input
                    type="checkbox"
                    id="termsCheckbox"
                    checked={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                />
                <label htmlFor="termsCheckbox">Tôi đồng ý với các</label><a href="https://s.net.vn/RJ9P" rel="noopener noreferrer" target="_blank">Điều khoản quy định</a>
            </div>
            <div className="d-grid">
                <button type="button" className="btn btn-primary" onClick={handleRecordTransaction}>
                    Ghi Nhận
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleResetForm}>
                    Làm Mới
                </button>
            </div>
        </div>

    );
};

export default RecordTransaction;
