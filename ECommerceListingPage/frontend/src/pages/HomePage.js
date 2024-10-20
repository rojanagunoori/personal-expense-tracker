import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { sections } from '../data';
import ProductCard from '../components/ProductCard';
import AddToCartModal from '../components/AddToCartModal';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const HomePage = ({ searchTerm, setSearchTerm }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSection, setCurrentSection] = useState([]); // Keep as array
    const [filters, setFilters] = useState({ priceRange: '', categories: [] });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { cartItems, setCartItems } = useCart();
    const itemsPerPage = 6;
  //  const totalPages = 6;
    
    const navigate = useNavigate();

    const handleViewProduct = (productName) => {
        navigate(`/thank-you/${productName}`);
    };

    const handleAddToCart = (product) => {
     setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleConfirmAddToCart = () => {
        const updatedSections = sections.map(section => ({
            ...section,
            products: section.products.map(prod => 
                prod.id === selectedProduct.id ? { ...prod, addToCart: true } : prod
            ),
        }));
        
       
        setCartItems(prev => [...prev, { ...selectedProduct, addToCart: true }]);
      
        console.log(`${selectedProduct.name} added to cart`);
        handleCloseModal();
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;

        if (name === 'priceRange') {
            setFilters({ ...filters, priceRange: value });
        } else {
            const updatedCategories = filters.categories.includes(value)
                ? filters.categories.filter(category => category !== value)
                : [...filters.categories, value];

            setFilters({ ...filters, categories: updatedCategories });
        }
    };

    const filteredProducts = sections
        .filter(section => currentSection.length === 0 || currentSection.includes(section.title))
        .flatMap(section => section.products)
        .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(product => {
            const price = parseFloat(product.price.slice(1));
            if (filters.priceRange === '10-20') return price >= 10 && price <= 20;
            if (filters.priceRange === '20-50') return price > 20 && price <= 50;
            if (filters.priceRange === '50-100') return price > 50 && price <= 100;
            if (filters.priceRange === '100+') return price > 100;
            return true;
        })
        .filter(product => {
            return filters.categories.length === 0 || filters.categories.includes(product.category);
        });
       // const totalPages = 6;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            <button onClick={() => setIsSidebarOpen(true)} className="icon-button  ">
            <FaChevronLeft size={24} />
            </button>
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button onClick={() => setIsSidebarOpen(false)} className="arrow-button right-arrow"> <FaChevronRight size={24} /></button>
                <h3>Categories</h3>
                {["Electronics", "Fashion", "Home & Kitchen", "Books", "Sports & Outdoors"].map(category => (
                    <label key={category}>
                        <input
                            type="checkbox"
                            name="category"
                            value={category}
                            checked={filters.categories.includes(category)}
                            onChange={handleFilterChange}
                        />
                        {category}
                    </label>
                ))}
                <h3>Price Range</h3>
                {["10-20", "20-50", "50-100", "100+"].map(range => (
                    <label key={range}>
                        <input
                            type="radio"
                            name="priceRange"
                            value={range}
                            checked={filters.priceRange === range}
                            onChange={handleFilterChange}
                        />
                        ₹{range.replace('-', ' - ₹')}
                    </label>
                ))}
            </aside>

         
            <div className="products-container">
                <div className="product-list">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onView={handleViewProduct}
                                onAddToCart={handleAddToCart}
                            />
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>

            {isModalOpen && (
                <AddToCartModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmAddToCart}
                />
            )}
        </>
    );
};

export default HomePage;
