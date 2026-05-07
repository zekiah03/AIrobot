import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions, categoryMeta } from '../data/questions'

const CHOICES = [
  { value: 1, label: '全くそう思わない' },
  { value: 2, label: 'あまり思わない' },
  { value: 3, label: 'どちらでもない' },
  { value: 4, label: 'そう思う' },
  { value: 5, label: '強くそう思う' },
]

export default function QuizPage() {
  const navigate = useNavigate()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)

  const q = questions[current]
  const progress = ((current) / questions.length) * 100

  function handleSelect(value) {
    setSelected(value)
  }

  function handleNext() {
    if (selected === null) return
    const next = { ...answers, [q.id]: { category: q.category, value: selected } }
    setAnswers(next)
    if (current + 1 < questions.length) {
      setSelected(next[questions[current + 1].id]?.value ?? null)
      setCurrent(current + 1)
    } else {
      navigate('/loading', { state: { answers: next } })
    }
  }

  function handlePrev() {
    if (current === 0) return
    const prevId = questions[current - 1].id
    setSelected(answers[prevId]?.value ?? null)
    setCurrent(current - 1)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* ヘッダー */}
      <div className="w-full max-w-2xl mb-8">
        <div className="flex justify-between items-center mb-2 text-xs text-cyan-400/60 tracking-widest">
          <span>SPEC ANALYSIS</span>
          <span>Q{String(current + 1).padStart(2, '0')} / {questions.length}</span>
        </div>
        <div className="w-full h-px bg-cyan-900">
          <div
            className="h-px bg-cyan-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* カテゴリバッジ */}
      <div className="w-full max-w-2xl mb-3 flex items-center gap-3">
        <span className="text-xs border border-cyan-700 text-cyan-500 px-3 py-1 tracking-widest">
          [{q.category}]
        </span>
        <span className="text-xs text-cyan-600">
          {categoryMeta[q.category]?.label}
        </span>
        <span className="text-xs text-cyan-800">
          — {categoryMeta[q.category]?.part}
        </span>
      </div>

      {/* 質問文 */}
      <div className="w-full max-w-2xl mb-8">
        <p className="text-lg md:text-xl text-cyan-100 leading-relaxed mb-3">{q.text}</p>
        <p className="text-[11px] text-cyan-700 leading-relaxed border-l-2 border-cyan-900 pl-3">
          {categoryMeta[q.category]?.comments?.mid?.slice(0, 60)}…
        </p>
      </div>

      {/* 選択肢 */}
      <div className="w-full max-w-2xl flex flex-col gap-3 mb-10">
        {CHOICES.map((c) => (
          <button
            key={c.value}
            onClick={() => handleSelect(c.value)}
            className={`w-full text-left px-5 py-3 border text-sm tracking-wide transition-all duration-200
              ${selected === c.value
                ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300 border-glow'
                : 'border-cyan-900 text-cyan-400/50 hover:border-cyan-600 hover:text-cyan-300'
              }`}
          >
            <span className="text-cyan-600 mr-3">{c.value}.</span>{c.label}
          </button>
        ))}
      </div>

      {/* ナビゲーション */}
      <div className="w-full max-w-2xl flex justify-between">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="text-xs text-cyan-600 hover:text-cyan-300 disabled:opacity-20 tracking-widest transition-colors"
        >
          ← PREV
        </button>
        <button
          onClick={handleNext}
          disabled={selected === null}
          className={`px-8 py-2 text-xs tracking-widest transition-all duration-200 border
            ${selected !== null
              ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black border-glow'
              : 'border-cyan-900 text-cyan-900 cursor-not-allowed'
            }`}
        >
          {current + 1 === questions.length ? '解析開始 ▶' : 'NEXT →'}
        </button>
      </div>
    </div>
  )
}
