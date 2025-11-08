import { Link, Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { ProductProvider } from './context/ProductContext'
import { useProducts } from './context/useProducts'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import CartPage from './pages/CartPage'

function CartLink() {
  const { cartCount } = useProducts();
  return (
    <Link to="/cart">Cart{cartCount ? ` (${cartCount})` : ''}</Link>
  );
}

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <nav className="nav">
          <div className="container nav-inner">
            <Link to="/" className="brand">Super cool shop</Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/admin">Admin</Link>
              <CartLink />
            </div>
          </div>
        </nav>
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ProductProvider>
  )
}

export default App
