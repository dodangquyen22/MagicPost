import React from 'react';
import Chart from 'react-apexcharts';
import Navbar from '../bar/Navbar';
import { Outlet, Link } from "react-router-dom";
import './styles.css'
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import SimpleMap from '../bar/map';

export const Dashboard = () => {
    // Dữ liệu mẫu
    const data = {
        totalTransactions: 1500,
        totalCenters: 50,
        totalDeliveryPoints: 100,
        revenueThisMonth: 1000000000,
        // const formattedAmount = parseFloat(e.target.value.replace(/\D/g, '')).toLocaleString('vi-VN');
        revenueLastMonth: 900000000,
        growth: 10,
        chartData: {
            options: {
                labels: ['Hàng Gửi', 'Hàng Nhận'],
                colors: ['#008FFB', '#00E396'],
                // chart: {
                //     width: 250,
                //     type: 'donut',
                // },
            },
            series: [700, 800],
        },
        lineChartData: {
            options: {
                xaxis: {
                    categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
                },
            },
            series: [
                {
                    name: 'Doanh Thu',
                    data: [500, 800, 700, 900, 1000],
                },
            ],
        },
        deliveryPoints: [
            { id: 1, name: 'Điểm Giao Dịch 1', lat: 10.776889, lng: 106.700867 },
            { id: 2, name: 'Điểm Giao Dịch 2', lat: 10.776949, lng: 106.693993 },
            // Thêm các điểm giao dịch khác tùy ý
        ],
    };

    return (
        <div className="dashboard-container">

            <Navbar />

            <div className="content-container">
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/employee">Quản Lý Nhân Viên</Link>
                        </li>
                        <li><Link to="/">Log Out</Link></li>
                        {/* <li onClick={() => handleMenuClick('login')}>Đăng Xuất</li> */}
                        {/* Thêm các mục menu khác tùy ý */}
                    </ul>
                </div>

                <div className="content">
                    <h1>Hệ Thống Chuyển Phát</h1>

                    <div className="dashboard-summary">
                        <div className="overview">
                            <h2>Tổng Quan</h2>
                            <p>Số Lượng Đơn Hàng: {data.totalTransactions}</p>
                            <p>Số Lượng Điểm Giao Dịch: {data.totalDeliveryPoints}</p>
                            <p>Số Lượng Điểm Tập Kết: {data.totalCenters}</p>
                        </div>
                        <div className="income">
                            <h2>Doanh Thu</h2>
                            <p>Doanh Thu Tháng Này: {data.revenueThisMonth} VNĐ</p>
                            <p>Doanh Thu Tháng Trước: {data.revenueLastMonth} VNĐ</p>
                            <p>Tăng Trưởng: {data.growth} %</p>
                        </div>
                    </div>

                    <div className="charts-container">
                        <div className="chart-container">
                            <h3>Số lượng hàng</h3>
                            <Chart
                                options={data.chartData.options}
                                series={data.chartData.series}
                                type="donut" />

                        </div>

                        <div className="line-chart-container">
                            <h3>Doanh Thu</h3>
                            <Chart
                                options={data.lineChartData.options}
                                series={data.lineChartData.series}
                                type="line"
                                height={350} />
                        </div>
                    </div>
                    <div className="map-container-wrapper">
                        <h3>Bản Đồ Điểm Giao Dịch</h3>
                        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1uf1wNufrV1rqpJX-VyUMqWjwqKOivNs&ehbc=2E312F&noprof=1" width="100%" height={480}></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
