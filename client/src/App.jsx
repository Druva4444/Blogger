import './App.css'
import {Routes, Route} from 'react-router-dom'
import Index from './components/index.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Blog from './components/Blog.jsx'
import Navbar from './components/Navbar.jsx'
import Drafts from './components/Drafts.jsx'
import BlogList from './components/Myblogs.jsx'
function App() {
 

  return (
    <Routes>
      <Route path="/" element={<Index></Index>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/blog" element={<><Navbar activetab={'blog'}/><Blog /></>} />
      <Route path="/drafts" element={<><Navbar activetab={'drafts'}/><Drafts/></>} />
      <Route path="/Myblog" element={<><Navbar activetab={'Myblog'}/><BlogList/></>} />
      
    </Routes>

  )
}

export default App
