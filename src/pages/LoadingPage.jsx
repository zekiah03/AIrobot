import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { calcScores } from '../utils/calcScore'
import { categoryMeta } from '../data/questions'

const STEPS = [
  'バイオメトリクス取得中...',
  'ニューラルパターン解析中...',
  'センサーキャリブレーション...',
  'スペックデータベース照合中...',
  '演算ユニット計測完了',
  'メモリ容量スキャン完了',
  'センサー感度解析完了',
  '駆動系トルク計測完了',
  '総合スペック算出中...',
  'レポート生成完了',
]

export default function LoadingPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!state?.answers) {
      navigate('/')
      return
    }

    const result = calcScores(state.answers)

    let step = 0
    const interval = setInterval(() => {
      step++
      setStepIndex(Math.min(step, STEPS.length - 1))
      setProgress(Math.min(Math.round((step / STEPS.length) * 100), 100))

      if (step >= STEPS.length) {
        clearInterval(interval)
        setTimeout(() => {
          navigate('/result', { state: { result } })
        }, 600)
      }
    }, 280)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <p className="text-xs text-cyan-400/50 tracking-[0.3em] mb-8 text-center">
          ANALYZING HUMAN SPEC...
        </p>

        {/* プログレスバー */}
        <div className="w-full h-1 bg-cyan-950 mb-2">
          <div
            className="h-1 bg-cyan-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-cyan-600 mb-10">
          <span>{STEPS[stepIndex]}</span>
          <span>{progress}%</span>
        </div>

        {/* カテゴリスキャン表示 */}
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(categoryMeta).map(([id, meta], i) => {
            const done = i < stepIndex * 2.5
            return (
              <div
                key={id}
                className={`border px-2 py-1 text-xs transition-all duration-500 ${
                  done
                    ? 'border-cyan-700 text-cyan-400'
                    : 'border-cyan-950 text-cyan-900'
                }`}
              >
                <span className="font-bold">{id}</span>
                <span className="ml-1 text-cyan-600/50">{done ? 'OK' : '...'}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
