import React from 'react';

interface ContentBlockProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="prose prose-gray max-w-none">
        {children}
      </div>
    </div>
  );
};

export default ContentBlock;