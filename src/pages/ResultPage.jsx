import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import RobotDiagram from '../components/RobotDiagram'
import { contributeToTwin } from '../utils/contribute'

function CountUp({ target, duration = 1200 }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setVal(Math.round(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target])
  return <>{val.toLocaleString()}</>
}

export default function ResultPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!state?.result) { navigate('/'); return }
    setTimeout(() => setVisible(true), 100)
    contributeToTwin('airobot', {
      grade: state.result.grade,
      totalScore: state.result.totalScore,
      title: state.result.title,
    })
  }, [])

  if (!state?.result) return null
  const { scores, totalScore, grade, title } = state.result

  const gradeColor =
    grade === 'S+' ? 'text-yellow-300' :
    grade === 'S'  ? 'text-yellow-400' :
    grade === 'A+' ? 'text-cyan-300'   :
    grade === 'A'  ? 'text-cyan-400'   :
                     'text-cyan-600'

  return (
    <div className={`min-h-screen px-4 py-10 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-5xl mx-auto">

        {/* ヘッダー */}
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] text-cyan-500/60 mb-2">SPEC ANALYSIS COMPLETE</p>
          <div className="flex items-center justify-center gap-6 mb-2">
            <span className={`text-6xl font-bold ${gradeColor} text-cyan-glow`}>{grade}</span>
            <div className="text-left">
              <p className="text-cyan-300 text-lg">{title}</p>
              <p className="text-cyan-600 text-xs tracking-widest">TOTAL SCORE</p>
              <p className="text-cyan-100 text-2xl font-bold">
                <CountUp target={totalScore} /> / 100
              </p>
            </div>
          </div>
          <div className="w-full max-w-md mx-auto h-1 bg-cyan-950">
            <div
              className="h-1 bg-cyan-400 transition-all duration-1000"
              style={{ width: visible ? `${totalScore}%` : '0%' }}
            />
          </div>
        </div>

        {/* メインレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* SVGロボット */}
          <div className="flex flex-col">
            <p className="text-xs text-cyan-500/40 tracking-widest mb-2 text-center">
              ▸ 各部位にカーソルをのせると詳細表示
            </p>
            <RobotDiagram scores={scores} />
          </div>

          {/* スペック一覧表 */}
          <div>
            <p className="text-xs tracking-widest text-cyan-500/60 mb-4">FULL SPEC SHEET</p>
            <div className="flex flex-col gap-1">
              {Object.entries(scores).map(([id, s]) => (
                <div key={id} className="flex items-center gap-2 border-b border-cyan-950 py-1">
                  <span className="text-cyan-500 font-bold text-xs w-10 shrink-0">{id}</span>
                  <span className="text-cyan-400/50 text-xs w-28 shrink-0">{s.label}</span>
                  <div className="flex-1 h-px bg-cyan-950">
                    <div
                      className="h-px bg-cyan-500 transition-all duration-1000"
                      style={{ width: visible ? `${s.inverted ? 100 - s.base : s.base}%` : '0%' }}
                    />
                  </div>
                  <span className="text-cyan-300 text-xs font-bold w-24 text-right shrink-0">
                    {s.displayVal.toLocaleString()}
                    <span className="text-cyan-700 ml-1 text-[10px]">{s.unit}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ボタン */}
        <div className="flex justify-center gap-6 mt-12">
          <button
            onClick={() => navigate('/')}
            className="border border-cyan-800 text-cyan-600 px-8 py-3 text-xs tracking-widest hover:border-cyan-400 hover:text-cyan-300 transition-all"
          >
            ↺ もう一度診断
          </button>
        </div>
      </div>
    </div>
  )
}
