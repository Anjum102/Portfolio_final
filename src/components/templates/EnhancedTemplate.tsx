import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { UserData } from '../../types/portfolio';
import { Github, Linkedin, Twitter, Instagram, Download, Mail } from 'lucide-react';

interface EnhancedTemplateProps {
  userData: UserData;
}

export function EnhancedTemplate({ userData }: EnhancedTemplateProps) {
  const [headerRef, headerInView] = useInView({ triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true });

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-blue-900 to-purple-900 text-white">
      <motion.header
        ref={headerRef}
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className="relative pt-24 pb-20 px-6 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {userData.name}
          </motion.h1>
          <motion.p 
            className="text-2xl mb-8 text-teal-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {userData.profession}
          </motion.p>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-300 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {userData.bio}
          </motion.p>

          <motion.div 
            className="flex justify-center gap-8 mt-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { icon: Github, link: userData.socialLinks.github },
              { icon: Linkedin, link: userData.socialLinks.linkedin },
              { icon: Twitter, link: userData.socialLinks.twitter },
              { icon: Instagram, link: userData.socialLinks.instagram },
              { icon: Mail, link: `mailto:${userData.email}` }
            ].map((social, index) => social.link && (
              <motion.a
                key={index}
                href={social.link}
                whileHover="hover"
                variants={socialIconVariants}
                className="p-3 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          <motion.button
            className="mt-12 px-8 py-3 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full font-semibold flex items-center gap-2 mx-auto hover:from-teal-400 hover:to-purple-400 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            Download Resume
          </motion.button>
        </div>
      </motion.header>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <motion.section
          ref={skillsRef}
          initial="hidden"
          animate={skillsInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400">
            Skills & Expertise
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {userData.skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-3 bg-white/10 rounded-full text-teal-300 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.section>

        <motion.section
          ref={projectsRef}
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-400">
            Featured Projects
          </h2>
          <div className="grid gap-12">
            {userData.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-4 text-teal-300">{project.title}</h3>
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-black/30 rounded-full text-teal-300 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}