import React, { useState } from 'react';
import { Play, Pause, Volume2, Maximize2, FileText, Image, Code, MessageSquare } from 'lucide-react';

interface MediaBlockProps {
  type: 'video' | 'pdf' | 'image' | 'code';
  title: string;
  content: any;
  className?: string;
}

const MediaBlock: React.FC<MediaBlockProps> = ({ type, title, content, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'video': return <Play className="w-5 h-5" />;
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      case 'code': return <Code className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'video': return 'bg-red-50 text-red-700 border-red-200';
      case 'pdf': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'image': return 'bg-green-50 text-green-700 border-green-200';
      case 'code': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg border ${getTypeColor()}`}>
            {getIcon()}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{title}</h4>
            <p className="text-sm text-gray-500 capitalize">{type} content</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {type === 'video' && (
          <div className="relative bg-black rounded-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between text-white">
                <span className="text-sm">Python Functions Explained</span>
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <div className="w-16 h-1 bg-white/30 rounded-full">
                    <div className="w-12 h-full bg-white rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'pdf' && (
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Python Basics - Chapter 3</p>
              <p className="text-sm text-gray-500 mt-1">Pages 45-52 imported</p>
              <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                View Pages
              </button>
            </div>
          </div>
        )}

        {type === 'image' && (
          <div className="space-y-3">
            <img
              src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Python concept visualization"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">AI-generated concept diagram</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                AI Generated
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaBlock;