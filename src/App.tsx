import { CartProvider } from "./components/cart";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Lenses from "./components/Lenses";
import Eyewear from "./components/Eyewear";
import Watches from "./components/Watches";
import Story from "./components/Story";
import Visit from "./components/Visit";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// TIMES EYE — premium eyewear flagship e-com (Gazipur, Dhaka).
// Signature: live Lens & Frame configurator in the hero. Cart →
// WhatsApp checkout; payment gateway added later.
export default function App() {
  return (
    <CartProvider>
      <div id="top" className="relative min-h-screen bg-canvas text-ink">
        <div className="grain" aria-hidden />
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <Lenses />
          <Eyewear />
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