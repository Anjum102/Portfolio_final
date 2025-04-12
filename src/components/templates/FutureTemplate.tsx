import React from 'react';
import { motion } from 'framer-motion';
import { UserData } from '../../types/portfolio';
import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

interface FutureTemplateProps {
  userData: UserData;
}

export function FutureTemplate({ userData }: FutureTemplateProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
      
      <header className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
              opacity: [0.3, 0.5]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')] bg-cover bg-center"
            style={{ filter: 'hue-rotate(45deg)' }}
          />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <motion.div variants={item}>
            {userData.imageUrl && (
              <motion.img
                src={userData.imageUrl}
                alt={userData.name}
                className="w-32 h-32 rounded-full mx-auto mb-8 border-2 border-purple-500 p-1"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.div>

          <motion.h1
            variants={item}
            className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          >
            {userData.name || 'Your Name'}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-2xl mb-8 text-purple-300"
          >
            {userData.profession || 'Your Profession'}
          </motion.p>

          <motion.p
            variants={item}
            className="max-w-2xl mx-auto text-gray-300 leading-relaxed"
          >
            {userData.bio || 'Your professional bio will appear here'}
          </motion.p>

          <motion.div
            variants={item}
            className="flex justify-center gap-6 mt-12"
          >
            {[
              { icon: Github, link: userData.socialLinks.github },
              { icon: Linkedin, link: userData.socialLinks.linkedin },
              { icon: Twitter, link: userData.socialLinks.twitter },
              { icon: Mail, link: userData.socialLinks.email ? `mailto:${userData.socialLinks.email}` : undefined }
            ].map((social, index) => social.link && (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Technical Arsenal
          </h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {(userData.skills || []).map((skill, index) => (
              <motion.div
                key={index}
                variants={item}
                className="p-4 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-center text-purple-300">{skill}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Featured Projects
          </h2>
          <div className="grid gap-8">
            {(userData.projects || []).map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-white/5 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-4 text-purple-300">{project.title}</h3>
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-6 text-purple-400 hover:text-purple-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="mr-2">View Project</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}