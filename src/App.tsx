import Home from './pages/Home';
import './App.css'
import Navbar from './components/Navbar'
import { HashRouter, Routes, Route } from 'react-router-dom'
function App() {
    return (
        <HashRouter>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </HashRouter>
    )
}

export default App
