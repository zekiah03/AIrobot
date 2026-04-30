import { useNavigate } from 'react-router-dom'

export default function TopPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-2xl">
        <p className="text-xs tracking-[0.3em] text-cyan-400 mb-4">SYSTEM BOOT v2.4.1</p>
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-glow mb-2 tracking-wider">
          HUMAN SPEC
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-cyan-glow mb-8 tracking-wider">
          ANALYZER
        </h2>
        <p className="text-sm text-cyan-300/70 mb-2">人間スペック診断システム</p>
        <p className="text-xs text-cyan-300/40 mb-12 leading-relaxed">
          あなたの能力を精密機械のスペックとして数値化します。<br />
          30問の質問に答えてください。所要時間：約5分
        </p>
        <button
          onClick={() => navigate('/quiz')}
          className="border border-cyan-400 text-cyan-400 px-12 py-4 text-sm tracking-[0.2em] hover:bg-cyan-400 hover:text-black transition-all duration-300 border-glow"
        >
          ▶ 診断スタート
        </button>
        <p className="text-xs text-cyan-300/30 mt-8">
          [ 全21カテゴリ / 30問 / スペック解析 ]
        </p>
      </div>
    </div>
  )
}
