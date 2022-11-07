import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { PostsPage } from "./pages/posts/PostsPage/PostsPage";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <PostsPage/>
    </div>
  )
}

export default App
