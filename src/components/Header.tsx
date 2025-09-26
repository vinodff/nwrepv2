import React, { useState } from 'react';
import { ChevronDown, Brain, CreditCard, HelpCircle, BookOpen } from 'lucide-react';
import ProgressBar from './ProgressBar';
import ContentAggregator from './ContentAggregator';

const Header: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState('Python');
  const [showTopicMenu, setShowTopicMenu] = useState(false);
  
  const topics = ['Python', 'JavaScript', 'React', 'Machine Learning', 'Data Science'];
  const progress = 70;

  const aiActions = [
    { name: 'Summarize', icon: Brain, color: 'bg-purple-600 hover:bg-purple-700' },
    { name: 'Flashcards', icon: CreditCard, color: 'bg-green-600 hover:bg-green-700' },
    { name: 'Quiz', icon: HelpCircle, color: 'bg-orange-600 hover:bg-orange-700' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* App Name */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">EduFlow</h1>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Aggregated Notes
              </span>
            </div>
          </div>

          {/* Topic Selector */}
          <div className="relative">
            <button
              onClick={() => setShowTopicMenu(!showTopicMenu)}
              className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-700">Topic: {currentTopic}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            {showTopicMenu && (
              <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      setCurrentTopic(topic);
                      setShowTopicMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Action Buttons */}
          <div className="flex items-center space-x-3">
            <ContentAggregator />
            {aiActions.map((action) => (
              <button
                key={action.name}
                className={`${action.color} text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm font-medium`}
              >
                <action.icon className="w-4 h-4" />
                <span>{action.name}</span>
              </button>
            ))}
          </div>

          {/* Progress */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600">Progress: {progress}%</span>
            <ProgressBar progress={progress} className="w-24" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;