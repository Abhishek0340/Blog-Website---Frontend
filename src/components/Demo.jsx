import React, { useState, useRef, useEffect } from 'react';

const Demo = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSize, setFontSize] = useState('16px');
  const [textColor, setTextColor] = useState('#000000');
  const [alignment, setAlignment] = useState('left');
  const [currentFormat, setCurrentFormat] = useState('paragraph');
  const editorRef = useRef(null);

  // Font size options with labels
  const fontSizes = [
    { value: '12px', label: 'Small' },
    { value: '14px', label: 'Normal' },
    { value: '16px', label: 'Medium' },
    { value: '18px', label: 'Large' },
    { value: '24px', label: 'H3' },
    { value: '32px', label: 'H2' },
    { value: '40px', label: 'H1' },
    { value: '48px', label: 'Title' }
  ];

  // Detect current format on selection change
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const node = selection.getRangeAt(0).startContainer.parentNode;
        detectCurrentFormat(node);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const detectCurrentFormat = (node) => {
    const tagName = node.tagName ? node.tagName.toLowerCase() : '';
    const computedStyle = window.getComputedStyle(node);
    const fontSize = computedStyle.fontSize;
    
    // Detect based on font size
    if (fontSize === '40px') setCurrentFormat('h1');
    else if (fontSize === '32px') setCurrentFormat('h2');
    else if (fontSize === '24px') setCurrentFormat('h3');
    else if (tagName === 'blockquote') setCurrentFormat('blockquote');
    else if (tagName === 'pre') setCurrentFormat('code');
    else setCurrentFormat('paragraph');
  };

  // Formatting functions
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
    updateButtonStates();
  };

  const updateButtonStates = () => {
    setIsBold(document.queryCommandState('bold'));
    setIsItalic(document.queryCommandState('italic'));
    setIsUnderline(document.queryCommandState('underline'));
  };

  const handleContentChange = () => {
    setContent(editorRef.current.innerHTML);
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      formatText('insertImage', url);
    }
  };

  const createLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertList = (type) => {
    formatText(type === 'ordered' ? 'insertOrderedList' : 'insertUnorderedList');
  };

  const clearFormatting = () => {
    formatText('removeFormat');
    setCurrentFormat('paragraph');
    setFontSize('16px');
  };

  // Apply font size with proper formatting
  const applyFontSize = (size) => {
    setFontSize(size);
    
    // Use styleWithCSS for better compatibility
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('fontSize', false, '7'); // Reset to largest size
    
    // Apply custom font size using inline style
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
      document.execCommand('insertHTML', false, `<span style="font-size: ${size}">${selection.toString()}</span>`);
    } else {
      document.execCommand('fontSize', false, '3'); // Default size
      // For empty selection, we'll apply to the current block
      formatText('styleWithCSS', true);
      formatText('fontSize', '7');
    }
    
    editorRef.current.focus();
    
    // Update current format based on size
    if (size === '40px') setCurrentFormat('h1');
    else if (size === '32px') setCurrentFormat('h2');
    else if (size === '24px') setCurrentFormat('h3');
    else setCurrentFormat('paragraph');
  };

  const formatBlockquote = () => {
    formatText('formatBlock', '<blockquote>');
    setCurrentFormat('blockquote');
  };

  const insertCodeBlock = () => {
    const selection = window.getSelection();
    if (selection.toString().length === 0) {
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = '// Your code here';
      pre.appendChild(code);
      
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(pre);
      
      const newRange = document.createRange();
      newRange.setStart(code, 0);
      newRange.setEnd(code, code.textContent.length);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      formatText('formatBlock', '<pre>');
    }
    setCurrentFormat('code');
  };

  const handleSave = () => {
    const blogPost = {
      title,
      content,
      createdAt: new Date().toISOString(),
    };
    console.log('Saving blog post:', blogPost);
    alert('Blog post saved! Check console for details.');
  };

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      alert('Please add a title and content before publishing.');
      return;
    }
    const blogPost = {
      title,
      content,
      publishedAt: new Date().toISOString(),
      status: 'published',
    };
    console.log('Publishing blog post:', blogPost);
    alert('Blog post published! Check console for details.');
  };

  // Toolbar button classes
  const getToolbarButtonClass = (isActive = false) => {
    return `px-3 py-2 border rounded text-sm font-medium transition-colors duration-200 ${
      isActive 
        ? 'bg-blue-500 text-white border-blue-500' 
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
    }`;
  };

  const getActionButtonClass = (type = 'save') => {
    const baseClass = "px-6 py-2 rounded-lg font-semibold transition-colors duration-200";
    if (type === 'publish') {
      return `${baseClass} bg-blue-600 text-white hover:bg-blue-700`;
    }
    return `${baseClass} bg-gray-600 text-white hover:bg-gray-700`;
  };

  const getFontSizeButtonClass = (size) => {
    return `px-3 py-2 border rounded text-sm font-medium transition-colors duration-200 ${
      fontSize === size 
        ? 'bg-blue-500 text-white border-blue-500' 
        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 lg:mb-0">Blog Editor</h1>
          <div className="flex gap-3">
            <button 
              className={getActionButtonClass('save')}
              onClick={handleSave}
            >
              Save Draft
            </button>
            <button 
              className={getActionButtonClass('publish')}
              onClick={handlePublish}
            >
              Publish
            </button>
          </div>
        </header>

        {/* Editor Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          {/* Title Input */}
          <div className="mb-6">
            <input
              type="text"
              className="w-full px-4 py-4 text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
              placeholder="Enter blog title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Current Format Indicator */}
          <div className="flex items-center mb-4">
            <span className="text-xs text-gray-500 font-medium">Current format:</span>
            <span className="ml-2 px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
              {currentFormat === 'paragraph' ? 'Paragraph' : 
               currentFormat === 'h1' ? 'Heading 1 (40px)' :
               currentFormat === 'h2' ? 'Heading 2 (32px)' :
               currentFormat === 'h3' ? 'Heading 3 (24px)' :
               currentFormat === 'blockquote' ? 'Blockquote' :
               currentFormat === 'code' ? 'Code Block' : 'Paragraph'}
            </span>
            <span className="ml-4 text-xs text-gray-500 font-medium">
              Font Size: {fontSize}
            </span>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4">
            {/* Font Sizes - H1, H2, H3, etc */}
            <div className="flex items-center gap-1 pr-3 border-r border-gray-300">
              <span className="text-xs text-gray-500 font-medium mr-2">Text Size:</span>
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  className={getFontSizeButtonClass(size.value)}
                  onClick={() => applyFontSize(size.value)}
                  title={size.label}
                >
                  {size.label}
                </button>
              ))}
            </div>

            {/* Block Elements */}
            <div className="flex items-center gap-1 pr-3 border-r border-gray-300">
              <button
                className={getToolbarButtonClass(currentFormat === 'blockquote')}
                onClick={formatBlockquote}
                title="Blockquote"
              >
                ❝ Quote
              </button>
              <button
                className={getToolbarButtonClass(currentFormat === 'code')}
                onClick={insertCodeBlock}
                title="Code Block"
              >
                {`</> Code`}
              </button>
            </div>

            {/* Text Formatting */}
            <div className="flex items-center gap-1 pr-3 border-r border-gray-300">
              <button
                className={getToolbarButtonClass(isBold)}
                onClick={() => formatText('bold')}
                title="Bold"
              >
                <strong className="font-bold">B</strong>
              </button>
              <button
                className={getToolbarButtonClass(isItalic)}
                onClick={() => formatText('italic')}
                title="Italic"
              >
                <em className="italic">I</em>
              </button>
              <button
                className={getToolbarButtonClass(isUnderline)}
                onClick={() => formatText('underline')}
                title="Underline"
              >
                <u className="underline">U</u>
              </button>
            </div>

            {/* Text Color */}
            <div className="flex items-center gap-1 pr-3 border-r border-gray-300">
              <input
                type="color"
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  formatText('foreColor', e.target.value);
                }}
                title="Text Color"
              />
            </div>

            {/* Alignment */}
            <div className="flex items-center gap-1 pr-3 border-r border-gray-300">
              <button
                className={getToolbarButtonClass(alignment === 'left')}
                onClick={() => {
                  setAlignment('left');
                  formatText('justifyLeft');
                }}
                title="Align Left"
              >
                ⬅️
              </button>
              <button
                className={getToolbarButtonClass(alignment === 'center')}
                onClick={() => {
                  setAlignment('center');
                  formatText('justifyCenter');
                }}
                title="Align Center"
              >
                ⬜
              </button>
              <button
                className={getToolbarButtonClass(alignment === 'right')}
                onClick={() => {
                  setAlignment('right');
                  formatText('justifyRight');
                }}
                title="Align Right"
              >
                ➡️
              </button>
            </div>

            {/* Lists */}
            <div className="flex items-center gap-1 pr-3 border-r border-gray-300">
              <button
                className={getToolbarButtonClass()}
                onClick={() => insertList('unordered')}
                title="Bullet List"
              >
                • List
              </button>
              <button
                className={getToolbarButtonClass()}
                onClick={() => insertList('ordered')}
                title="Numbered List"
              >
                1. List
              </button>
            </div>

            {/* Media */}
            <div className="flex items-center gap-1 pr-3 border-r border-gray-300">
              <button
                className={getToolbarButtonClass()}
                onClick={insertImage}
                title="Insert Image"
              >
                🖼️ Image
              </button>
              <button
                className={getToolbarButtonClass()}
                onClick={createLink}
                title="Insert Link"
              >
                🔗 Link
              </button>
            </div>

            {/* Clear Formatting */}
            <div className="flex items-center gap-1">
              <button
                className={getToolbarButtonClass()}
                onClick={clearFormatting}
                title="Clear Formatting"
              >
                🧹 Clear
              </button>
            </div>
          </div>

          {/* Editor Area */}
          <div
            ref={editorRef}
            className="min-h-[400px] p-6 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors prose max-w-none"
            contentEditable
            onInput={handleContentChange}
            onKeyUp={updateButtonStates}
            onMouseUp={updateButtonStates}
            onFocus={(e) => {
              e.target.classList.add('border-blue-500', 'ring-2', 'ring-blue-200');
            }}
            onBlur={(e) => {
              e.target.classList.remove('border-blue-500', 'ring-2', 'ring-blue-200');
            }}
          >
            <p className="text-gray-500">Start writing your blog post here... Use the font size buttons for H1 (40px), H2 (32px), H3 (24px) headings and other text sizes.</p>
          </div>

          {/* Character Count */}
          <div className="mt-3 text-right">
            <div className="text-sm text-gray-500">
              Characters: {content.replace(/<[^>]*>/g, '').length} | 
              Words: {content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length}
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-blue-500">
            Preview
          </h3>
          <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 min-h-[200px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
              {title || 'Untitled Blog Post'}
            </h1>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: content || '<p class="text-gray-500 italic">Your formatted content will appear here with different font sizes for headings and paragraphs...</p>',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;