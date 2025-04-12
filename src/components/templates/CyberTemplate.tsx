import React from 'react';
import { motion } from 'framer-motion';
import { UserData } from '../../types/portfolio';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { getSkillIcon } from '../../lib/skillIcons';

interface CyberTemplateProps {
  userData: UserData;
}

export function CyberTemplate({ userData }: CyberTemplateProps) {
  return (
    <div className="min-h-screen bg-black text-cyan-500 font-mono">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.8, 1] }}
        transition={{ duration: 2, times: [0, 0.5, 0.75, 1] }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)] pointer-events-none"
      />

      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.8),transparent_50%,rgba(0,0,0,0.8))]" />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')] bg-cover bg-center opacity-20"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {userData.imageUrl && (
              <motion.img
                src={userData.imageUrl}
                alt={userData.name}
                className="w-32 h-32 rounded-full mx-auto mb-8 border-2 border-cyan-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
            )}
            <motion.h1
              className="text-6xl font-bold mb-4 glitch-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {userData.name || 'Your Name'}
            </motion.h1>
            <motion.div
              className="text-2xl mb-8 text-cyan-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="typing-text">{userData.profession || 'Your Profession'}</span>
            </motion.div>
          </motion.div>

          <motion.p
            className="max-w-2xl mx-auto text-lg leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {userData.bio || 'Your professional bio will appear here'}
          </motion.p>

          <motion.div
            className="flex justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
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
                className="text-cyan-500 hover:text-cyan-300 transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <social.icon className="w-8 h-8" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-20">
        <section className="mb-20">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Tech Stack
          </motion.h2>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {(userData.skills || []).map((skill, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-black/50 border border-cyan-900 hover:border-cyan-500 transition-colors"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {getSkillIcon(skill)}
                <span className="text-sm">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section>
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Projects
          </motion.h2>
          <div className="grid gap-12">
            {(userData.projects || []).map((project, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-8 rounded-xl border border-cyan-900 hover:border-cyan-500 transition-colors">
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-gray-400 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-sm bg-cyan-950 rounded-full text-cyan-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}