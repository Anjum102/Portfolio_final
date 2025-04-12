import React from 'react';
import { UserData } from '../../types/portfolio';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

interface ModernTemplateProps {
  userData: UserData;
}

export function ModernTemplate({ userData }: ModernTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <header className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{userData.name}</h1>
          <p className="text-2xl text-indigo-600 mb-6">{userData.profession}</p>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">{userData.bio}</p>
          
          <div className="flex justify-center gap-6 mt-8">
            {userData.socialLinks.github && (
              <a href={userData.socialLinks.github} className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Github className="w-6 h-6" />
              </a>
            )}
            {userData.socialLinks.linkedin && (
              <a href={userData.socialLinks.linkedin} className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            )}
            {userData.socialLinks.twitter && (
              <a href={userData.socialLinks.twitter} className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            )}
            {userData.socialLinks.website && (
              <a href={userData.socialLinks.website} className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Globe className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {userData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-white shadow-md rounded-full text-indigo-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h2>
          <div className="grid gap-8">
            {userData.projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
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