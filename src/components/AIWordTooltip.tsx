import React, { useState } from 'react';
import { Brain, BookOpen, ExternalLink } from 'lucide-react';

interface AIWordTooltipProps {
  word: string;
  children: React.ReactNode;
  definition: string;
  context: string;
}

const AIWordTooltip: React.FC<AIWordTooltipProps> = ({ word, children, definition, context }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <span
        className="text-blue-600 hover:text-blue-800 cursor-pointer underline decoration-dotted underline-offset-2 transition-colors"
        onClick={() => setIsVisible(!isVisible)}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>
      
      {isVisible && (
        <div className="absolute z-50 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 -top-2 left-0 transform -translate-y-full">
          <div className="flex items-center space-x-2 mb-3">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="font-semibold text-gray-900">{word}</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
              AI Definition
            </span>
          </div>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Definition:</h4>
              <p className="text-sm text-gray-600">{definition}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Context:</h4>
              <p className="text-sm text-gray-600">{context}</p>
            </div>
            
            <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
              <button className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 transition-colors">
                <BookOpen className="w-3 h-3" />
                <span>Learn More</span>
              </button>
              <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 transition-colors">
                <ExternalLink className="w-3 h-3" />
                <span>External Resources</span>
              </button>
            </div>
          </div>
          
          {/* Arrow */}
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
        </div>
      )}
    </div>
  );
};

export default AIWordTooltip;