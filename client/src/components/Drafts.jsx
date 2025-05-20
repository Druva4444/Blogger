import React from 'react';
import { Edit2, Trash2, Send } from 'lucide-react';
import { useState,useEffect } from 'react';
import axios from '../utils/axios.js';
import { useNavigate } from 'react-router-dom';
const Drafts = () => {
    const navigate = useNavigate();
    const [drafts, setDrafts] = useState([]);
    async function handlesend(draft){
        try {
            const response= await axios.post('/blog/create', {id:draft._id,title:draft.title,content:draft.content,status:'published'},{withCredentials:true});
            if(response.status === 200) {
                alert('Blog published successfully!');
                window.location.href = '/drafts';
            }
        } catch (error) {
            if(error.response && error.response.status === 400) {
                alert(error.response.data.message);
            }
            else {
                console.error('Error saving:', error);
            }
        }
    

    }
    async function handledit(draft){
        navigate('/blog', { state: {id:draft._id, title1: draft.title, content1: draft.content } });
    }
    async function handledelete(draft){
        try {
            const response= await axios.delete(`/blog/delete/${draft._id}`,{withCredentials:true});
            if(response.status === 200) {
                alert('Blog deleted successfully!');
                window.location.href = '/drafts';
            }
        } catch (error) {
            if(error.response && error.response.status === 400) {
                alert(error.response.data.message);
            }
            else {
                console.error('Error saving:', error);
            }
        }
      }
    useEffect(()=>{
        async function getdrafts(){
            try {
                const response = await axios.get('/blog/drafts',{withCredentials:true});
                console.log(response.data);
                setDrafts(response.data);
            } catch (error) {
                console.error('Error fetching drafts:', error);
            }
        }
        getdrafts();
    },[])
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Drafts</h1>
        <a
          href="/blog"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Create New Post
        </a>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="divide-y divide-gray-200">
  {drafts.length === 0 ? (
    <div className="p-6 text-center text-gray-500">No drafts available</div>
  ) : (
    drafts.map((draft) => (
      <div key={draft.id} className="p-6 hover:bg-gray-50">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {draft.title}
            </h2>
            <div
              className="text-gray-600 mb-4"
              dangerouslySetInnerHTML={{ __html: draft.content }}
            />
            <div className="flex items-center text-sm text-gray-500">
              <span className="mr-4">
                Last modified: {draft.updatedAt.split('T')[0]}
              </span>
              <span>{draft.content.split(/\s+/).length} words</span>
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              className="p-2 text-gray-400 hover:text-blue-600"
              onClick={() => handlesend(draft)}
            >
              <Send className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-green-600"
              onClick={() => handledit(draft)}
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-600" onClick={() => handledelete(draft)}>
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>

      </div>
    </div>
  );
};

export default Drafts;