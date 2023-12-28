import React, { useState } from "react";
import Navbar from "../bar/Navbar";
import { Link } from "react-router-dom";
import TrackShipment from "./TrackShipment";
import "./styles/usermain.css";

const UserMain = () => {
    const [selectedTab, setSelectedTab] = useState("track"); // Tab mặc định

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <div className="user-container">
            <Navbar />
            <div className="content-container">
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
                    </div>

                    <div className="tab-content">
                        {selectedTab === "track" && (
                            <div>
                                <TrackShipment />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserMain;