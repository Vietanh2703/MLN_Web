import Home from './pages/Home';
import QuizPage from "./pages/QuizPage.tsx";
import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import React from "react";
const AppContent: React.FC = () => {
    return (
        <div className="App">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quiz" element={<QuizPage />} />
                </Routes>
            </main>
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App
