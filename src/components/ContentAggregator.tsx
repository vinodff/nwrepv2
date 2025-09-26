import React, { useState } from 'react';
import { Plus, FileText, Youtube, Image, Code, Search, Sparkles, Upload } from 'lucide-react';

const ContentAggregator: React.FC = () => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const contentTypes = [
    {
      type: 'pdf',
      name: 'PDF Pages',
      description: 'Import specific pages from documents',
      icon: FileText,
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
    },
    {
      type: 'video',
      name: 'YouTube Video',
      description: 'Embed educational videos',
      icon: Youtube,
      color: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
    },
    {
      type: 'image-upload',
      name: 'Upload Image',
      description: 'Add your own images',
      icon: Upload,
      color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
    },
    {
      type: 'image-search',
      name: 'Search Images',
      description: 'Find images via Google search',
      icon: Search,
      color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200'
    },
    {
      type: 'image-ai',
      name: 'AI Image',
      description: 'Generate concept explanations',
      icon: Sparkles,
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
    },
    {
      type: 'code',
      name: 'Code Block',
      description: 'Add executable code examples',
      icon: Code,
      color: 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowAddMenu(!showAddMenu)}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
      >
        <Plus className="w-4 h-4" />
        <span>Add Content</span>
      </button>

      {showAddMenu && (
        <div className="absolute top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Add to Your Notes</h3>
            <p className="text-sm text-gray-500">Choose content type to aggregate</p>
          </div>
          
          <div className="py-2">
            {contentTypes.map((item) => (
              <button
                key={item.type}
                onClick={() => setShowAddMenu(false)}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-lg border ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-600">
              💡 Tip: Mix different content types to create comprehensive study guides
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentAggregator;