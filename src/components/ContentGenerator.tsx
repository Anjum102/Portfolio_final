import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { generateContent } from '../lib/gemini';

interface ContentGeneratorProps {
  onGenerate: (content: string) => void;
  type: 'bio' | 'project';
  context?: string;
}

export function ContentGenerator({ onGenerate, type, context }: ContentGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      let prompt = '';
      if (type === 'bio') {
        prompt = `Write a professional and engaging bio for a ${context} that highlights their expertise and passion for their work. Keep it concise and impactful.`;
      } else if (type === 'project') {
        prompt = `Write a compelling project description for a project named "${context}". Focus on the impact and key features. Keep it concise and professional.`;
      }

      const content = await generateContent(prompt);
      if (content) {
        onGenerate(content);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handleGenerate}
      disabled={isGenerating}
      className="inline-flex items-center px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
    >
      <Wand2 className="w-4 h-4 mr-1" />
      {isGenerating ? 'Generating...' : 'Generate with AI'}
    </button>
  );
}