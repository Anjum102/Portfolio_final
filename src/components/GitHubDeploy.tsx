import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import { UserData } from '../types/portfolio';
import { deployToGitHub } from '../lib/github';

interface GitHubDeployProps {
  userData: UserData;
  templateId: string;
}

export function GitHubDeploy({ userData, templateId }: GitHubDeployProps) {
  const [accessToken, setAccessToken] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedUrl, setDeployedUrl] = useState('');
  const [error, setError] = useState('');

  const handleDeploy = async () => {
    if (!accessToken) {
      setError('Please enter your GitHub access token');
      return;
    }

    setIsDeploying(true);
    setError('');

    try {
      const url = await deployToGitHub(userData, templateId, accessToken);
      setDeployedUrl(url);
    } catch (err) {
      setError('Failed to deploy to GitHub. Please check your access token and try again.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Github className="w-5 h-5" />
        Deploy to GitHub Pages
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            GitHub Access Token
          </label>
          <input
            type="password"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your GitHub access token"
          />
          <p className="mt-1 text-sm text-gray-500">
            Need a token?{' '}
            <a
              href="https://github.com/settings/tokens/new"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Generate one here
            </a>
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        {deployedUrl && (
          <div className="p-4 bg-green-50 rounded-md">
            <p className="text-green-800">
              Successfully deployed! View your portfolio at:{' '}
              <a
                href={deployedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline"
              >
                {deployedUrl}
              </a>
            </p>
          </div>
        )}

        <motion.button
          onClick={handleDeploy}
          disabled={isDeploying}
          className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors ${
            isDeploying ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Github className="w-5 h-5" />
          {isDeploying ? 'Deploying...' : 'Deploy to GitHub Pages'}
        </motion.button>
      </div>
    </div>
  );
}