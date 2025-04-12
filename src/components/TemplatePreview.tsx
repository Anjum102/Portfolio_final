import React from 'react';
import { UserData, TemplateId } from '../types/portfolio';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { CyberTemplate } from './templates/CyberTemplate';
import { FutureTemplate } from './templates/FutureTemplate';
import { motion } from 'framer-motion';

interface TemplatePreviewProps {
  templateId: TemplateId;
  userData: UserData;
  onSelect: () => void;
  selected: boolean;
}

export function TemplatePreview({ templateId, userData, onSelect, selected }: TemplatePreviewProps) {
  const templates = {
    minimal: MinimalTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate,
    cyber: CyberTemplate,
    future: FutureTemplate,
  };

  const Template = templates[templateId];

  if (!Template) {
    return null;
  }

  return (
    <motion.div
      className={`relative border-2 rounded-lg overflow-hidden transition-all ${
        selected ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-gray-200'
      }`}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
        <motion.button
          onClick={onSelect}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-purple-600 text-white rounded-md shadow-lg hover:bg-purple-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {selected ? 'Selected Template' : 'Use This Template'}
        </motion.button>
      </div>
      <div className="w-full aspect-[4/3] overflow-hidden">
        <div className="transform scale-[0.4] origin-top-left w-[250%] h-[250%]">
          <Template userData={userData} />
        </div>
      </div>
    </motion.div>
  );
}