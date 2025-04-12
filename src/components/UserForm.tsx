import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserData } from '../types/portfolio';
import { PlusCircle, MinusCircle, User, Mail, Phone, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { SocialLinks } from './SocialLinks';
import { ContentGenerator } from './ContentGenerator';
import { RefineContentButton } from './RefineContentButton';

interface UserFormProps {
  userData: UserData;
  setUserData: (data: UserData) => void;
}

const formSections = {
  personal: 'Personal',
  skills: 'Skills',
  projects: 'Projects',
  education: 'Education',
  experience: 'Experience',
  social: 'Social Links'
};

export function UserForm({ userData, setUserData }: UserFormProps) {
  const [activeSection, setActiveSection] = useState('personal');
  const [expandedSections, setExpandedSections] = useState<string[]>(['personal']);
  const [educationEntries, setEducationEntries] = useState([{ degree: '', institution: '', year: '' }]);
  const [experienceEntries, setExperienceEntries] = useState([{ position: '', company: '', year: '' }]);
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Personal', 'Skills', 'Projects', 'Education', 'Experience', 'Social Links'];

  const addEducationEntry = () => {
    setEducationEntries([...educationEntries, { degree: '', institution: '', year: '' }]);
  };

  const removeEducationEntry = (index: number) => {
    setEducationEntries(educationEntries.filter((_, i) => i !== index));
  };

  const addExperienceEntry = () => {
    setExperienceEntries([...experienceEntries, { position: '', company: '', year: '' }]);
  };

  const removeExperienceEntry = (index: number) => {
    setExperienceEntries(experienceEntries.filter((_, i) => i !== index));
  };

  const toggleSection = (section: string) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter(s => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
    setActiveSection(section);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1 }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 bg-gray-800 rounded-lg p-6 shadow-xl border border-gray-700 relative overflow-hidden"
    >
      {/* Background Logo */}
      <div 
        className="absolute right-0 top-0 w-64 h-64 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'url(https://github.com/AryanVBW/Portfolio-Builder/releases/download/v2/x-removebg-preview.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />

      <div className="flex items-center justify-between mb-8 relative z-10">
        <h2 className="text-2xl font-bold text-white">Personal Information</h2>
        <div className="flex items-center space-x-4">
          <ImageUpload
            onImageUpload={(imageUrl) => setUserData({ ...userData, imageUrl })}
            currentImage={userData.imageUrl}
          />
          <ImageUpload
            onImageUpload={(logoUrl) => setUserData({ ...userData, logoUrl })}
            currentImage={userData.logoUrl}
            label="Logo"
            className="w-12 h-12"
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mb-4">
        {steps.map((step, index) => (
          <span key={index} className={`text-sm font-semibold ${index === currentStep ? 'text-indigo-400' : 'text-gray-400'}`}>Step {index + 1}: {step}</span>
        ))}
      </div>

      {/* Render Current Step */}
      {currentStep === 0 && (
        <AnimatePresence mode="wait">
          {/* Section Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(formSections).map(([key, label]) => (
              <motion.button
                key={key}
                onClick={() => toggleSection(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeSection === key
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            ))}
          </div>

          {/* Personal Information Section */}
          {expandedSections.includes('personal') && (
            <motion.div
              key="personal"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="space-y-4"
            >
              <motion.div variants={inputVariants} custom={0}>
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-5 h-5 text-indigo-400" />
                  <label className="block text-sm font-medium text-gray-300">Full Name</label>
                </div>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter your name"
                />
              </motion.div>

              <motion.div variants={inputVariants} custom={1}>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-indigo-400" />
                  <label className="block text-sm font-medium text-gray-300">Profession</label>
                </div>
                <input
                  type="text"
                  value={userData.profession}
                  onChange={(e) => setUserData({ ...userData, profession: e.target.value })}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter your Profession"
                />
              </motion.div>

              <motion.div variants={inputVariants} custom={2}>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-indigo-400" />
                  <label className="block text-sm font-medium text-gray-300">Email</label>
                </div>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter your Email"
                />
              </motion.div>

              <motion.div variants={inputVariants} custom={3}>
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-indigo-400" />
                  <label className="block text-sm font-medium text-gray-300">Phone</label>
                </div>
                <input
                  type="tel"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="+91 xxxxx xxxxx"
                />
              </motion.div>

              <motion.div variants={inputVariants} custom={4}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <label className="block text-sm font-medium text-gray-300">Location</label>
                </div>
                <input
                  type="text"
                  value={userData.location}
                  onChange={(e) => setUserData({ ...userData, location: e.target.value })}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Enter location"
                />
              </motion.div>

              <motion.div variants={inputVariants} custom={5}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-400" />
                    <label className="block text-sm font-medium text-gray-300">Professional Bio</label>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RefineContentButton userData={userData} setUserData={setUserData} />
                  </motion.div>
                </div>
                <textarea
                  value={userData.bio}
                  onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Passionate Full Stack Developer with expertise in React, Node.js, and cloud technologies..."
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {currentStep === 1 && (
        <AnimatePresence mode="wait">
          {/* Skills Section */}
          <motion.div
            key="skills"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.div variants={inputVariants} custom={0}>
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-indigo-400" />
                <label className="block text-sm font-medium text-gray-300">Skills</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <span className="text-sm text-gray-300">{skill}</span>
                    <button
                      onClick={() => {
                        const newSkills = [...userData.skills];
                        newSkills.splice(index, 1);
                        setUserData({ ...userData, skills: newSkills });
                      }}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <MinusCircle className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
                <motion.button
                  onClick={() => {
                    const skill = prompt('Enter a new skill:');
                    if (skill) {
                      setUserData({
                        ...userData,
                        skills: [...userData.skills, skill]
                      });
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Skill</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      {currentStep === 2 && (
        <AnimatePresence mode="wait">
          {/* Projects Section */}
          <motion.div
            key="projects"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-4"
          >
            <motion.div variants={inputVariants} custom={0}>
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-indigo-400" />
                <label className="block text-sm font-medium text-gray-300">Projects</label>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <span className="text-sm text-gray-300">{project.title}</span>
                    <button
                      onClick={() => {
                        const newProjects = [...userData.projects];
                        newProjects.splice(index, 1);
                        setUserData({ ...userData, projects: newProjects });
                      }}
                      className="text-gray-400 hover:text-red-400"
                    >
                      <MinusCircle className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
                <motion.button
                  onClick={() => {
                    const project = {
                      title: '',
                      description: '',
                      technologies: []
                    };
                    setUserData({
                      ...userData,
                      projects: [...userData.projects, project]
                    });
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Project</span>
                </motion.button>
              </div>
            </motion.div>
            {userData.projects.map((project, index) => (
              <motion.div
                key={index}
                variants={inputVariants}
                custom={index + 1}
                className="space-y-2 p-4 border border-gray-600 rounded-lg bg-gray-700"
              >
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-300">Project Title</label>
                </div>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => {
                    const newProjects = [...userData.projects];
                    newProjects[index] = { ...project, title: e.target.value };
                    setUserData({ ...userData, projects: newProjects });
                  }}
                  className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />

                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-300">Project Description</label>
                </div>
                <div className="flex items-center justify-between">
                  <textarea
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = [...userData.projects];
                      newProjects[index] = { ...project, description: e.target.value };
                      setUserData({ ...userData, projects: newProjects });
                    }}
                    rows={4}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  />
                  <ContentGenerator
                    type="project"
                    context={project.title}
                    onGenerate={(content) => {
                      const newProjects = [...userData.projects];
                      newProjects[index] = { ...project, description: content };
                      setUserData({ ...userData, projects: newProjects });
                    }}
                  />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-gray-300">Technologies</label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <span className="text-sm text-gray-300">{technology}</span>
                      <button
                        onClick={() => {
                          const newProjects = [...userData.projects];
                          newProjects[index] = {
                            ...project,
                            technologies: project.technologies.filter(t => t !== technology)
                          };
                          setUserData({ ...userData, projects: newProjects });
                        }}
                        className="text-gray-400 hover:text-red-400"
                      >
                        <MinusCircle className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                  <motion.button
                    onClick={() => {
                      const technology = prompt('Enter a new technology:');
                      if (technology) {
                        const newProjects = [...userData.projects];
                        newProjects[index] = {
                          ...project,
                          technologies: [...project.technologies, technology]
                        };
                        setUserData({ ...userData, projects: newProjects });
                      }
                    }}
                    className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Technology</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
      {currentStep === 3 && (
        <AnimatePresence mode="wait">
          {/* Education Section */}
          <motion.div
            key="education"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
            {educationEntries.map((entry, index) => (
              <motion.div key={index} className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={entry.degree}
                    onChange={(e) => {
                      const newEntries = [...educationEntries];
                      newEntries[index].degree = e.target.value;
                      setEducationEntries(newEntries);
                    }}
                    className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={entry.institution}
                    onChange={(e) => {
                      const newEntries = [...educationEntries];
                      newEntries[index].institution = e.target.value;
                      setEducationEntries(newEntries);
                    }}
                    className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={entry.year}
                    onChange={(e) => {
                      const newEntries = [...educationEntries];
                      newEntries[index].year = e.target.value;
                      setEducationEntries(newEntries);
                    }}
                    className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => removeEducationEntry(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
            <button
              onClick={addEducationEntry}
              className="mt-2 text-indigo-400 hover:text-indigo-600"
            >
              Add Education
            </button>
          </motion.div>
        </AnimatePresence>
      )}
      {currentStep === 4 && (
        <AnimatePresence mode="wait">
          {/* Experience Section */}
          <motion.div
            key="experience"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Experience</h3>
            {experienceEntries.map((entry, index) => (
              <motion.div key={index} className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Position"
                    value={entry.position}
                    onChange={(e) => {
                      const newEntries = [...experienceEntries];
                      newEntries[index].position = e.target.value;
                      setExperienceEntries(newEntries);
                    }}
                    className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={entry.company}
                    onChange={(e) => {
                      const newEntries = [...experienceEntries];
                      newEntries[index].company = e.target.value;
                      setExperienceEntries(newEntries);
                    }}
                    className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={entry.year}
                    onChange={(e) => {
                      const newEntries = [...experienceEntries];
                      newEntries[index].year = e.target.value;
                      setExperienceEntries(newEntries);
                    }}
                    className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => removeExperienceEntry(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
            <button
              onClick={addExperienceEntry}
              className="mt-2 text-indigo-400 hover:text-indigo-600"
            >
              Add Experience
            </button>
          </motion.div>
        </AnimatePresence>
      )}
      {currentStep === 5 && (
        <AnimatePresence mode="wait">
          {/* Social Links Section */}
          <motion.div
            key="social"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            className="space-y-4"
          >
            <SocialLinks
              socialLinks={userData.socialLinks}
              onUpdate={(links) => setUserData({ ...userData, socialLinks: links })}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button onClick={previousStep} disabled={currentStep === 0} className="text-indigo-400 hover:text-indigo-600">Previous</button>
        <button onClick={nextStep} disabled={currentStep === steps.length - 1} className="text-indigo-400 hover:text-indigo-600">Next</button>
      </div>
    </motion.div>
  );
}