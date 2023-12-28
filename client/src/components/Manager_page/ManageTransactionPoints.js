import React, { useEffect, useState } from 'react';
import Navbar from '../bar/Navbar';
import { Link } from 'react-router-dom';
import './managetrans.css';
import Chart from 'react-apexcharts';
import Modal from 'react-modal';
import axios from 'axios';
import Sidebar from '../bar/Sidebar';


const ManageTransactionPoints = () => {

    const [areas, setAreas] = useState([]);
    const [points, setPoints] = useState([]);


    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [token,setToken] = useState('');


    const getData = () => {
        const tokens =  localStorage.getItem('token');
        setToken(tokens)
        //console.log(token);
        axios.get('http://localhost:3000/manager/pointTransaction', {
            headers: {
                Authorization: `Bearer ${tokens}`,
              },
            })
            .then((response) => {
                const points = response.data.points;
                setPoints(points)
            })
            .catch((error) => {
                
            })
    }

    useEffect(() => {
        getData()
    }, [])

    // State to manage transaction point data
    const [transactionPoints, setTransactionPoints] = useState([
        { id: 1, name: 'Điểm T', location: '123 Street, City', status: 'Hoạt động', order: [10, 20, 5], data: [500, 800, 700, 900, 1000] },
        { id: 2, name: 'Điểm U', location: '456 Street, City', status: 'Hoạt động', order: [20, 10, 6], data: [500, 600, 700, 800, 1000] },
        { id: 3, name: 'Điểm A', location: '789 Street, City', status: 'Hoạt động', data: [300, 200, 500, 700, 900] },
        { id: 4, name: 'Điểm N', location: '789 Street, City', status: 'Hoạt động', data: [300, 200, 500, 700, 900] },
        { id: 5, name: 'Điểm N', location: '135 Street, City', status: 'Hoạt động' },
        { id: 6, name: 'Điểm G', location: '357 Street, City', status: 'Hoạt động' },
        { id: 7, name: 'Điểm H', location: '579 Street, City', status: 'Hoạt động' },
        { id: 8, name: 'Điểm E', location: '246 Street, City', status: 'Hoạt động' },
        { id: 9, name: 'Điểm O', location: '468 Street, City', status: 'Hoạt động' },
        { id: 10, name: 'Điểm D', location: '147 Street, City', status: 'Hoạt động' },
        { id: 11, name: 'Điểm Z', location: '258 Street, City', status: 'Hoạt động' },
        { id: 12, name: 'Điểm A', location: '369 Street, City', status: 'Hoạt động' },
        { id: 13, name: 'Điểm I', location: '000 Street, City', status: 'Hoạt động' },

        // Add more transaction points as needed
    ]);

    // useEffect(() => {
    //     const fetchTransactionPoints = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3000/pointTransaction'); // Update the URL with your actual API endpoint
    //             setTransactionPoints(response.data.points);
    //         } catch (error) {
    //             console.error('Error fetching transaction points:', error);
    //         }
    //     };

    //     fetchTransactionPoints();
    // }, []);



    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = transactionPoints.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const [selectedPoint, setSelectedPoint] = useState(null);

    const handlePointClick = (point) => {
        setSelectedPoint(point);
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleAddPoint = async(event) => {
        // const token =  localStorage.getItem('token');
        console.log(token)
        event.preventDefault();
          try {
            console.log(name,gender, city, district, address)
            const response = await axios.post('http://localhost:3000/manager/createTransaction', {
                name,
                gender,
                province: city,
                district,
                address,
              }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            })
            console.log(response.data.message);
            getData()
            closeModal();
          } catch (error) {
            console.log("lỗi")
            console.error(error);
            // Xử lý lỗi (nếu có)
          } 
    };

    const handleEditPoint = () => {
        // Add your logic for editing an existing transaction point
        closeModal();
    };

    const handleDeletePoint = async(pointId) => {
        // Add your logic for deleting an existing transaction point
        const shouldDelete = window.confirm('Bạn có chắc muốn xoá điểm tập kết này?');
        if (shouldDelete) {
            try {
            //   const token = localStorage.getItem('token');
        
              // Make a request to delete the point with the given ID using DELETE method
              console.log(token);
              const response = await axios.delete(`http://localhost:3000/manager/deleteTransaction/${pointId}`,{
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
        
              console.log(response.data.message);
              
              // Assuming getData and closeModal are defined elsewhere in your code
              getData();
              closeModal();
            } catch (error) {
              // Handle error, e.g., show an error message to the user
              console.error('Error deleting point:', error);
            }
          }
    };

    return (
        <div className='container'>
            <Navbar />
            <div className='content-container'>
                <Sidebar />
                <div className="trans-content">
                    <h1>Quản Lý Điểm Giao Dịch</h1>
                    <div className='transpoint'>

                        <div className='list-transpoint'>
                            <button className="btn btn-primary" onClick={openModal}>
                                Thêm Điểm Giao Dịch
                            </button>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel="Thêm Điểm Giao Dịch"
                                className="react-modal-content"
                                overlayClassName="react-modal-overlay"
                            >
                                <h2>Thêm Điểm Giao Dịch</h2>
                                <form onSubmit={handleAddPoint}>

                                    <div className="form-group">
                                    <label htmlFor="name">Họ và Tên</label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                            />

                                            <label htmlFor="gender">Giới Tính</label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="gender"
                                            value={gender}
                                            onChange={(event) => setGender(event.target.value)}
                                            />

                                            <label htmlFor="city">Tỉnh/Thành phố</label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            value={city}
                                            onChange={(event) => setCity(event.target.value)}
                                            />

                                            <label htmlFor="district">Quận/Huyện</label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="district"
                                            value={district}
                                            onChange={(event) => setDistrict(event.target.value)}
                                            />

                                            <label htmlFor="address">Địa chỉ cụ thể</label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            value={address}
                                            onChange={(event) => setAddress(event.target.value)}
                                            />
                                    </div>
                                    <button className="btn btn-primary">Thêm</button>
                                    <button className="btn btn-secondary" onClick={closeModal}>Đóng</button>
                                </form>

                            </Modal>
                            <table className="table table-bordered table-trans">
                                <thead>
                                    <tr>
                                        <th>Địa Chỉ</th>
                                        <th>Quận/Huyện</th>
                                        <th>Tỉnh/Thành Phố</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {points.map(point => (
                                        <tr key={point.point._id}>
                                            <td>{point.point.address}</td>
                                            <td>{point.area.province}</td>
                                            <td>{point.area.district}</td>
                                            <td>
                                                <button onClick={() => handleDeletePoint(point.area.
transactionPointID)} className="btn btn-danger">Xoá</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="pagination">
                                {Array.from({ length: Math.ceil(transactionPoints.length / itemsPerPage) }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={currentPage === index + 1 ? 'active' : ''}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="vertical-line"></div>

                        {selectedPoint && (
                            <div className={`info panel panel-default ${selectedPoint ? 'show' : ''}`}>
                                <div className="panel-heading"><h2>Thông Tin Chi Tiết Điểm Giao Dịch</h2></div>
                                <div className="panel-body">
                                    <p><strong>ID:</strong> {selectedPoint.id}</p>
                                    <p><strong>Tên Điểm:</strong> {selectedPoint.name}</p>
                                    <p><strong>Địa Chỉ:</strong> {selectedPoint.location}</p>
                                    <p><strong>Trạng Thái:</strong> {selectedPoint.status}</p>
                                    {/* Add more details as needed */}
                                    <p><strong>Đơn Hàng</strong></p>
                                    <br />
                                    <Chart
                                        options={{
                                            labels: ['Đơn Hàng Đã Nhận', 'Đơn Hàng Đã Chuyển', 'Đơn Hàng Đã Hủy'],
                                            colors: ['#00FF00', '#FF0000', '#FFA500'],
                                            legend: {
                                                position: 'right',
                                            },
                                        }}
                                        series={selectedPoint.order}
                                        type="donut"
                                        width="500"
                                        height="300"
                                    />
                                    <br />
                                    <p><strong>Doanh Thu:</strong></p>
                                    <br />
                                    <Chart
                                        options={{
                                            xaxis: {
                                                categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
                                            },
                                        }}
                                        series={[
                                            {
                                                name: 'Doanh Thu',
                                                data: selectedPoint.data,
                                            },
                                        ]}
                                        type="line"
                                        width="500"
                                        height="300"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageTransactionPoints;
