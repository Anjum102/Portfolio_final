import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

export function Logo() {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <Code2 className="w-8 h-8 text-indigo-500" />
      </motion.div>
      <motion.span
        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        Portfolio Builder
      </motion.span>
    </motion.div>
  );
}
