import React from 'react';
import * as SimpleIcons from 'simple-icons';

const iconMap: { [key: string]: string } = {
  'javascript': 'siJavascript',
  'typescript': 'siTypescript',
  'react': 'siReact',
  'vue': 'siVuedotjs',
  'angular': 'siAngular',
  'node': 'siNodedotjs',
  'python': 'siPython',
  'java': 'siJava',
  'c++': 'siCplusplus',
  'rust': 'siRust',
  'go': 'siGo',
  'docker': 'siDocker',
  'kubernetes': 'siKubernetes',
  'aws': 'siAmazonaws',
  'azure': 'siMicrosoftazure',
  'gcp': 'siGooglecloud',
  'mongodb': 'siMongodb',
  'postgresql': 'siPostgresql',
  'mysql': 'siMysql',
  'redis': 'siRedis',
  'html': 'siHtml5',
  'css': 'siCss3',
  'sass': 'siSass',
  'tailwind': 'siTailwindcss',
  'git': 'siGit',
  'github': 'siGithub',
  'gitlab': 'siGitlab',
  'jenkins': 'siJenkins',
  'linux': 'siLinux',
  'webpack': 'siWebpack',
  'vite': 'siVite',
  'nextjs': 'siNextdotjs',
  'graphql': 'siGraphql',
  'firebase': 'siFirebase',
};

export function getSkillIcon(skill: string) {
  const normalizedSkill = skill.toLowerCase().replace(/[^a-z0-9]/g, '');
  const iconKey = Object.keys(iconMap).find(key => normalizedSkill.includes(key));
  
  if (iconKey) {
    const icon = SimpleIcons[iconMap[iconKey] as keyof typeof SimpleIcons];
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        className="w-12 h-12 fill-current"
        style={{ color: `#${icon.hex}` }}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  // Fallback icon for unknown skills
  return (
    <div className="w-12 h-12 rounded-full bg-cyan-900 flex items-center justify-center">
      <span className="text-2xl">{skill.charAt(0).toUpperCase()}</span>
    </div>
  );
}