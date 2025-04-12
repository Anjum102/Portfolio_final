import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  currentImage?: string;
  label?: string;
  className?: string;
}

export function ImageUpload({ 
  onImageUpload, 
  currentImage, 
  label = "Profile Picture",
  className = "w-32 h-32"
}: ImageUploadProps) {
  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-gray-300">{label}</span>
      <div className="flex items-center justify-center w-full">
        <label className={`flex flex-col items-center justify-center ${label === "Logo" ? "w-32 h-32" : "w-full h-64"} border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors`}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {currentImage ? (
              <img
                src={currentImage}
                alt={label}
                className={`${className} ${label === "Logo" ? "" : "rounded-full"} object-cover mb-4`}
              />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 mb-4" />
            )}
            <p className="mb-2 text-sm text-gray-300">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-400">PNG, JPG or GIF</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>
  );
}