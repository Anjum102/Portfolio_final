import React from 'react';
import { Github, Mail, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <span>Made with</span>
          <Heart className="w-5 h-5 text-red-500 animate-pulse" />
          <span>by Team</span>
        </motion.div>
        
        <div className="flex space-x-6">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </motion.a>
          
          <motion.a
            href="mailto:abc@gmail.com"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>Email</span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}