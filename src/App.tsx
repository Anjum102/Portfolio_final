import React, { useState } from 'react';
import { UserForm } from './components/UserForm';
import { UserData, TemplateId } from './types/portfolio';
import { Download } from 'lucide-react';
import { generatePortfolioZip, downloadZip } from './lib/github';
import { Footer } from './components/Footer';
import { RefineContentButton } from './components/RefineContentButton';
import { LivePreview } from './components/LivePreview';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Logo } from './components/Logo';
import { Github } from 'lucide-react';
import { HKPatelTemplate } from './components/templates/HKPatelTemplate';

const initialUserData: UserData = {
  name: '',
  profession: '',
  email: '',
  phone: '',
  location: '',
  bio: '',
  skills: [],
  projects: [],
  education: [],
  experience: [],
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    email: ''
  },
  imageUrl: '',
  logoUrl: ''
};

export default function App() {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('hkpatel');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates: TemplateId[] = ['hkpatel', 'future', 'cyber', 'creative', 'modern', 'minimal'];

  const handleGeneratePortfolio = async () => {
    setIsGenerating(true);
    try {
      const zip = await generatePortfolioZip(userData, selectedTemplate);
      const fileName = `${userData.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.zip`;
      downloadZip(zip, fileName);
    } catch (error) {
      console.error('Error generating portfolio:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="x0">
      <Toaster position="top-right" />
      
      <motion.header
        className="x1 x2 x3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="x4 x5 x6">
          <Logo />
          <motion.div
            className="x7 x8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="x9 xa xb"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-6 h-6" />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </motion.header>

      <main className="x10 x11 x12">
        <div className="x13 x14 x15">
          {/* Left side - User Form */}
          <motion.div 
            className="x16 x17"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <UserForm userData={userData} setUserData={setUserData} />
            <div className="x18 x19">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <RefineContentButton userData={userData} setUserData={setUserData} />
              </motion.div>
              <motion.button
                onClick={handleGeneratePortfolio}
                disabled={isGenerating}
                className={`x20 x21 relative overflow-hidden group ${
                  isGenerating ? 'x22' : 'x23 x24'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  animate={{ 
                    background: isGenerating 
                      ? ['linear-gradient(to right, rgba(147,51,234,0.2), rgba(79,70,229,0.2))', 
                         'linear-gradient(to right, rgba(79,70,229,0.2), rgba(147,51,234,0.2))'] 
                      : 'linear-gradient(to right, rgba(147,51,234,0.2), rgba(79,70,229,0.2))'
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: isGenerating ? Infinity : 0,
                    ease: "linear"
                  }}
                />
                <div className="relative flex items-center justify-center gap-2">
                  <Download className={`w-5 h-5 ${isGenerating ? 'animate-bounce' : ''}`} />
                  {isGenerating ? 'Generating...' : 'Download Portfolio'}
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Right side - Live Preview */}
          <motion.div 
            className="x25 x26 x27"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <LivePreview
              userData={userData}
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
              templates={templates}
            />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}