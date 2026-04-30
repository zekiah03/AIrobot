import { Routes, Route } from 'react-router-dom'
import TopPage from './pages/TopPage'
import QuizPage from './pages/QuizPage'
import LoadingPage from './pages/LoadingPage'
import ResultPage from './pages/ResultPage'

export default function App() {
  return (
    <div className="min-h-screen scan-line">
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  )
}
