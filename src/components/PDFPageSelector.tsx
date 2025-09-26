import React, { useState } from 'react';
import { FileText, ChevronLeft, ChevronRight, Plus, Check } from 'lucide-react';

interface PDFPageSelectorProps {
  pdfName: string;
  totalPages: number;
  onPagesSelected: (pages: number[]) => void;
}

const PDFPageSelector: React.FC<PDFPageSelectorProps> = ({ pdfName, totalPages, onPagesSelected }) => {
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const togglePage = (pageNum: number) => {
    const newSelected = selectedPages.includes(pageNum)
      ? selectedPages.filter(p => p !== pageNum)
      : [...selectedPages, pageNum];
    setSelectedPages(newSelected);
    onPagesSelected(newSelected);
  };

  const selectRange = (start: number, end: number) => {
    const range = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const newSelected = [...new Set([...selectedPages, ...range])];
    setSelectedPages(newSelected);
    onPagesSelected(newSelected);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FileText className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="font-semibold text-gray-900">{pdfName}</h3>
            <p className="text-sm text-gray-500">{totalPages} pages total</p>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {selectedPages.length} pages selected
        </div>
      </div>

      {/* Page Preview */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="bg-white border border-gray-200 rounded h-48 flex items-center justify-center">
          <div className="text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Page {currentPage} Preview</p>
            <p className="text-xs text-gray-400 mt-1">Python Functions & Variables</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => togglePage(currentPage)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedPages.includes(currentPage)
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {selectedPages.includes(currentPage) ? (
              <Check className="w-3 h-3" />
            ) : (
              <Plus className="w-3 h-3" />
            )}
            <span>
              {selectedPages.includes(currentPage) ? 'Selected' : 'Select Page'}
            </span>
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => selectRange(1, 5)}
              className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded"
            >
              Select 1-5
            </button>
            <button
              onClick={() => selectRange(currentPage, Math.min(totalPages, currentPage + 2))}
              className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 rounded"
            >
              Select Next 3
            </button>
          </div>
        </div>
      </div>

      {/* Selected Pages Summary */}
      {selectedPages.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Selected Pages:</h4>
          <div className="flex flex-wrap gap-1">
            {selectedPages.sort((a, b) => a - b).map(page => (
              <span
                key={page}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
              >
                {page}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFPageSelector;