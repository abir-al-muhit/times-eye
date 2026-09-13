import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./components/cart";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WhatsAppFab from "./components/WhatsAppFab";
import Home from "./pages/Home";
import CollectionPage from "./pages/CollectionPage";
import ProductPage from "./pages/ProductPage";

// scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// TIMES EYE — real multi-page store (React Router)
export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="relative min-h-screen bg-canvas text-ink">
          <Nav />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections/:id" element={<CollectionPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <CartDrawer />
          <WhatsAppFab />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}