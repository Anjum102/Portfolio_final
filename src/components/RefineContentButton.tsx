import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserData } from '../types/portfolio';
import toast from 'react-hot-toast';
import { generateContent } from '../lib/gemini';
interface RefineContentButtonProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

export function RefineContentButton({ userData, setUserData }: RefineContentButtonProps) {
  const [isRefining, setIsRefining] = useState(false);



  const refineContent = async () => {
    setIsRefining(true);
    try {
      const enhancedBio = userData.bio ? await enhanceBio(userData.bio) : userData.bio;
  
      const enhancedProjects = await Promise.all(
        userData.projects.map(async (project) => ({
          ...project,
          description: project.description
            ? await enhanceProjectDescription(project.description)
            : project.description
        }))
      );
  
      setUserData({
        ...userData,
        bio: enhancedBio,
        projects: enhancedProjects
      });
  
      toast.success('Content refined successfully!');
    } catch (error) {
      console.error('Refinement error:', error);
      toast.error('Failed to refine content. Please try again.');
    } finally {
      setIsRefining(false);
    }
  };
  
  const enhanceBio = async (bio: string) => {
    const prompt = `Improve this professional bio:\n\n${bio}`;
    return await generateContent(prompt);
  };
  
  const enhanceProjectDescription = async (description: string) => {
    const prompt = `Improve this project description with achievements and technical details:\n\n${description}`;
    return await generateContent(prompt);
  };
  

  return (
    <motion.button
      onClick={refineContent}
      disabled={isRefining}
      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Wand2 className="w-5 h-5" />
      <span>{isRefining ? 'Refining...' : 'Refine Content with AI'}</span>
    </motion.button>
  );
}