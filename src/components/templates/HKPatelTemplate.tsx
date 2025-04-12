import React, { useEffect, useRef } from 'react';
import { UserData } from '../../types/portfolio';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';

interface HKPatelTemplateProps {
  userData: UserData;
}

export function HKPatelTemplate({ userData }: HKPatelTemplateProps) {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [`My name is ${userData.name}!<br>I am a ${userData.profession}`],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, [userData.name, userData.profession]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Poppins']">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-white no-underline">
            <div className="text-xl font-bold">{userData.name}'s Portfolio</div>
          </a>
          <div>
            <ul className="flex space-x-8">
              <li><a href="#home" className="text-white hover:text-cyan-400 transition-colors"></a></li>
              <li><a href="#about" className="text-white hover:text-cyan-400 transition-colors">About</a></li>
              <li><a href="#education" className="text-white hover:text-cyan-400 transition-colors">Education</a></li>
              <li><a href="#projects" className="text-white hover:text-cyan-400 transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-white hover:text-cyan-400 transition-colors">Contact Me</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl mb-6">
                <span className="text-cyan-400">Hi</span>{" "}
                <span ref={el}></span>
              </h1>
              <div className="flex space-x-6 mt-8">
                {userData.socialLinks.github && (
                  <a href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer" 
                     className="text-white hover:text-cyan-400 transition-colors">
                    <img src="/git.svg" alt="GitHub" className="w-6 h-6" />
                  </a>
                )}
                {userData.socialLinks.linkedin && (
                  <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                     className="text-[#74C0FC] hover:text-cyan-400 transition-colors">
                    <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
                  </a>
                )}
                {userData.socialLinks.email && (
                  <a href={`mailto:${userData.socialLinks.email}`} target="_blank" rel="noopener noreferrer"
                     className="text-white hover:text-cyan-400 transition-colors">
                    <img src="/gmail.png" alt="Email" className="w-6 h-6" />
                  </a>
                )}
                {/* CodeForces */}
                <a href="https://codeforces.com" target="_blank" rel="noopener noreferrer"
                   className="w-6 h-6">
                  <img src="/CF.png" alt="CodeForces" className="w-full h-full object-contain" />
                </a>
                {/* CodeChef */}
                <a href="https://www.codechef.com" target="_blank" rel="noopener noreferrer"
                   className="w-6 h-6">
                  <img src="/codechef.svg" alt="CodeChef" className="w-full h-full object-contain" />
                </a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src={userData.imageUrl || "/hk1.png"} 
                alt={userData.name} 
                className="w-full h-auto rounded-full border-4 border-cyan-400 p-2"
              />
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="about" className="py-20 px-6 bg-gray-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img src="/output-onlinegiftools.gif" alt="Skills Animation" className="w-3/4 h-auto" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8 text-cyan-400">What I Do?</h2>
              <p className="text-gray-300 mb-8">
                {userData.bio || "Passionate Full Stack Developer on a mission to master every tech stack and push boundaries in the digital world!"}
              </p>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-8">
                {userData.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="text-center bg-gray-900 p-4 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <i className={`fab fa-${skill.toLowerCase()} text-4xl mb-2 text-cyan-400`}></i>
                    <p className="text-sm">{skill}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">Projects</h2>
            <p className="text-center mb-12">Here are some projects I've worked on:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow border border-cyan-400"
                  whileHover={{ y: -5 }}
                >
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  )}
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm text-cyan-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-cyan-400 hover:text-cyan-300"
                    >
                      View Project →
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-6 bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">Education</h2>
            <div className="space-y-8">
              {userData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-900 rounded-lg p-6 border-l-4 border-cyan-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <img src="/NSTLOGO.png" alt="School Logo" className="w-12 h-12 mr-4" />
                    <div>
                      <h3 className="text-xl font-bold text-cyan-400">{edu.school}</h3>
                      <p className="text-gray-300">{edu.degree}</p>
                    </div>
                  </div>
                  <p className="text-gray-400">{edu.duration}</p>
                  <p className="mt-4 text-gray-300">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
<section id="contact" className="py-20 px-6 bg-gray-800">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">Contact</h2>
    <motion.div
      className="bg-gray-900 rounded-lg p-6 border-l-4 border-cyan-400"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="space-y-4 text-gray-300">
        <div className="flex items-center">
          <span className="w-32 font-semibold text-white">Name:</span>
          <span>Anjum</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold text-white">Email:</span>
          <span>gmail.com</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold text-white">Phone:</span>
          <span>+91-xxxxxxxx</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold text-white">Location:</span>
          <span>Delhi, India</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold text-white">LinkedIn:</span>
          <a
            href="https://www.linkedin.com/in/anjum-6a576725a"
            className="text-cyan-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com
          </a>
        </div>
        <div className="flex items-center">
          <span className="w-32 font-semibold text-white">GitHub:</span>
          <a
            href="https://github.com/Anjum102"
            className="text-cyan-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com
          </a>
        </div>
      </div>
    </motion.div>
  </div>
</section>

      </main>
    </div>
  );
}
