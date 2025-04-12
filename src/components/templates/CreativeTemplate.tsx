import React from 'react';
import { UserData } from '../../types/portfolio';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

interface CreativeTemplateProps {
  userData: UserData;
}

export function CreativeTemplate({ userData }: CreativeTemplateProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            {userData.name}
          </h1>
          <p className="text-2xl mb-8 text-gray-300">{userData.profession}</p>
          <p className="max-w-2xl mx-auto text-gray-300 leading-relaxed">{userData.bio}</p>
          
          <div className="flex justify-center gap-6 mt-8">
            {userData.socialLinks.github && (
              <a href={userData.socialLinks.github} className="text-gray-300 hover:text-purple-400 transition-colors">
                <Github className="w-6 h-6" />
              </a>
            )}
            {userData.socialLinks.linkedin && (
              <a href={userData.socialLinks.linkedin} className="text-gray-300 hover:text-purple-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            )}
            {userData.socialLinks.twitter && (
              <a href={userData.socialLinks.twitter} className="text-gray-300 hover:text-purple-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            )}
            {userData.socialLinks.website && (
              <a href={userData.socialLinks.website} className="text-gray-300 hover:text-purple-400 transition-colors">
                <Globe className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Skills & Expertise
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {userData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-gray-900 rounded-full text-purple-400 border border-purple-500/30 hover:border-purple-500 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Featured Work
          </h2>
          <div className="grid gap-12">
            {userData.projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-gray-900 rounded-2xl p-8 hover:bg-gray-800 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
                  <p className="text-gray-400 mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-4 py-2 bg-black/30 rounded-full text-purple-400 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}