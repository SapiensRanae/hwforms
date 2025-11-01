import { Link, Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import { ProductProvider } from './context/ProductContext'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <nav className="nav">
          <div className="container nav-inner">
            <div className="brand">Shop</div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/admin">Admin</Link>
            </div>
          </div>
        </nav>
        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ProductProvider>
  )
}

export default App
