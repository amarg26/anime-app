import React from 'react';
import { motion } from 'framer-motion';
import ProductList from '../components/ProductList';

const Home: React.FC = () => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 style={{ margin: '8px 0 6px' }}>Explore Products</h1>
        <p className='muted'>
          Powered by GraphQL, animated with Framer Motion.
        </p>
      </motion.section>

      <ProductList />
    </>
  );
};

export default Home;
