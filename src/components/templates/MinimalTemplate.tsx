import React from 'react';
import { UserData } from '../../types/portfolio';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';

interface MinimalTemplateProps {
  userData: UserData;
}

export function MinimalTemplate({ userData }: MinimalTemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-gray-900">{userData.name}</h1>
          <p className="text-xl text-gray-600 mt-2">{userData.profession}</p>
          <p className="mt-4 text-gray-600 max-w-2xl">{userData.bio}</p>
          
          <div className="flex gap-4 mt-6">
            {userData.socialLinks.github && (
              <a href={userData.socialLinks.github} className="text-gray-600 hover:text-gray-900">
                <Github className="w-5 h-5" />
              </a>
            )}
            {userData.socialLinks.linkedin && (
              <a href={userData.socialLinks.linkedin} className="text-gray-600 hover:text-gray-900">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {userData.socialLinks.twitter && (
              <a href={userData.socialLinks.twitter} className="text-gray-600 hover:text-gray-900">
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {userData.socialLinks.website && (
              <a href={userData.socialLinks.website} className="text-gray-600 hover:text-gray-900">
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {userData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>
          <div className="grid gap-6">
            {userData.projects.map((project, index) => (
              <div key={index} className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                <p className="mt-2 text-gray-600">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}