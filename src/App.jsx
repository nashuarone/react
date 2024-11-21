import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])

  const fetchData = async () => {
    await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(data => setPosts(data))
  }

  useEffect(() => {
    fetchData()
  }, [posts.length])

  return (
    <>
      {posts?.map(item => <div key={item.id}>{item.title}</div>) }
    </>
  )
}

export default App
