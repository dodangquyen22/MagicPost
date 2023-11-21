// SearchPostOffice.js
import React, { useState } from 'react';
import MapShipment from './MapShipment';
import './styles/searchpostoffice.css';

const SearchPostOffice = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLocation, setSearchLocation] = useState(null);

  // Giả sử bạn có một danh sách bưu cục
  const postOffices = [
    { id: 1, name: 'Bưu cục A', address: '123 Đường ABC', location: { lat: 21.026837216273547, lng: 105.7790183602429 } },
    { id: 2, name: 'Bưu cục B', address: '456 Đường XYZ', location: { lat: 21.026837216273547, lng: 105.7790183602429 } },
    { id: 3, name: 'Bưu cục C', address: '789 Đường DEF', location: { lat: 21.026837216273547, lng: 105.7790183602429 } },

    // Thêm thông tin bưu cục khác tùy ý
  ];

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    // Thực hiện tìm kiếm dựa trên searchTerm và cập nhật searchResults
    const results = postOffices.filter(
      (office) =>
        office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (office.address && office.address.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSearchResults(results);
    if (results.length > 0) {
      setSearchLocation(results[0].location);
    } else {
      setSearchLocation(null);
    }
  };


  return (
    <div className="container">
      <div className="search-container">
        <div className='search-content'>

          <h2>Tra Cứu Bưu Cục</h2>
          <div className="form-content">
            <form className='form-search' onSubmit={(e) => {
              e.preventDefault(); // Ngăn chặn hành động submit mặc định của form
              handleSearch();
            }}>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên bưu cục..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="d-grid search-submit">
                <button type="button" className="btn btn-primary" onClick={handleSearch} >
                  Tìm Kiếm
                </button>
              </div>
              {searchResults.length > 0 && (

                <div className="search-results">
                  <h3>Kết Quả Tìm Kiếm</h3>
                  {searchResults.length === 0 ? (
                    <p>Không có kết quả.</p>
                  ) : (
                    <ul>
                      {searchResults.map((result) => (
                        <li key={result.id}>
                          <strong>{result.name}</strong>
                          {result.address && <p>{result.address}</p>}
                        </li>
                      ))}

                    </ul>
                  )}
                </div>
              )}
            </form>
            {searchLocation !== null ? (
              <div className="map-container">
                <MapShipment lat={searchLocation.lat} lng={searchLocation.lng} />
              </div>
            ) : <div className="map-container">
            <MapShipment lat={21.028740} lng={105.779297} />
          </div>}

          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPostOffice;
