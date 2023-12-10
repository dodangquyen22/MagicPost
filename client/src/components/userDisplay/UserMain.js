import React, { useState } from "react";
import Navbar from "../bar/Navbar";
import { Link } from "react-router-dom";
import TrackShipment from "./TrackShipment";
import "./styles/usermain.css";
import SearchPostOffice from "./SearchPostOffice";
import Slider from "./Slider";

const UserMain = () => {
    const [selectedTab, setSelectedTab] = useState("track"); // Tab mặc định

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className="user-container">
            <Navbar />
            <div className="content-container">
                
                {/* <div className="sidebar">
                    <ul>
                        <li>
                            <Link to="/user">Trang tra cứu</Link>
                        </li>
                        <li>
                            Đơn Hàng
                        </li>
                        <li>
                            <Link to="/">Log Out</Link>
                        </li>
                    </ul>
                </div> */}
                <div className="user-content">
                    {/* <Slider /> */}
                    <h1>Trang khách hàng</h1>
                    <div className="tabs">
                        <button
                            className={selectedTab === "track" ? "active" : ""}
                            onClick={() => handleTabChange("track")}
                        >
                            Tra Cứu Đơn Hàng
                        </button>
                        <button
                            className={selectedTab === "expense" ? "active" : ""}
                            onClick={() => handleTabChange("expense")}
                        >
                            Đơn hàng của bạn
                        </button>
                        <button
                            className={selectedTab === "localPost" ? "active" : ""}
                            onClick={() => handleTabChange("localPost")}
                        >
                            Tra cứu bưu cục
                        </button>
                        {/* Thêm các tab khác tùy theo chức năng */}
                    </div>

                    <div className="tab-content">
                        {selectedTab === "track" && (
                            <div>
                                <TrackShipment />
                            </div>
                        )}
                        {selectedTab === "expense" && (
                            <div>

                            </div>
                        )}
                        {selectedTab === "localPost" && (
                            <div>
                                <SearchPostOffice />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMain;