import React, { useState } from 'react';
import { FaShoppingCart, FaUserCircle, FaSun, FaMoon, FaTimes, FaEnvelope, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = ({ onSearch, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [user] = useState({
    name: 'Ram Mohan',
    email: 'rammohan@example.com',
    phone: '123-456-7890',
    address: '1234 Elm St, Springfield, IL',
    orders: 4,
    wishlist: [
      { item: 'Wireless Headphones', price: '$79.99' },
      { item: 'Smart Watch', price: '$199.99' },
     
    ],
    paymentMethod: 'Visa **** **** **** 1234',
    shippingAddress: '1234 Elm St, Springfield, IL',
  });

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header>
      <div className="header-left">
        <h1 className="cartoon-logo">Shopping Safari</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchTerm && (
          <button style={clearButtonStyle} onClick={handleClearSearch}>
            <FaTimes size={16} />
          </button>
        )}
      </div>
      <div className="header-right">
       {/* <button onClick={toggleTheme} style={iconStyle}>
          {document.body.classList.contains('dark-theme') ? <FaSun /> : <FaMoon />}
        </button>*/}
        <Link to="/cart" style={iconStyle}>
          <FaShoppingCart size={24} />
        </Link>
        <div 
          style={{ position: 'relative',backgroundColor:"transparent" }} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <button onClick={toggleDropdown} style={iconStyle}>
            <FaUserCircle size={24} />
          </button>
          {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="profile-details">
            <h4>{user.name}</h4>
            <p><FaEnvelope /> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <h5><strong>Orders:</strong> {user.orders}</h5>
            
            <h5><strong>Wishlist:</strong></h5>
            <ul>
              {user.wishlist.map((wish, index) => (
                <li key={index}>{wish.item} - {wish.price}</li>
              ))}
            </ul>
            <h5>Account Settings:</h5>
            <p>Payment Method: {user.paymentMethod}</p>
            <p>Shipping Address: {user.shippingAddress}</p>
          </div>
        </div>
      )}
          {/*isDropdownOpen && (
  <div className="dropdown-menu">
    <div className="profile-details">
      <h4>John Doe</h4>
      <p><FaEnvelope /> johndoe@example.com</p>
      <h5>Order History:</h5>
      <ul>
        <li>Order #1001 - Oct 10, 2023 - Total: $150.00</li>
        <li>Order #1002 - Sep 15, 2023 - Total: $89.99</li>
        
      </ul>
      <h5>Wishlist:</h5>
      <ul>
        <li>Wireless Headphones - $79.99</li>
        <li>Smart Watch - $199.99</li>
        <li>Leather Jacket - $120.00</li>
      </ul>
      <h5>Account Settings:</h5>
      <p>Payment Method: Visa **** **** **** 1234</p>
      <p>Shipping Address: 1234 Elm St, Springfield, IL</p>
    </div>
  </div>
)*/}


        </div>
      </div>
    </header>
  );
};

const iconStyle = {
  color: 'white',
  marginLeft: '15px',
  textDecoration: 'none',
  background:"transparent",
  border:"none",
 
};

const clearButtonStyle = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  color: 'white',
  cursor: 'pointer',
};

export default Header;
