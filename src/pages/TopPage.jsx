import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BOOT_LINES = [
  'BIOS v2.4.1 ... OK',
  'Loading sensor drivers ... OK',
  'Calibrating neural interface ... OK',
  'Human spec database ... CONNECTED',
  'Ready.',
]

export default function TopPage() {
  const navigate = useNavigate()
  const [bootIndex, setBootIndex] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (bootIndex < BOOT_LINES.length) {
      const t = setTimeout(() => setBootIndex((i) => i + 1), 400)
      return () => clearTimeout(t)
    } else {
      setTimeout(() => setReady(true), 300)
    }
  }, [bootIndex])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-xl">

        {/* ブートログ */}
        <div className="mb-10 h-28 flex flex-col justify-end">
          {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
            <p key={i} className="text-xs text-cyan-700 font-mono leading-6 tracking-wide">
              <span className="text-cyan-900 mr-2">&gt;</span>{line}
            </p>
          ))}
        </div>

        {/* タイトル */}
        <div className={`transition-all duration-700 ${ready ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[10px] tracking-[0.5em] text-cyan-600 mb-3">HUMAN SPEC ANALYZER</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider mb-1 text-cyan-glow text-cyan-300">
            HUMAN
          </h1>
          <h2 className="text-5xl md:text-7xl font-bold tracking-wider mb-8 text-cyan-glow text-cyan-400">
            SPEC<span className="text-cyan-600">_</span>
          </h2>

          {/* サブテキスト */}
          <p className="text-xs text-cyan-500/60 mb-1 leading-6">
            あなたの能力を精密機械のスペックとして数値化します。
          </p>
          <p className="text-xs text-cyan-500/40 mb-10 leading-6">
            [ 21 CATEGORIES &nbsp;/&nbsp; 30 QUESTIONS &nbsp;/&nbsp; EST. 5 MIN ]
          </p>

          {/* スタートボタン */}
          <button
            onClick={() => navigate('/quiz')}
            className="group relative border border-cyan-500 text-cyan-400 px-14 py-4 text-xs tracking-[0.3em]
              hover:bg-cyan-400 hover:text-black transition-all duration-300 border-glow overflow-hidden"
          >
            <span className="relative z-10">▶ 診断スタート</span>
            <span className="absolute inset-0 bg-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"/>
            <span className="absolute inset-0 flex items-center justify-center text-black text-xs tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 font-bold">
              ▶ 診断スタート
            </span>
          </button>

          {/* 装飾ライン */}
          <div className="mt-12 flex items-center gap-3">
            <div className="flex-1 h-px bg-cyan-900"/>
            <span className="text-[10px] text-cyan-800 tracking-widest">SYS_READY</span>
            <div className="flex-1 h-px bg-cyan-900"/>
          </div>
        </div>
      </div>
    </div>
  )
}
