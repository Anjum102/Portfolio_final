import JSZip from 'jszip';
import { UserData } from '../types/portfolio';
import { generateTemplateFiles } from './templateGenerator';

export async function generatePortfolioZip(
  userData: UserData,
  templateId: string
): Promise<Blob> {
  try {
    // Generate template files
    const files = await generateTemplateFiles(userData, templateId);
    const zip = new JSZip();
    
    // Create a folder with the user's name
    const folderName = userData.name.toLowerCase().replace(/\s+/g, '-') + '-portfolio';
    const rootFolder = zip.folder(folderName);
    
    if (!rootFolder) {
      throw new Error('Failed to create root folder in ZIP');
    }

    // Add files to zip
    Object.entries(files).forEach(([path, content]) => {
      rootFolder.file(path, content);
    });

    // Add assets folder if there are any images
    if (userData.imageUrl || userData.logoUrl) {
      const assetsFolder = rootFolder.folder('assets');
      if (assetsFolder) {
        if (userData.imageUrl && userData.imageUrl.startsWith('data:image')) {
          const imageData = userData.imageUrl.split(',')[1];
          assetsFolder.file('profile.' + getImageExtension(userData.imageUrl), imageData, {base64: true});
        }
        if (userData.logoUrl && userData.logoUrl.startsWith('data:image')) {
          const logoData = userData.logoUrl.split(',')[1];
          assetsFolder.file('logo.' + getImageExtension(userData.logoUrl), logoData, {base64: true});
        }
      }
    }

    // Generate zip file with compression
    return await zip.generateAsync({ 
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9
      }
    });
  } catch (error) {
    console.error('Error generating portfolio zip:', error);
    throw new Error('Failed to generate portfolio zip');
  }
}

export function downloadZip(blob: Blob, fileName: string) {
  try {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Error downloading zip:', error);
    throw new Error('Failed to download portfolio zip');
  }
}

function getImageExtension(dataUrl: string): string {
  const match = dataUrl.match(/data:image\/(\w+);/);
  return match ? match[1] : 'png';
}