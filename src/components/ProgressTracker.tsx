import React from 'react';
import { TrendingUp, Target, Clock, Award, BookOpen, Code, Video, FileText } from 'lucide-react';

const ProgressTracker: React.FC = () => {
  const overallProgress = 68;
  const weeklyGoal = 80;
  const studyStreak = 7;
  
  const topicProgress = [
    { name: 'Variables & Data Types', progress: 100, icon: Code, color: 'bg-green-500' },
    { name: 'Functions', progress: 85, icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Control Structures', progress: 70, icon: Target, color: 'bg-yellow-500' },
    { name: 'Object-Oriented Programming', progress: 45, icon: Award, color: 'bg-purple-500' },
    { name: 'File Handling', progress: 20, icon: FileText, color: 'bg-red-500' }
  ];

  const weeklyActivity = [
    { day: 'Mon', minutes: 45, content: 3 },
    { day: 'Tue', minutes: 60, content: 5 },
    { day: 'Wed', minutes: 30, content: 2 },
    { day: 'Thu', minutes: 75, content: 4 },
    { day: 'Fri', minutes: 90, content: 6 },
    { day: 'Sat', minutes: 40, content: 3 },
    { day: 'Sun', minutes: 55, content: 4 }
  ];

  const contentStats = [
    { type: 'Videos Watched', count: 12, icon: Video, color: 'text-red-600' },
    { type: 'Code Blocks Run', count: 28, icon: Code, color: 'text-green-600' },
    { type: 'PDF Pages Read', count: 45, icon: FileText, color: 'text-blue-600' },
    { type: 'AI Definitions', count: 67, icon: BookOpen, color: 'text-purple-600' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Learning Progress</h3>
            <p className="text-sm text-gray-500">Track your Python mastery</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
          <div className="text-sm text-gray-500">Overall Progress</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{studyStreak}</div>
          <div className="text-sm text-green-700">Day Streak</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{weeklyGoal}%</div>
          <div className="text-sm text-blue-700">Weekly Goal</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">4.2h</div>
          <div className="text-sm text-purple-700">This Week</div>
        </div>
      </div>

      {/* Topic Progress */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Topic Mastery</h4>
        <div className="space-y-3">
          {topicProgress.map((topic, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${topic.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <topic.icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{topic.name}</span>
                  <span className="text-sm text-gray-500">{topic.progress}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className={`${topic.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Weekly Activity</h4>
        <div className="flex items-end justify-between space-x-2 h-24">
          {weeklyActivity.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="bg-blue-500 rounded-t w-full transition-all duration-300 hover:bg-blue-600"
                style={{ height: `${(day.minutes / 90) * 100}%`, minHeight: '4px' }}
                title={`${day.minutes} minutes, ${day.content} content pieces`}
              />
              <div className="text-xs text-gray-500 mt-2">{day.day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Statistics */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Content Engagement</h4>
        <div className="grid grid-cols-2 gap-3">
          {contentStats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <div className="font-semibold text-gray-900">{stat.count}</div>
                <div className="text-xs text-gray-500">{stat.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;