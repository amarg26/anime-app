import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../state/CartContext';

type Props = {
  onCartClick?: () => void;
};

const Header: React.FC<Props> = ({ onCartClick }) => {
  const { count } = useCart();

  const handleGetStarted = () => {
    document.getElementById('products')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <header className='header'>
      <div className='header-inner'>
        <motion.div
          className='logo'
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <svg
            width='22'
            height='22'
            viewBox='0 0 24 24'
            fill='none'
            aria-hidden
          >
            <path
              d='M5 12L12 5L19 12L12 19L5 12Z'
              stroke='#7c5cff'
              strokeWidth='2'
            />
          </svg>
          <span>Animated Showcase</span>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <motion.button
            className='button'
            onClick={handleGetStarted}
            whileHover={{
              y: -2,
              boxShadow: '0 10px 20px rgba(124,92,255,0.25)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            Get Started'
          </motion.button>

          <div style={{ position: 'relative' }}>
            <motion.button
              className='button'
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #7c5cff)',
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCartClick}
            >
              Cart
            </motion.button>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key='badge'
                  initial={{ scale: 0, opacity: 0, y: -4 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    minWidth: 20,
                    height: 20,
                    borderRadius: 10,
                    background: '#ff3b6b',
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 700,
                    display: 'grid',
                    placeItems: 'center',
                    padding: '0 6px',
                    boxShadow: '0 6px 16px rgba(255,59,107,0.35)',
                  }}
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
