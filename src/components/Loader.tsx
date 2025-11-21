import React from 'react';
import { motion } from 'framer-motion';

const dots = {
  animate: { transition: { staggerChildren: 0.12, repeat: Infinity } },
};
const dot = {
  initial: { y: 0, opacity: 0.5 },
  animate: {
    y: -6,
    opacity: 1,
    transition: { duration: 0.5, repeat: Infinity, repeatType: 'mirror' },
  },
};

const Loader: React.FC = () => (
  <motion.div
    style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}
    variants={dots}
    initial='initial'
    animate='animate'
  >
    <motion.span variants={dot} style={styleDot} />
    <motion.span variants={dot} style={styleDot} />
    <motion.span variants={dot} style={styleDot} />
  </motion.div>
);

const styleDot: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 6,
  background: 'linear-gradient(135deg, #7c5cff, #00d4ff)',
};

export default Loader;
