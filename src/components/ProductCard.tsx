import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../api/types/Product';
import { springy } from '../animations/transitions';
import { useCart } from '../state/CartContext';

type Props = { product: Product };

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  };

  return (
    <motion.article
      className='card'
      whileHover={{ y: -6, scale: 1.02 }}
      transition={springy}
      layout
    >
      <img src={product.image} alt={product.name} />
      <div className='card-body'>
        <h3 className='card-title'>{product.name}</h3>
        <div className='muted' style={{ minHeight: 34 }}>
          {product.description || 'No description'}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <span className='card-price'>${product.price.toFixed(2)}</span>
          <motion.button
            className='button'
            onClick={onAdd}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            animate={
              added
                ? {
                    scale: [1, 1.08, 1],
                    boxShadow: '0 10px 24px rgba(0, 212, 255, 0.25)',
                  }
                : {}
            }
            transition={{ duration: 0.4 }}
          >
            {added ? 'Added!' : 'Add to Cart'}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
