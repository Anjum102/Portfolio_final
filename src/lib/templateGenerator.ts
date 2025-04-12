import React from 'react';
import { UserData } from '../types/portfolio';
import { MinimalTemplate } from '../components/templates/MinimalTemplate';
import { ModernTemplate } from '../components/templates/ModernTemplate';
import { CreativeTemplate } from '../components/templates/CreativeTemplate';
import { CyberTemplate } from '../components/templates/CyberTemplate';
import { FutureTemplate } from '../components/templates/FutureTemplate';
import ReactDOMServer from 'react-dom/server';

interface TemplateFiles {
  [key: string]: string;
}

function convertImageToBase64(imageUrl: string): string {
  if (imageUrl.startsWith('data:image')) {
    return imageUrl;
  }
  return imageUrl;
}

function generateStaticHTML(userData: UserData): string {
  const { name, profession, bio, skills, projects, education, experience, socialLinks, imageUrl, logoUrl } = userData;
  
  return `
    <header class="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between">
          ${logoUrl ? `<img src="${logoUrl}" alt="Logo" class="w-16 h-16 mb-4 md:mb-0">` : ''}
          <div class="text-center md:text-left">
            <h1 class="text-4xl font-bold mb-2">${name}</h1>
            <p class="text-xl mb-4">${profession}</p>
            <p class="max-w-2xl">${bio}</p>
          </div>
          ${imageUrl ? `<img src="${imageUrl}" alt="Profile" class="w-32 h-32 rounded-full object-cover mt-6 md:mt-0">` : ''}
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-12">
      <!-- Skills Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Skills</h2>
        <div class="flex flex-wrap gap-3">
          ${skills.map(skill => `
            <span class="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300">
              ${skill}
            </span>
          `).join('')}
        </div>
      </section>

      <!-- Projects Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${projects.map(project => `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-white">${project.title}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">${project.description}</p>
              <div class="flex flex-wrap gap-2">
                ${project.technologies.map(tech => `
                  <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm">
                    ${tech}
                  </span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Experience Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Experience</h2>
        <div class="space-y-6">
          ${experience.map(exp => `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">${exp}</h3>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Education Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Education</h2>
        <div class="space-y-6">
          ${education.map(edu => `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 class="text-xl font-bold text-gray-800 dark:text-white">${edu}</h3>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Social Links -->
      <section class="text-center">
        <div class="flex justify-center space-x-6">
          ${socialLinks.github ? `
            <a href="${socialLinks.github}" target="_blank" rel="noopener noreferrer" 
               class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
            </a>
          ` : ''}
          ${socialLinks.linkedin ? `
            <a href="${socialLinks.linkedin}" target="_blank" rel="noopener noreferrer"
               class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
            </a>
          ` : ''}
          ${socialLinks.twitter ? `
            <a href="${socialLinks.twitter}" target="_blank" rel="noopener noreferrer"
               class="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
              </svg>
            </a>
          ` : ''}
        </div>
      </section>
    </main>

    <footer class="bg-gray-100 dark:bg-gray-900 py-8 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>  ${new Date().getFullYear()} ${name}. All rights reserved.</p>
      </div>
    </footer>
  `;
}

export async function generateTemplateFiles(
  userData: UserData,
  templateId: string
): Promise<TemplateFiles> {
  const processedUserData = {
    ...userData,
    imageUrl: userData.imageUrl ? convertImageToBase64(userData.imageUrl) : '',
    logoUrl: userData.logoUrl ? convertImageToBase64(userData.logoUrl) : ''
  };

  const htmlContent = generateStaticHTML(processedUserData);

  const files: TemplateFiles = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Portfolio of ${userData.name} - ${userData.profession}">
    <title>${userData.name} - Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <script>
      tailwind.config = {
        darkMode: 'class',
        theme: {
          extend: {
            colors: {
              purple: {
                50: '#f5f3ff',
                100: '#ede9fe',
                500: '#8b5cf6',
                600: '#7c3aed',
                900: '#4c1d95'
              }
            }
          }
        }
      }
    </script>
</head>
<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    ${htmlContent}
    <script>
      // Dark mode toggle
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }

      // Add smooth scroll behavior
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
          });
        });
      });
    </script>
</body>
</html>`,
    'styles.css': `
/* Base styles */
:root {
  --primary: #8b5cf6;
  --primary-dark: #7c3aed;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  margin: 0;
  padding: 0;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply animations */
header {
  animation: fadeIn 0.8s ease-out;
}

section {
  animation: slideIn 0.6s ease-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  body {
    background-color: #111827;
    color: #f3f4f6;
  }
}

/* Custom components */
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-dark);
}

/* Image styles */
img {
  max-width: 100%;
  height: auto;
}

/* Card hover effects */
.project-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
`,
    'README.md': `# ${userData.name}'s Portfolio


`
  };

  return files;
}