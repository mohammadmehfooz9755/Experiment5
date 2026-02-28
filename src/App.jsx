import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { AppProvider } from './context/AppContext';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Pricing from './pages/Pricing';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <Router>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppNavbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/pricing" element={<Pricing />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AppProvider>
    </Provider>
  );
}

export default App;