import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { useEffect ,useState} from 'react';
import axios from '../utils/axios.js'


const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(()=>{
        async function getblogs(){
            try {
                const response = await axios.get('/blog/get',{withCredentials:true});
                console.log(response.data);
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        }
        getblogs();
        },[])
        async function handledelete(blog){
            try {
                const response= await axios.delete(`/blog/delete/${blog._id}`,{withCredentials:true});
                if(response.status === 200) {
                    alert('Blog deleted successfully!');
                    window.location.href = '/Myblog';
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
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Blog Posts</h1>
        <a
          href="/blog"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          Create New Post
        </a>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {blogs.map((blog) => (
            <div key={blog.id} className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {blog.title}
                  </h2><div
  className="text-gray-600 mb-4"
  dangerouslySetInnerHTML={{ __html: blog.content }}
/>

                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">Posted at {blog.createdAt.split('T')[0]}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                 
                  <button className="p-2 text-gray-400 hover:text-red-600" onClick={() => handledelete(blog)}>
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;