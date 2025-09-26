import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  FileText, 
  Image, 
  Code, 
  Youtube, 
  Link, 
  Upload, 
  Search, 
  Sparkles,
  FileImage,
  BookOpen,
  Mic,
  Calendar,
  Calculator,
  Globe
} from 'lucide-react';

interface FloatingAddMenuProps {
  onAddContent: (type: string, data: any) => void;
}

const FloatingAddMenu: React.FC<FloatingAddMenuProps> = ({ onAddContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState<string | null>(null);

  const contentOptions = [
    {
      category: 'Documents',
      items: [
        {
          id: 'pdf',
          name: 'PDF Pages',
          description: 'Import specific pages from PDFs',
          icon: FileText,
          color: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
        },
        {
          id: 'doc',
          name: 'Document',
          description: 'Add Word docs, text files',
          icon: BookOpen,
          color: 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
        }
      ]
    },
    {
      category: 'Images',
      items: [
        {
          id: 'image-upload',
          name: 'Upload Image',
          description: 'Add your own images',
          icon: Upload,
          color: 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
        },
        {
          id: 'image-search',
          name: 'Google Images',
          description: 'Search and add images',
          icon: Search,
          color: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200'
        },
        {
          id: 'image-ai',
          name: 'AI Generated',
          description: 'Create custom visuals',
          icon: Sparkles,
          color: 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
        },
        {
          id: 'screenshot',
          name: 'Screenshot',
          description: 'Capture screen content',
          icon: FileImage,
          color: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
        }
      ]
    },
    {
      category: 'Media',
      items: [
        {
          id: 'video-youtube',
          name: 'YouTube Video',
          description: 'Embed educational videos',
          icon: Youtube,
          color: 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
        },
        {
          id: 'video-upload',
          name: 'Upload Video',
          description: 'Add your own videos',
          icon: Upload,
          color: 'bg-pink-50 hover:bg-pink-100 text-pink-700 border-pink-200'
        },
        {
          id: 'audio',
          name: 'Audio Recording',
          description: 'Record or upload audio',
          icon: Mic,
          color: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border-yellow-200'
        }
      ]
    },
    {
      category: 'Interactive',
      items: [
        {
          id: 'code',
          name: 'Code Editor',
          description: 'Add executable code blocks',
          icon: Code,
          color: 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
        },
        {
          id: 'calculator',
          name: 'Calculator',
          description: 'Interactive math tool',
          icon: Calculator,
          color: 'bg-teal-50 hover:bg-teal-100 text-teal-700 border-teal-200'
        },
        {
          id: 'calendar',
          name: 'Calendar',
          description: 'Schedule and deadlines',
          icon: Calendar,
          color: 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border-cyan-200'
        }
      ]
    },
    {
      category: 'Links & References',
      items: [
        {
          id: 'link',
          name: 'Web Link',
          description: 'Add external resources',
          icon: Link,
          color: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
        },
        {
          id: 'website',
          name: 'Website Embed',
          description: 'Embed interactive sites',
          icon: Globe,
          color: 'bg-violet-50 hover:bg-violet-100 text-violet-700 border-violet-200'
        }
      ]
    }
  ];

  const handleOptionClick = (optionId: string) => {
    setIsOpen(false);
    setShowModal(optionId);
  };

  const handleModalSubmit = (type: string, data: any) => {
    onAddContent(type, data);
    setShowModal(null);
  };

  const renderModal = () => {
    if (!showModal) return null;

    const modalContent = {
      'pdf': <PDFModal onSubmit={(data) => handleModalSubmit('pdf', data)} onClose={() => setShowModal(null)} />,
      'doc': <DocumentModal onSubmit={(data) => handleModalSubmit('doc', data)} onClose={() => setShowModal(null)} />,
      'image-upload': <ImageUploadModal onSubmit={(data) => handleModalSubmit('image-upload', data)} onClose={() => setShowModal(null)} />,
      'image-search': <ImageSearchModal onSubmit={(data) => handleModalSubmit('image-search', data)} onClose={() => setShowModal(null)} />,
      'image-ai': <AIImageModal onSubmit={(data) => handleModalSubmit('image-ai', data)} onClose={() => setShowModal(null)} />,
      'screenshot': <ScreenshotModal onSubmit={(data) => handleModalSubmit('screenshot', data)} onClose={() => setShowModal(null)} />,
      'video-youtube': <YouTubeModal onSubmit={(data) => handleModalSubmit('video-youtube', data)} onClose={() => setShowModal(null)} />,
      'video-upload': <VideoUploadModal onSubmit={(data) => handleModalSubmit('video-upload', data)} onClose={() => setShowModal(null)} />,
      'audio': <AudioModal onSubmit={(data) => handleModalSubmit('audio', data)} onClose={() => setShowModal(null)} />,
      'code': <CodeModal onSubmit={(data) => handleModalSubmit('code', data)} onClose={() => setShowModal(null)} />,
      'calculator': <CalculatorModal onSubmit={(data) => handleModalSubmit('calculator', data)} onClose={() => setShowModal(null)} />,
      'calendar': <CalendarModal onSubmit={(data) => handleModalSubmit('calendar', data)} onClose={() => setShowModal(null)} />,
      'link': <LinkModal onSubmit={(data) => handleModalSubmit('link', data)} onClose={() => setShowModal(null)} />,
      'website': <WebsiteModal onSubmit={(data) => handleModalSubmit('website', data)} onClose={() => setShowModal(null)} />
    };

    return modalContent[showModal as keyof typeof modalContent];
  };

  return (
    <>
      {/* Floating Plus Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plus className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Content Menu */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-h-[70vh] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
            <h3 className="font-semibold text-lg">Add Content</h3>
            <p className="text-blue-100 text-sm">Choose what to add to your notes</p>
          </div>

          {/* Content Options */}
          <div className="max-h-96 overflow-y-auto">
            {contentOptions.map((category, categoryIndex) => (
              <div key={categoryIndex} className="p-4 border-b border-gray-100 last:border-b-0">
                <h4 className="font-medium text-gray-900 mb-3 text-sm uppercase tracking-wide">
                  {category.category}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {category.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleOptionClick(item.id)}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${item.color}`}
                    >
                      <div className="flex-shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs opacity-75 mt-0.5">{item.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-3 text-center">
            <p className="text-xs text-gray-500">
              💡 Mix different content types for comprehensive notes
            </p>
          </div>
        </div>
      )}

      {/* Modals */}
      {renderModal()}
    </>
  );
};

// Modal Components
const PDFModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit({
        file,
        pages: pages || 'all',
        name: file.name
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-lg font-semibold mb-4">Add PDF Pages</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select PDF File
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pages (optional)
            </label>
            <input
              type="text"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              placeholder="e.g., 1-5, 10, 15-20 or leave blank for all"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add PDF
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DocumentModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit({
        file,
        name: file.name,
        type: file.type
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-lg font-semibold mb-4">Add Document</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Document
            </label>
            <input
              type="file"
              accept=".doc,.docx,.txt,.rtf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ImageUploadModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit({
        file,
        name: file.name,
        preview
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-lg font-semibold mb-4">Upload Image</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {preview && (
            <div className="mb-4">
              <img src={preview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
            </div>
          )}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ImageSearchModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate search with stock photos
    setTimeout(() => {
      const mockResults = [
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400'
      ];
      setResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected) {
      onSubmit({
        url: selected,
        query,
        source: 'Google Images'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-[500px] max-w-[90vw] max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Search Images</h3>
        <div className="mb-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for images..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
        
        {results.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              {results.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setSelected(url)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    selected === url ? 'border-orange-500' : 'border-gray-200'
                  }`}
                >
                  <img src={url} alt={`Result ${index + 1}`} className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            Add Selected Image
          </button>
        </div>
      </div>
    </div>
  );
};

const AIImageModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('diagram');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const styles = [
    { id: 'diagram', name: 'Technical Diagram' },
    { id: 'illustration', name: 'Illustration' },
    { id: 'infographic', name: 'Infographic' },
    { id: 'flowchart', name: 'Flowchart' }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const mockImage = 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800';
      setGeneratedImage(mockImage);
      setIsGenerating(false);
    }, 3000);
  };

  const handleSubmit = () => {
    if (generatedImage) {
      onSubmit({
        url: generatedImage,
        prompt,
        style,
        source: 'AI Generated'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-[500px] max-w-[90vw] max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Generate AI Image</h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe what you want to visualize:
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A diagram showing how Python functions work"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Style:</label>
          <div className="grid grid-cols-2 gap-2">
            {styles.map((styleOption) => (
              <button
                key={styleOption.id}
                onClick={() => setStyle(styleOption.id)}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  style === styleOption.id
                    ? 'border-purple-500 bg-purple-50 text-purple-900'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {styleOption.name}
              </button>
            ))}
          </div>
        </div>

        {!generatedImage && (
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full mb-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            {isGenerating ? 'Generating...' : 'Generate Image'}
          </button>
        )}

        {isGenerating && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
            <p className="text-purple-600 font-medium">Creating your visualization...</p>
          </div>
        )}

        {generatedImage && (
          <div className="mb-4">
            <img src={generatedImage} alt="Generated" className="w-full h-48 object-cover rounded-lg" />
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          {generatedImage && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Add Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ScreenshotModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    setIsCapturing(true);
    try {
      // Simulate screen capture
      setTimeout(() => {
        const mockScreenshot = 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800';
        onSubmit({
          url: mockScreenshot,
          source: 'Screenshot',
          timestamp: new Date().toISOString()
        });
        setIsCapturing(false);
      }, 2000);
    } catch (error) {
      console.error('Screenshot failed:', error);
      setIsCapturing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-lg font-semibold mb-4">Capture Screenshot</h3>
        <p className="text-gray-600 mb-4">
          Click the button below to capture your screen. You'll be able to select the area to capture.
        </p>
        
        {isCapturing && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg text-center">
            <div className="animate-pulse text-indigo-600 font-medium">Capturing screen...</div>
          </div>
        )}
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleCapture}
            disabled={isCapturing}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {isCapturing ? 'Capturing...' : 'Capture Screen'}
          </button>
        </div>
      </div>
    </div>
  );
};

const YouTubeModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onSubmit({
        url,
        source: 'YouTube',
        title: 'YouTube Video'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-lg font-semibold mb-4">Add YouTube Video</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Add Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const VideoUploadModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onSubmit({
        file,
        name: file.name,
        source: 'Upload'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-lg font-semibold mb-4">Upload Video</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Video File
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
            >
              Upload Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AudioModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // Simulate recording timer
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // Auto-stop after 10 seconds for demo
    setTimeout(() => {
      setIsRecording(false);
      clearInterval(timer);
      // Create mock audio file
      const mockAudio = new File([''], 'recording.mp3', { type: 'audio/mp3' });
      setFile(mockAudio);
    }, 10000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Create mock audio file
    const mockAudio = new File([''], 'recording.mp3', { type: 'audio/mp3' });
    setFile(mockAudio);
  };

  const handleSubmit = () => {
    if (file) {
      onSubmit({
        file,
        name: file.name,
        duration: recordingTime,
        source: 'Recording'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-lg font-semibold mb-4">Audio Recording</h3>
        
        <div className="text-center mb-4">
          {isRecording ? (
            <div>
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <p className="text-red-600 font-medium">Recording... {recordingTime}s</p>
              <button
                onClick={stopRecording}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Stop Recording
              </button>
            </div>
          ) : file ? (
            <div>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <p className="text-green-600 font-medium">Recording Complete ({recordingTime}s)</p>
            </div>
          ) : (
            <div>
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
                <Mic className="w-8 h-8 text-gray-600" />
              </div>
              <button
                onClick={startRecording}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
              >
                Start Recording
              </button>
            </div>
          )}
        </div>

        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or upload audio file:
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!file}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
          >
            Add Audio
          </button>
        </div>
      </div>
    </div>
  );
};

const CodeModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [title, setTitle] = useState('');

  const languages = [
    { id: 'python', name: 'Python' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'java', name: 'Java' },
    { id: 'cpp', name: 'C++' },
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmit({
        code,
        language,
        title: title || `${language} code`,
        source: 'Code Editor'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-[600px] max-w-[90vw] max-h-[80vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Add Code Block</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Hello World Example"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Code
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter your code here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 font-mono text-sm"
              rows={10}
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Add Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CalculatorModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const handleSubmit = () => {
    onSubmit({
      type: 'calculator',
      title: 'Interactive Calculator',
      source: 'Calculator Widget'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-lg font-semibold mb-4">Add Calculator</h3>
        <p className="text-gray-600 mb-4">
          Add an interactive calculator widget to your notes for quick mathematical calculations.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
          >
            Add Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

const CalendarModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const handleSubmit = () => {
    onSubmit({
      type: 'calendar',
      title: 'Study Calendar',
      source: 'Calendar Widget'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-lg font-semibold mb-4">Add Calendar</h3>
        <p className="text-gray-600 mb-4">
          Add a calendar widget to track study schedules, deadlines, and important dates.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
          >
            Add Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

const LinkModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onSubmit({
        url,
        title: title || url,
        source: 'Web Link'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-lg font-semibold mb-4">Add Web Link</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Link title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Add Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const WebsiteModal: React.FC<{ onSubmit: (data: any) => void; onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      onSubmit({
        url,
        title: title || url,
        source: 'Website Embed'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
      <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
        <h3 className="text-lg font-semibold mb-4">Embed Website</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title (optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Website title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
            >
              Embed Website
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FloatingAddMenu;