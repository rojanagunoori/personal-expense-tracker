import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThankYouPage from './pages/ThankYouPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <div style={{ display: "flex",flexDirection:"column"}}>
        <Header 
          onSearch={setSearchTerm} 
          toggleTheme={() => document.body.classList.toggle('dark-theme')} 
        />
        <Routes>
          <Route path='/thank-you/:productName' element={<ThankYouPage />} />
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/' element={<HomePage searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
