import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePortfolioZip(templateId: string, userData: any) {
  // Implementation for generating ZIP file with selected template and user data
  // This will be implemented when we add the download functionality
}