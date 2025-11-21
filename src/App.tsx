import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Home from './pages/Home';
import CartDrawer from './components/CartDrawer';

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className='app'>
      <Header onCartClick={() => setCartOpen(true)} />
      <AnimatePresence mode='wait'>
        <motion.main
          key='home'
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className='container'
        >
          <Home />
        </motion.main>
      </AnimatePresence>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default App;
