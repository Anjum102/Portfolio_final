import React, { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { Eye } from 'lucide-react';
import { UserData, TemplateId } from '../types/portfolio';
import { CyberTemplate } from './templates/CyberTemplate';
import { FutureTemplate } from './templates/FutureTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { HKPatelTemplate } from './templates/HKPatelTemplate';
import { motion, AnimatePresence } from 'framer-motion';

interface PreviewButtonProps {
  userData: UserData;
  selectedTemplate: TemplateId;
}

export function PreviewButton({ userData, selectedTemplate }: PreviewButtonProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const getTemplate = () => {
    switch (selectedTemplate) {
      case 'cyber':
        return <CyberTemplate userData={userData} />;
      case 'future':
        return <FutureTemplate userData={userData} />;
      case 'creative':
        return <CreativeTemplate userData={userData} />;
      case 'modern':
        return <ModernTemplate userData={userData} />;
      case 'minimal':
        return <MinimalTemplate userData={userData} />;
      case 'hkpatel':
        return <HKPatelTemplate userData={userData} />;
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsPreviewOpen(true)}
        className="inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25
        }}
      >
        <motion.span
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mr-2"
        >
          <Eye size={18} />
        </motion.span>
        <motion.span
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Preview
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            <div className="absolute inset-0 overflow-auto">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close Preview
              </button>
              {getTemplate()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
