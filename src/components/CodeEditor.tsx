import React, { useState } from 'react';
import { Play, Copy, Check } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulate code execution
    setTimeout(() => {
      setOutput('Hello, World!\nPython version 3.9.0\nCode executed successfully!');
      setIsRunning(false);
    }, 1500);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for Python
  const highlightCode = (code: string) => {
    return code
      .replace(/(def|class|if|else|elif|for|while|try|except|import|from|return|print)/g, 
        '<span class="text-purple-300">$1</span>')
      .replace(/(".*?")/g, '<span class="text-green-300">$1</span>')
      .replace(/(#.*$)/gm, '<span class="text-gray-400">$1</span>')
      .replace(/(\d+)/g, '<span class="text-yellow-300">$1</span>');
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {/* Editor Header */}
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300 text-sm font-mono">{language}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="text-gray-300 hover:text-white transition-colors p-1"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1 disabled:opacity-50"
          >
            <Play className="w-3 h-3" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>
      
      {/* Code Content */}
      <div className="p-4">
        <pre className="text-gray-100 font-mono text-sm leading-relaxed">
          <code 
            dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          />
        </pre>
      </div>
      
      {/* Output Panel */}
      {(output || isRunning) && (
        <div className="border-t border-gray-700 bg-gray-800 p-4">
          <div className="text-gray-300 text-sm font-medium mb-2">Output:</div>
          {isRunning ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
              <span className="text-gray-400 text-sm">Executing code...</span>
            </div>
          ) : (
            <pre className="text-gray-100 font-mono text-sm whitespace-pre-wrap">{output}</pre>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;