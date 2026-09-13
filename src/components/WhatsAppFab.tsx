import { motion } from "framer-motion";
import { brand, visit } from "../data/brand";

// Floating WhatsApp chat button — the BD e-com "concierge" FAB.
// Real channel for the client; always visible, never blocks.
export default function WhatsAppFab() {
  const wa = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(visit.waText)}`;
  return (
    <motion.a
      href={wa}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.4, duration: 0.5 }}
      whileHover={{ scale: 1.08 }}
      className="group fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)]"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
        <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.5 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.2-3.6-.8-3-1.2-4.9-4.2-5-4.4-.2-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.6c-.2.2-.3.4-.1.7.2.3.8 1.4 1.8 2.2 1.2 1 2.3 1.4 2.6 1.5.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2.1 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.4z" />
      </svg>
    </motion.a>
  );
}