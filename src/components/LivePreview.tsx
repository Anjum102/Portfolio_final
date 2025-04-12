import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserData, TemplateId } from '../types/portfolio';
import { CyberTemplate } from './templates/CyberTemplate';
import { FutureTemplate } from './templates/FutureTemplate';
import { HKPatelTemplate } from './templates/HKPatelTemplate';

interface LivePreviewProps {
  userData: UserData;
  selectedTemplate: TemplateId;
  onTemplateChange: (template: TemplateId) => void;
  templates: TemplateId[];
}

export function LivePreview({ 
  userData, 
  selectedTemplate, 
  onTemplateChange,
  templates 
}: LivePreviewProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const getTemplateComponent = () => {
    switch (selectedTemplate) {
      case 'cyber':
        return <CyberTemplate userData={userData} />;
      case 'future':
        return <FutureTemplate userData={userData} />;
      case 'hkpatel':
        return <HKPatelTemplate userData={userData} />;
      default:
        return <FutureTemplate userData={userData} />;
    }
  };

  const currentIndex = templates.indexOf(selectedTemplate);

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? templates.length - 1 : currentIndex - 1;
    onTemplateChange(templates[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex === templates.length - 1 ? 0 : currentIndex + 1;
    onTemplateChange(templates[newIndex]);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      previewRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  return (
    <div 
      ref={previewRef}
      className={`relative h-full w-full bg-gray-900 rounded-lg overflow-hidden ${
        isFullScreen ? 'fixed inset-0 z-50' : 'transition-all duration-300'
      }`}
    >
      {/* Preview Header */}
      <motion.div 
        className="absolute top-0 left-0 right-0 preview-header p-4 z-10 flex justify-between items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.h3 
          className="text-lg font-semibold text-white capitalize"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {selectedTemplate} Template
        </motion.h3>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFullScreen}
            className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 backdrop-blur-sm"
          >
            {isFullScreen ? (
              <Minimize2 className="w-5 h-5 text-white" />
            ) : (
              <Maximize2 className="w-5 h-5 text-white" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Template Preview */}
      <div className={`${isFullScreen ? 'h-screen pt-20' : 'mt-16 h-[calc(100%-4rem)]'} overflow-y-auto preview-scroll transition-all duration-300`}> 
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTemplate}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {getTemplateComponent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Template Navigation Dots */}
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {templates.map((template, index) => (
          <motion.button
            key={template}
            onClick={() => onTemplateChange(template)}
            className={`w-2 h-2 rounded-full ${
              selectedTemplate === template ? 'bg-indigo-500' : 'bg-gray-600'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
