import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import RobotDiagram from '../components/RobotDiagram'

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

// AI・ロボット総合比較を計算
function calcComparisons(scores) {
  let humanTotal = 0, aiTotal = 0, robotTotal = 0, count = 0
  let humanWins = [], aiWins = [], robotWins = []

  for (const [id, s] of Object.entries(scores)) {
    if (!s.bench) continue
    const humanBase = s.inverted ? 100 - s.base : s.base
    const ai    = s.bench.ai
    const robot = s.bench.robot
    humanTotal += humanBase
    aiTotal    += ai
    robotTotal += robot
    count++
    if (humanBase > ai && humanBase > robot) humanWins.push(id)
    else if (ai > humanBase && ai > robot)   aiWins.push(id)
    else robotWins.push(id)
  }

  return {
    human: Math.round(humanTotal / count),
    ai:    Math.round(aiTotal / count),
    robot: Math.round(robotTotal / count),
    humanWins,
    aiWins,
    robotWins,
  }
}

const gradeColor = (grade) =>
  grade === 'S+' ? 'text-yellow-300' :
  grade === 'S'  ? 'text-yellow-400' :
  grade === 'A+' ? 'text-cyan-300'   :
  grade === 'A'  ? 'text-cyan-400'   : 'text-cyan-600'

export default function ResultPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!state?.result) { navigate('/'); return }
    setTimeout(() => setVisible(true), 100)
  }, [])

  if (!state?.result) return null
  const { scores, totalScore, grade, title } = state.result
  const cmp = calcComparisons(scores)

  return (
    <div className={`min-h-screen px-4 py-10 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-5xl mx-auto">

        {/* ヘッダー */}
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.4em] text-cyan-600 mb-3">SPEC ANALYSIS COMPLETE</p>
          <div className="flex items-center justify-center gap-8 mb-4">
            <span className={`text-7xl font-bold ${gradeColor(grade)} text-cyan-glow`}>{grade}</span>
            <div className="text-left">
              <p className="text-cyan-200 text-xl mb-1">{title}</p>
              <p className="text-cyan-700 text-[10px] tracking-widest mb-1">TOTAL SCORE</p>
              <p className="text-cyan-100 text-3xl font-bold">
                <CountUp target={totalScore} /> <span className="text-cyan-700 text-lg">/ 100</span>
              </p>
            </div>
          </div>
          <div className="w-full max-w-md mx-auto h-1 bg-cyan-950">
            <div className="h-1 bg-cyan-400 transition-all duration-1000"
              style={{ width: visible ? `${totalScore}%` : '0%' }}/>
          </div>
        </div>

        {/* メインレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* SVGロボット */}
          <RobotDiagram scores={scores} />

          {/* 右カラム */}
          <div className="flex flex-col gap-6">

            {/* AI・ロボット総合比較 */}
            <div className="border border-cyan-900 p-4">
              <p className="text-[10px] tracking-widest text-cyan-600 mb-4">
                COMPARATIVE ANALYSIS — AI / ROBOT BENCHMARK
              </p>
              <div className="space-y-4">
                {[
                  { label: 'YOU',   val: cmp.human, color: 'bg-cyan-400',   text: 'text-cyan-300',   bar: 'bg-cyan-950' },
                  { label: 'AI',    val: cmp.ai,    color: 'bg-purple-500',  text: 'text-purple-300', bar: 'bg-purple-950' },
                  { label: 'ROBOT', val: cmp.robot, color: 'bg-orange-500',  text: 'text-orange-300', bar: 'bg-orange-950' },
                ].map(({ label, val, color, text, bar }) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className={`text-xs font-bold ${text} tracking-widest`}>{label}</span>
                      <span className={`text-xs ${text}`}>{val} / 100</span>
                    </div>
                    <div className={`w-full h-2 ${bar}`}>
                      <div className={`h-2 ${color} transition-all duration-1000`}
                        style={{ width: visible ? `${val}%` : '0%' }}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* 勝ち負け分析 */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
                <div className="border border-cyan-900 p-2">
                  <p className="text-cyan-500 mb-1 tracking-wider">人間優位</p>
                  <p className="text-cyan-300">{cmp.humanWins.join(' / ') || '—'}</p>
                </div>
                <div className="border border-purple-900 p-2">
                  <p className="text-purple-500 mb-1 tracking-wider">AI優位</p>
                  <p className="text-purple-300">{cmp.aiWins.join(' / ') || '—'}</p>
                </div>
                <div className="border border-orange-900 p-2">
                  <p className="text-orange-500 mb-1 tracking-wider">ロボット優位</p>
                  <p className="text-orange-300">{cmp.robotWins.join(' / ') || '—'}</p>
                </div>
              </div>

              {/* 人間固有の優位性メモ */}
              {(cmp.humanWins.includes('EFF') || cmp.humanWins.includes('PSU')) && (
                <p className="mt-3 text-[10px] text-cyan-700 border-t border-cyan-950 pt-2">
                  ▸ 電力効率（EFF/PSU）で人間が優位 — 脳は約20Wで現在のAIを凌駕する処理を実現する。
                </p>
              )}
              {(cmp.humanWins.includes('NET') || cmp.humanWins.includes('NPU')) && (
                <p className="mt-1 text-[10px] text-cyan-700">
                  ▸ 社会的認知（NET/NPU）で人間が優位 — 感情共鳴と暗黙的直感は生体固有の能力。
                </p>
              )}
            </div>

            {/* スペック一覧 */}
            <div>
              <p className="text-[10px] tracking-widest text-cyan-600 mb-3">FULL SPEC SHEET</p>
              <div className="flex flex-col gap-1">
                {Object.entries(scores).map(([id, s]) => {
                  const b = s.inverted ? 100 - s.base : s.base
                  return (
                    <div key={id} className="flex items-center gap-2 border-b border-cyan-950 py-1">
                      <span className="text-cyan-500 font-bold text-[10px] w-9 shrink-0">{id}</span>
                      <span className="text-cyan-600 text-[10px] w-24 shrink-0 truncate">{s.label}</span>
                      <div className="flex-1 h-px bg-cyan-950">
                        <div className="h-px bg-cyan-500 transition-all duration-1000"
                          style={{ width: visible ? `${b}%` : '0%' }}/>
                      </div>
                      <span className="text-cyan-300 text-[10px] font-bold w-20 text-right shrink-0">
                        {s.displayVal.toLocaleString()}
                        <span className="text-cyan-800 ml-1 text-[9px]">{s.unit}</span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* フッターボタン */}
        <div className="flex justify-center gap-6 mt-12">
          <button onClick={() => navigate('/')}
            className="border border-cyan-800 text-cyan-600 px-8 py-3 text-xs tracking-widest
              hover:border-cyan-400 hover:text-cyan-300 transition-all">
            ↺ もう一度診断
          </button>
        </div>

        <p className="text-center text-[10px] text-cyan-900 mt-8 tracking-widest">
          BASED ON BIOLOGICAL HARDWARE ARCHITECTURE THEORY v1.0
        </p>
      </div>
    </div>
  )
}
