import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../state/CartContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const CartDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const { items, subtotal, updateQty, removeItem, clear } = useCart();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      globalThis.addEventListener('keydown', onKey);

      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
    return () => globalThis.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key='overlay'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(2px)',
              zIndex: 50,
            }}
          />
          <motion.aside
            key='panel'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 36 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100%',
              width: 'min(420px, 92vw)',
              background: 'linear-gradient(180deg, #171a23, #141822)',
              color: 'var(--text)',
              borderLeft: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 10px 50px rgba(0,0,0,0.45)',
              zIndex: 60,
              display: 'flex',
              flexDirection: 'column',
            }}
            aria-modal='true'
            aria-label='Cart'
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 16,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>
                Your Cart
              </h3>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                className='button'
                style={{ padding: '6px 10px' }}
              >
                Close
              </button>
            </div>

            <div style={{ flex: 1, overflow: 'auto', padding: '8px 12px' }}>
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    key='empty'
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    style={{ padding: 20, color: 'var(--muted)' }}
                  >
                    Your cart is empty.
                  </motion.div>
                ) : (
                  items.map((it) => (
                    <motion.div
                      key={it.id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '64px 1fr auto',
                        gap: 12,
                        padding: 10,
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={it.image}
                        alt={it.name}
                        style={{
                          width: 64,
                          height: 64,
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>{it.name}</div>
                        <div className='muted' style={{ fontSize: 12 }}>
                          {currency.format(it.price)}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            marginTop: 8,
                          }}
                        >
                          <button
                            className='button'
                            onClick={() =>
                              updateQty(it.id, Math.max(0, it.qty - 1))
                            }
                            style={{ padding: '4px 10px' }}
                          >
                            -
                          </button>
                          <span style={{ minWidth: 20, textAlign: 'center' }}>
                            {it.qty}
                          </span>
                          <button
                            className='button'
                            onClick={() => updateQty(it.id, it.qty + 1)}
                            style={{ padding: '4px 10px' }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div
                        style={{ display: 'grid', gap: 8, justifyItems: 'end' }}
                      >
                        <div style={{ fontWeight: 700 }}>
                          {currency.format(it.qty * it.price)}
                        </div>
                        <button
                          onClick={() => removeItem(it.id)}
                          style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'var(--muted)',
                            borderRadius: 8,
                            padding: '6px 10px',
                            cursor: 'pointer',
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: 16,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}
              >
                <span className='muted'>Subtotal</span>
                <strong>{currency.format(subtotal)}</strong>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  className='button'
                  style={{ flex: 1 }}
                  onClick={() =>
                    alert('Checkout flow not implemented in scaffold.')
                  }
                >
                  Checkout
                </button>
                <button
                  onClick={clear}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'var(--text)',
                    borderRadius: 10,
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
