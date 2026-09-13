import { CartProvider } from "./components/cart";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Collections from "./components/Collections";
import Shop from "./components/Shop";
import Lenses from "./components/Lenses";
import Watches from "./components/Watches";
import Story from "./components/Story";
import Visit from "./components/Visit";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// TIMES EYE — premium eyewear flagship e-com.
// Flow: hero slider → collections → shop (new/best/hot tabs) →
// lenses → watches → why → visit. Each frame opens a product
// detail with prescription + lens build. Cart → WhatsApp checkout.
export default function App() {
  return (
    <CartProvider>
      <div id="top" className="relative min-h-screen bg-canvas text-ink">
        <div className="grain" aria-hidden />
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Collections />
          <Shop />
          <Lenses />
          <Watches />
          <Story />
          <Visit />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}