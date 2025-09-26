import React, { useState } from 'react';
import { MessageSquare, Brain, TrendingUp, BookOpen, X, Send } from 'lucide-react';

const AILearningAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const suggestions = [
    {
      type: 'next-topic',
      title: 'Suggested Next Topic',
      content: 'Based on your progress, try "Python Data Structures" next',
      icon: TrendingUp,
      color: 'bg-green-50 text-green-700 border-green-200'
    },
    {
      type: 'practice',
      title: 'Practice Recommendation',
      content: 'You\'ve mastered functions! Try building a calculator project',
      icon: Brain,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      type: 'review',
      title: 'Review Suggestion',
      content: 'Review "Variables" - you had some difficulty there',
      icon: BookOpen,
      color: 'bg-orange-50 text-orange-700 border-orange-200'
    }
  ];

  const chatMessages = [
    {
      type: 'ai',
      content: 'Hi! I\'ve analyzed your learning progress. You\'re doing great with Python basics! Would you like me to suggest your next learning path?'
    },
    {
      type: 'user',
      content: 'Yes, what should I focus on next?'
    },
    {
      type: 'ai',
      content: 'Based on your strong grasp of functions, I recommend diving into Python data structures like lists and dictionaries. This will build perfectly on what you\'ve learned!'
    }
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-40"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* AI Suggestions Panel */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-900">AI Learning Assistant</span>
            </div>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
              Smart Suggestions
            </span>
          </div>
          
          <div className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className={`p-3 rounded-lg border ${suggestion.color}`}>
                <div className="flex items-start space-x-2">
                  <suggestion.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <p className="text-sm opacity-80 mt-1">{suggestion.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Chat with AI Assistant
          </button>
        </div>
      )}

      {/* Full Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-end p-6 z-50">
          <div className="bg-white rounded-lg shadow-2xl w-96 h-[600px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Learning Assistant</h3>
                  <p className="text-xs text-green-600">● Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about your learning path..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AILearningAssistant;