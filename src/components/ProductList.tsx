import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client/react/hooks';
import { GET_PRODUCTS } from '../api/queries/products';
import type { Product } from '../api/types/Product';
import ProductCard from './ProductCard';
import Loader from './Loader';
import { fadeInUp, staggerContainer } from '../animations/transitions';

type ProductsResponse = { products: Product[] };

// Fallback data so the grid renders even without a working API
const fallbackProducts: Product[] = [
  {
    id: '1',
    name: 'Aurora Headphones',
    image:
      'https://images.unsplash.com/photo-1518441902113-c1d3f2e4a4f0?q=80&w=1200&auto=format&fit=crop',
    price: 199,
    description: 'Immersive spatial audio',
  },
  {
    id: '2',
    name: 'Nebula Lamp',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop',
    price: 59,
    description: 'Ambient RGB desk light',
  },
  {
    id: '3',
    name: 'Comet Keyboard',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
    price: 129,
    description: 'Hot-swappable mechanical',
  },
  {
    id: '4',
    name: 'Orbit Mouse',
    image:
      'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?q=80&w=1200&auto=format&fit=crop',
    price: 89,
    description: 'Ergonomic precision',
  },
];

const ProductList: React.FC = () => {
  const { data, loading, error } = useQuery<ProductsResponse>(GET_PRODUCTS, {
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
  });

  const products = data?.products ?? fallbackProducts;

  if (loading && !data) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: 220 }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    console.warn('GraphQL error:', error);
  }

  return (
    <motion.section
      id='products'
      variants={staggerContainer}
      initial='hidden'
      animate='show'
      className='grid'
    >
      {products.map((p) => (
        <motion.div key={p.id} variants={fadeInUp}>
          <ProductCard product={p} />
        </motion.div>
      ))}
    </motion.section>
  );
};

export default ProductList;
