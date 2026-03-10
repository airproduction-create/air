import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ShareResult } from './pages/ShareResult'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reveal/:token" element={<ShareResult />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
