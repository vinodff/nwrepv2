import React, { useState } from 'react';
import { Sparkles, Download, RefreshCw, Wand2 } from 'lucide-react';

interface AIImageGeneratorProps {
  concept: string;
  onImageGenerated: (imageUrl: string) => void;
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ concept, onImageGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState(`Explain the concept of ${concept} visually`);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageStyle, setImageStyle] = useState('diagram');

  const styles = [
    { id: 'diagram', name: 'Technical Diagram', description: 'Clean, educational diagrams' },
    { id: 'illustration', name: 'Illustration', description: 'Colorful, engaging illustrations' },
    { id: 'infographic', name: 'Infographic', description: 'Data-rich visual explanations' },
    { id: 'flowchart', name: 'Flowchart', description: 'Process and logic flows' }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI image generation
    setTimeout(() => {
      // Using a relevant stock photo as placeholder for AI-generated content
      const imageUrl = 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800';
      setGeneratedImage(imageUrl);
      setIsGenerating(false);
      onImageGenerated(imageUrl);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">AI Image Generator</h3>
          <p className="text-sm text-gray-500">Create custom concept visualizations</p>
        </div>
      </div>

      {/* Prompt Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe what you want to visualize:
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows={3}
          placeholder="e.g., A diagram showing how Python functions work with parameters and return values"
        />
      </div>

      {/* Style Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Style:</label>
        <div className="grid grid-cols-2 gap-2">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setImageStyle(style.id)}
              className={`p-3 text-left rounded-lg border transition-colors ${
                imageStyle === style.id
                  ? 'border-purple-500 bg-purple-50 text-purple-900'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{style.name}</div>
              <div className="text-xs text-gray-500 mt-1">{style.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Generating Image...</span>
          </>
        ) : (
          <>
            <Wand2 className="w-4 h-4" />
            <span>Generate Image</span>
          </>
        )}
      </button>

      {/* Generated Image */}
      {generatedImage && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Generated Image:</span>
            <div className="flex space-x-2">
              <button
                onClick={handleGenerate}
                className="text-purple-600 hover:text-purple-800 p-1"
                title="Regenerate"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                className="text-gray-600 hover:text-gray-800 p-1"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <img
            src={generatedImage}
            alt="AI generated concept visualization"
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-gray-500">AI-generated • {imageStyle} style</span>
            <button
              onClick={() => onImageGenerated(generatedImage)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
            >
              Add to Notes
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="mt-4 p-8 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-purple-600">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span className="font-medium">Creating your visualization...</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Our AI is analyzing "{concept}" and generating a custom image
            </p>
            <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-purple-600 h-full rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIImageGenerator;