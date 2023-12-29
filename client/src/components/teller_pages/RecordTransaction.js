import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMapMarker, faPhone, faClipboard, faBox, faFileAlt, faList, faWeight, faDollarSign, faComment, faTag, faMoneyBill, faMoneyCheck, faTimes, faCalendarTimes, faTruck, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import './styles/recordtransaction.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import Modal from 'react-modal';
import ReactToPrint from 'react-to-print';
import QRCode from 'qrcode.react';



const RecordTransaction = () => {
    const [sender, setSender] = useState({ name: '', province: '', district: '', address: '', phone: '' });
    const [recipient, setRecipient] = useState({ name: '', province: '', district: '', address: '', phone: '' });
    const [packageDetails, setPackageDetails] = useState({
        code: '',
        type: 'Bưu kiện',
        name: '',
        quantity: '',
        weight: '',
        price: '',
        length: '',
        width: '',
        height: '',
        specialFeatures: [],
    });

    const [provinces, setProvinces] = useState([]);
    const [senderDistricts, setSenderDistricts] = useState([]);
    const [recipientDistricts, setRecipientDistricts] = useState([]);

    const [request, setRequest] = useState('');

    const [collectionFee, setCollectionFee] = useState({ cod: false, amount: '' });

    const [payer, setPayer] = useState('sender'); // 'sender' or 'recipient'

    const [requestPickup, setRequestPickup] = useState({ address: 'Đến lấy hàng tại nhà' });

    const [transportation, setTransportation] = useState({ type: 'save' });

    const [termsAccepted, setTermsAccepted] = useState(false);

    const componentRef = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    let convertWeight = packageDetails.weight / 1000;
    let mainFee = 0;
    let extraFee = 0;


    switch (convertWeight) {
        case (convertWeight < 0.5):
            mainFee = 20000;
            break;
        case (convertWeight < 1):
            mainFee = 25000;
            break;
        default:
            mainFee = 25000 + (convertWeight - 1) * 5000;
            break;
    }
    let GTGT = mainFee * 0.05;
    let totalFare = mainFee + extraFee + GTGT;
    let totalFee = totalFare;

    useEffect(() => {
        // Fetch provinces
        axios.get('http://localhost:3000/province')
            .then(response => setProvinces(response.data))
            .catch(error => console.error('Error fetching provinces:', error));
    }, []);

    const handleSenderProvinceChange = async (e) => {
        const selectedProvince = e.target.value;

        // Fetch districts based on selected province for sender
        try {
            const response = await axios.get(`http://localhost:3000/district?province=${selectedProvince}`);
            setSenderDistricts(response.data);
        } catch (error) {
            console.error('Error fetching sender districts:', error);
        }

        setSender({ ...sender, province: selectedProvince });
    };

    const handleRecipientProvinceChange = async (e) => {
        const selectedProvince = e.target.value;

        // Fetch districts based on selected province for recipient
        try {
            const response = await axios.get(`http://localhost:3000/district?province=${selectedProvince}`);
            setRecipientDistricts(response.data);
        } catch (error) {
            console.error('Error fetching recipient districts:', error);
        }

        setRecipient({ ...recipient, province: selectedProvince });
    };

    const handleSenderDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        setSender({ ...sender, district: selectedDistrict });
    };

    const handleRecipientDistrictChange = (e) => {
        const selectedDistrict = e.target.value;
        setRecipient({ ...recipient, district: selectedDistrict });
    };

    const handlePrint = () => {
        window.print();
    };


    const handleRecordTransaction = () => {


        if (!termsAccepted) {
            toast('Vui lòng chấp nhận điều khoản trước khi ghi nhận đơn hàng.');
            return;
        }

        if (sender.name === '' || sender.province === '' || sender.district === '' || sender.address === '' || sender.phone === '') {
            toast('Vui lòng nhập đầy đủ thông tin người gửi.');
            return;
        }


        if (recipient.name === '' || recipient.province === '' || recipient.district === '' || recipient.address === '' || recipient.phone === '') {
            toast('Vui lòng nhập đầy đủ thông tin người nhận.');
            return;
        }

        if (packageDetails.code === '' || packageDetails.name === '' || packageDetails.quantity === '' || packageDetails.weight === '' || packageDetails.price === '' || packageDetails.length === '' || packageDetails.width === '' || packageDetails.height === '') {
            toast('Vui lòng nhập đầy đủ thông tin hàng hoá.');
            return;
        }


        if (!validatePhoneNumber(sender.phone) || !validatePhoneNumber(recipient.phone)) {
            toast('Vui lòng nhập đúng định dạng số điện thoại.');
            return;
        }



        // Xử lý ghi nhận đơn hàng, có thể gửi dữ liệu lên server tại đây
        // console.log('Đã ghi nhận đơn hàng:', {
        //     sender,
        //     recipient,
        //     packageDetails,
        //     request,
        //     collectionFee,
        //     payer,
        //     requestPickup,
        // });
        const data = {
            sender,
            recipient,
            packageDetails,
            request,
            collectionFee,
            payer,
            requestPickup,
        };
        console.log('data: ', data);
    
        fetch('http://localhost:3000/transactionPoint/package/create?pointID=' + localStorage.getItem('pointID'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                // Process the response as needed
                console.log('Recorded transaction:', responseData);
                toast('Đã ghi nhận đơn hàng.');
                openModal();
                // Reset the form after recording
                // ... Reset form code ...
            })
            .catch((error) => {
                console.error(error);
                toast('Có lỗi xảy ra khi ghi nhận đơn hàng.');
            });
        // Thực hiện các bước cần thiết để ghi nhận đơn hàng

        // Reset form sau khi ghi nhận
        // setSender({ name: '', province: '', district: '', address: '', phone: '' });
        // setRecipient({ name: '', province: '', district: '', address: '', phone: '' });
        // setPackageDetails({
        //     code: '',
        //     type: 'Bưu kiện',
        //     name: '',
        //     quantity: '',
        //     weight: '',
        //     price: '',
        //     length: '',
        //     width: '',
        //     height: '',
        //     specialFeatures: [],
        // });
        // setRequest('');
        // setTermsAccepted(false);
        // setCollectionFee({ cod: false, amount: '' })
        // setPayer('sender');
        // setRequestPickup({ address: 'Đến lấy hàng tại nhà' });

    };

    const handleResetForm = () => {
        setSender({ name: '', province: '', district: '', address: '', phone: '' });
        setRecipient({ name: '', province: '', district: '', address: '', phone: '' });
        setPackageDetails({
            code: '',
            type: 'Bưu kiện',
            name: '',
            quantity: '',
            weight: '',
            price: '',
            length: '',
            width: '',
            height: '',
            specialFeatures: [],
        });
        setRequest('');
        setTermsAccepted(false);
        setCollectionFee({ cod: false, amount: '' })
        setPayer('sender');
        setRequestPickup({ address: 'Đến lấy hàng tại nhà' });
    };

    const validatePhoneNumber = (phoneNumber) => {
        // Use a regular expression to validate the phone number format
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };



    return (

        <div className='container'>

            <div className="record-transaction-container" >

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
                                <select
                                    className="form-control"
                                    value={sender.province}
                                    onChange={handleSenderProvinceChange}
                                >
                                    <option value="Chọn Tỉnh/Thành Phố">Chọn Tỉnh/Thành Phố</option>
                                    {provinces.map(item => (
                                        <option key={item._id} value={item.province}>{item.province}</option>
                                    ))}
                                </select>
                                <select
                                    className="form-control"
                                    value={sender.district}
                                    onChange={handleSenderDistrictChange}
                                >
                                    <option value="Chọn Quận/Huyện">Chọn Quận/Huyện</option>
                                    {senderDistricts.map(item => (
                                        <option key={item._id} value={item.district}>{item.district}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder='Số nhà, tên đường, phường/xã'
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
                                <select
                                    className="form-control"
                                    value={recipient.province}
                                    onChange={handleRecipientProvinceChange}
                                >
                                    <option value="Chọn Tỉnh/Thành Phố">Chọn Tỉnh/Thành Phố</option>
                                    {provinces.map(item => (
                                        <option key={item._id} value={item.province}>{item.province}</option>
                                    ))}
                                </select>
                                <select
                                    className="form-control"
                                    value={recipient.district}
                                    onChange={handleRecipientDistrictChange}
                                >
                                    <option value="Chọn Quận/Huyện">Chọn Quận/Huyện</option>
                                    {recipientDistricts.map(item => (
                                        <option key={item._id} value={item.district}>{item.district}</option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder='Số nhà, tên đường, phường/xã'
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
                                        placeholder='Khối lượng (gr)'
                                        className="form-control"
                                        value={packageDetails.weight}
                                        onChange={(e) => setPackageDetails({ ...packageDetails, weight: e.target.value })}
                                    />
                                    {/* <div className="invalid-feedback">{packageDetailsErrors.weight}</div> */}
                                    <input
                                        type='text'
                                        required
                                        placeholder='Giá trị (VND)'
                                        className="form-control"
                                        value={packageDetails.price}
                                        onChange={(e) => {
                                            const formattedAmount = parseFloat(e.target.value.replace(/\D/g, '')).toLocaleString('vi-VN');
                                            setPackageDetails({ ...packageDetails, price: formattedAmount })
                                        }}
                                    />
                                    {/* <div className="invalid-feedback">{packageDetailsErrors.price}</div> */}
                                </div>

                                <label><FontAwesomeIcon icon={faTag} /> Kích thước</label>
                                <div className='product-info'>
                                    <input
                                        type='text'
                                        required
                                        placeholder='Dài (cm)'
                                        className="form-control"
                                        value={packageDetails.length}
                                        onChange={(e) => setPackageDetails({ ...packageDetails, length: e.target.value })}
                                    />
                                    {/* <div className="invalid-feedback">{packageDetailsErrors.quantity}</div> */}
                                    <input
                                        type='text'
                                        required
                                        placeholder='Rộng (cm)'
                                        className="form-control"
                                        value={packageDetails.width}
                                        onChange={(e) => setPackageDetails({ ...packageDetails, width: e.target.value })}
                                    />
                                    {/* <div className="invalid-feedback">{packageDetailsErrors.weight}</div> */}
                                    <input
                                        type='text'
                                        required
                                        placeholder='Cao (cm)'
                                        className="form-control"
                                        value={packageDetails.height}
                                        onChange={(e) => setPackageDetails({ ...packageDetails, height: e.target.value })}
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

                    </div>
                    <div className='transaction-info'>
                        <form className='form-transaction'>
                            <div className='box1'>

                                <label><FontAwesomeIcon icon={faDollarSign} /> Tiền thu hộ</label>
                                <div className='cod'>
                                    <label>
                                        <input
                                            type='checkbox'
                                            checked={collectionFee.cod}
                                            onChange={() => setCollectionFee({ ...collectionFee, cod: !collectionFee.cod })}
                                        />
                                        Thu hộ bằng tiền hàng
                                    </label>
                                    {collectionFee.cod && (
                                        <input
                                            type='text'
                                            placeholder='Số tiền thu hộ (VND)'
                                            className="form-control"
                                            value={collectionFee.amount}
                                            onChange={(e) => {
                                                const formattedAmount = parseFloat(e.target.value.replace(/\D/g, '')).toLocaleString('vi-VN');
                                                setCollectionFee({ ...collectionFee, amount: formattedAmount });
                                            }}
                                        />
                                    )}

                                </div>
                                <br />

                                <label><FontAwesomeIcon icon={faMoneyBill} /> Người trả cước</label>
                                <div className='payer'>
                                    <label>
                                        <input
                                            type='radio'
                                            value='sender'
                                            className='sender'
                                            checked={payer === 'sender'}
                                            onChange={() => setPayer('sender')}
                                        />
                                        Người gửi
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            value='recipient'
                                            className='recipient'
                                            checked={payer === 'recipient'}
                                            onChange={() => setPayer('recipient')}
                                        />
                                        Người nhận
                                    </label>
                                </div>

                                <label><FontAwesomeIcon icon={faFileAlt} /> Yêu cầu lấy hàng</label>
                                <div className='request-pickup'>
                                    <label>
                                        <input
                                            type='radio'

                                            value='Đến lấy hàng tại nhà'
                                            className='atHome'
                                            checked={requestPickup.address === 'Đến lấy hàng tại nhà'}
                                            onChange={(e) => setRequestPickup({ ...requestPickup, address: e.target.value })}
                                        />
                                        Đến lấy hàng tại nhà
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            value='Gửi tại bưu cục'
                                            className='atPostOffice'
                                            checked={requestPickup.address === 'Gửi tại bưu cục'}
                                            onChange={(e) => setRequestPickup({ ...requestPickup, address: e.target.value })}
                                        />
                                        Gửi tại bưu cục
                                    </label>
                                </div>

                                <label><FontAwesomeIcon icon={faTruckFast} /> Hình thức giao hàng</label>
                                <div className='transportation'>
                                    <label>
                                        <input
                                            type='radio'
                                            value='save'
                                            className='save'
                                            checked={transportation.type === 'save'}
                                            onChange={(e) => setTransportation({ ...transportation, type: e.target.value })}
                                        />
                                        Tiết kiệm
                                    </label>
                                    <label>
                                        <input
                                            type='radio'
                                            value='fast'
                                            className='fast'
                                            checked={transportation.type === 'fast'}
                                            onChange={(e) => setTransportation({ ...transportation, type: e.target.value })}
                                        />
                                        Nhanh
                                    </label>
                                </div>
                            </div>


                            <div className="mb-3 box2">
                                <label><FontAwesomeIcon icon={faCalendarTimes} /> Thời gian phát hành mong muốn</label>
                                <div>
                                    <select className="form-control" defaultValue="Cả ngày">
                                        <option value="Cả ngày">Cả ngày</option>
                                        <option value="1">Sáng (7h30 - 12h00)</option>
                                        <option value="2">Chiều (13h30 - 18h00)</option>
                                        <option value="3">Tối (18h30 - 21h00)</option>
                                        <option value="4">Giờ hành chính (7h30 - 11h30, 13h30 - 17h30)</option>
                                        <option value="5">Chủ nhật</option>
                                        <option value="6">Ngày nghỉ lễ</option>
                                    </select>
                                </div>


                                <label><FontAwesomeIcon icon={faComment} /> Ghi chú:</label>
                                <div>
                                    <textarea
                                        className="form-control"
                                        value={request}
                                        onChange={(e) => setRequest(e.target.value)}
                                    />
                                </div>

                            </div>
                        </form>
                    </div>


                </div>


            </div>

            {!isModalOpen && (

            <div className='footer'>
                <div className='footer1'>
                    <label>Tổng cước</label>
                </div>
                <div className='footer2'>
                    <label>Tiền thu hộ</label>
                    <br />
                    <div>{collectionFee.amount === '' ? 0 : collectionFee.amount}&nbsp;₫</div>
                </div>
                <div className='footer3'>
                    <label>Thời gian giao dự kiến</label>
                    <br />
                    <div>{packageDetails.type === 'Tài liệu' ? 1 : 2} ngày</div>
                </div>
                <div className='footer4'>
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
                        <button type="button" className="btn btn-primary" onClick={() => { handleRecordTransaction() }}>
                            Ghi Nhận
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={handleResetForm}>
                            Làm Mới
                        </button>
                        {/* <PrintButton componentRef={componentRef} /> */}
                    </div>


                </div>


            </div>
            )}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="react-modal-print"
                overlayClassName="react-modal-overlay modal-overlay" >
                <div className='print-container' ref={componentRef}>
                    <div className='print-content'>
                        <div className='logo-QR'>
                            <img src="./images/logo.png" className='logo' alt="logo" />
                            <div className='QRcode'>
                                <div className='QR'>
                                    <QRCode
                                        id='qrcode'
                                        value= {packageDetails.code}
                                        size={100}
                                        level={'H'}
                                        includeMargin={true}
                                    />
                                </div>
                                <div className='ID'>Mã đơn hàng: {packageDetails.code}</div>
                            </div>
                        </div>

                        <table>
                            <tbody>
                                <tr>
                                    <td className='print'>
                                        <p>1. Họ tên địa chỉ người gửi: {sender.name}</p>
                                        {sender.address} - {sender.district} - {sender.province}
                                        <p>Điện thoại: {sender.phone}</p>
                                        <p>Mã khách hàng:</p>
                                        <p>Mã bưu chính:</p>
                                    </td>
                                    <td colSpan="2" className='print'>
                                        <p>2. Họ tên địa chỉ người nhận: {recipient.name}</p>
                                        {recipient.address} - {recipient.district} - {recipient.province}
                                        <p>Điện thoại: {recipient.phone}</p>
                                        <p>Mã khách hàng</p>
                                        <p>Mã bưu chính:</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='print'>
                                        <p>3. Loại hàng gửi: {packageDetails.type}</p>
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
                                                    <td>{packageDetails.quantity}</td>
                                                    <td>{packageDetails.price}</td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td className='print'>
                                        <p>9. Cước</p>
                                        <p>a. Cước chính: {mainFee}&nbsp;₫</p>
                                        <p>b. Phụ phí: {extraFee}&nbsp;₫</p>
                                        <p>c. Cước GTGT: {GTGT}&nbsp;₫</p>
                                        <p>d. Tổng cước (gồm VAT): {totalFare}&nbsp;₫</p>
                                        <p>e. Thu khác: </p>
                                        <p><strong>f. Tổng thu: {totalFee}&nbsp;₫</strong></p>
                                    </td>
                                    <td className='print'>
                                        <p>10. Khối lượng (kg):</p>
                                        <p><strong>Khối lượng thực tế: {packageDetails.weight} &nbsp;gram</strong></p>
                                        <p><strong>Khối lượng quy đổi: {convertWeight}</strong></p>
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
                                        <p>COD: {collectionFee.amount}&nbsp;₫</p>
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
                                        <p>8. Ngày giờ gửi: {new Date().toLocaleString() + ""}</p>
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

                </div>
                <div className='modal-button'>

                    <ReactToPrint trigger={() => <button className="print-button" onClick={closeModal}>Xác Nhận In</button>} content={() => componentRef.current} />
                    <button className="cancel-button" onClick={closeModal}>Huỷ</button>
                </div>
            </Modal>
        </div>


    );
};

export default RecordTransaction;
