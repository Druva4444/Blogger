import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { useLocation, useNavigate } from 'react-router-dom';
import StarterKit from '@tiptap/starter-kit';
import { Save, Send, Archive, Bold, Italic } from 'lucide-react';
import axios from '../utils/axios.js';

const Blog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title1, content1, id } = location.state || {};
  const [title, setTitle] = useState(title1);
  const [saving, setSaving] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState(null);

  const inactivityTimer = useRef(null);
  const editor = useEditor({
    extensions: [StarterKit],
    content: content1 || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] max-w-none',
      },
    },
    onUpdate: () => resetInactivityTimer(),
  });

  const saveDraft = useCallback(async () => {
    if (!editor) return;
    setSaving(true);
    try {
      const content = editor.getHTML();
      await axios.post('/blog/create', {
        id,
        title,
        content,
        status: 'draft'
      }, { withCredentials: true });

      setLastSavedTime(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Auto-save failed:', err);
    } finally {
      setSaving(false);
    }
  }, [editor, title, id]);

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(() => {
      saveDraft();
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      saveDraft();
    }, 30000); // every 30 seconds

    return () => clearInterval(interval);
  }, [saveDraft]);

  useEffect(() => {
    return () => {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const content = editor?.getHTML() || '';
      const response = await axios.post('/blog/create', {
        id,
        title,
        content,
        status: 'published'
      }, { withCredentials: true });

      if (response.status === 200) {
        alert('Blog published successfully!');
        navigate('/Myblog', { state: { title1: "", content1: '' } });
      }
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSave1 = async () => {
    await saveDraft();
    navigate('/drafts');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Create New Blog Post</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Publish
          </button>

          <button
            onClick={handleSave1}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            <Archive className="h-4 w-4 mr-2" />
            Save as Draft
          </button>
        </div>

        {lastSavedTime && (
          <p className="mt-2 text-sm text-green-600">Auto-saved at {lastSavedTime}</p>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6">
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              resetInactivityTimer();
            }}
            placeholder="Enter your blog title"
            className="w-full text-4xl font-bold border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-blue-500 mb-8 pb-2"
          />

          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex space-x-2">
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`p-2 rounded ${editor?.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Bold className="h-5 w-5" />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`p-2 rounded ${editor?.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Italic className="h-5 w-5" />
              </button>
            </div>
          </div>

          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
