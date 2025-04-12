import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { SocialLinks as SocialLinksType } from '../types/portfolio';

interface SocialLinksProps {
  socialLinks: SocialLinksType;
  onUpdate: (links: SocialLinksType) => void;
}

export function SocialLinks({ socialLinks, onUpdate }: SocialLinksProps) {
  return (
    <div className="space-y-4 relative p-6 rounded-lg bg-gray-800 shadow-lg border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">Social Links</h3>
      
      <div className="grid gap-4">
        <div className="flex items-center space-x-3">
          <Github className="w-6 h-6 text-indigo-400" />
          <input
            type="text"
            placeholder="GitHub Username"
            value={socialLinks.github}
            onChange={(e) => onUpdate({ ...socialLinks, github: e.target.value })}
            className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Linkedin className="w-6 h-6 text-indigo-400" />
          <input
            type="text"
            placeholder="LinkedIn Username"
            value={socialLinks.linkedin}
            onChange={(e) => onUpdate({ ...socialLinks, linkedin: e.target.value })}
            className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Twitter className="w-6 h-6 text-indigo-400" />
          <input
            type="text"
            placeholder="Twitter Username"
            value={socialLinks.twitter}
            onChange={(e) => onUpdate({ ...socialLinks, twitter: e.target.value })}
            className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <Mail className="w-6 h-6 text-indigo-400" />
          <input
            type="email"
            placeholder="Email Address"
            value={socialLinks.email}
            onChange={(e) => onUpdate({ ...socialLinks, email: e.target.value })}
            className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}