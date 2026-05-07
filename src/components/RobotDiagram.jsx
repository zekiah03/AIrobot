import { useState } from 'react'

const PARTS = [
  { id: 'CPU', cx: 150, cy: 68,  side: 'left',  bodyPart: '頭部（演算）' },
  { id: 'GPU', cx: 150, cy: 85,  side: 'right', bodyPart: '頭部（描画）' },
  { id: 'NPU', cx: 150, cy: 102, side: 'left',  bodyPart: '頭部（推論）' },
  { id: 'RAM', cx: 150, cy: 119, side: 'right', bodyPart: '頭部（記憶）' },
  { id: 'CAM', cx: 135, cy: 93,  side: 'left',  bodyPart: '目（視覚）' },
  { id: 'MIC', cx: 124, cy: 114, side: 'left',  bodyPart: '耳（聴覚）' },
  { id: 'SPK', cx: 150, cy: 138, side: 'right', bodyPart: '口（音声）' },
  { id: 'NET', cx: 150, cy: 168, side: 'right', bodyPart: '首（通信）' },
  { id: 'SSD', cx: 133, cy: 208, side: 'left',  bodyPart: '胸部左（高速記憶）' },
  { id: 'HDD', cx: 133, cy: 232, side: 'left',  bodyPart: '胸部左（大容量）' },
  { id: 'PSU', cx: 167, cy: 208, side: 'right', bodyPart: '胸部右（電力）' },
  { id: 'EFF', cx: 167, cy: 232, side: 'right', bodyPart: '胸部右（効率）' },
  { id: 'FW',  cx: 140, cy: 272, side: 'left',  bodyPart: '腹部（基本制御）' },
  { id: 'EXH', cx: 160, cy: 292, side: 'right', bodyPart: '腹部（廃棄）' },
  { id: 'THM', cx: 150, cy: 255, side: 'right', bodyPart: '背部（冷却）' },
  { id: 'ACT', cx: 92,  cy: 228, side: 'left',  bodyPart: '左腕（駆動）' },
  { id: 'SRV', cx: 83,  cy: 292, side: 'left',  bodyPart: '左手（精密）' },
  { id: 'FRM', cx: 208, cy: 228, side: 'right', bodyPart: '右腕（フレーム）' },
  { id: 'TCH', cx: 150, cy: 318, side: 'left',  bodyPart: '体幹（触覚）' },
  { id: 'GYR', cx: 133, cy: 388, side: 'left',  bodyPart: '脚部（姿勢）' },
  { id: 'LAT', cx: 167, cy: 388, side: 'right', bodyPart: '脚部（反応）' },
]

const LABEL_X_LEFT  = 28
const LABEL_X_RIGHT = 272

function getComment(score, comments) {
  if (!comments) return ''
  const b = score.inverted ? 100 - score.base : score.base
  if (b <= 35) return comments.low
  if (b <= 65) return comments.mid
  return comments.high
}

function RobotSVG({ scores, onHover, hoveredId }) {
  const cyan    = '#00ffe7'
  const cyanDim = '#00ffe733'
  const dark    = '#050a0f'

  return (
    <svg viewBox="0 0 300 500" className="w-full max-w-xs mx-auto select-none">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00ffe70a" strokeWidth="0.5"/>
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="300" height="500" fill={dark}/>
      <rect width="300" height="500" fill="url(#grid)"/>

      {/* 頭 */}
      <rect x="112" y="58" width="76" height="92" rx="6" fill="#071210" stroke={cyan} strokeWidth="1.2"/>
      {/* 目 */}
      <ellipse cx="135" cy="93" rx="8" ry="6" fill="#001a10" stroke={cyan} strokeWidth="1"/>
      <ellipse cx="165" cy="93" rx="8" ry="6" fill="#001a10" stroke={cyan} strokeWidth="1"/>
      <circle cx="135" cy="93" r="3" fill={cyan} opacity="0.9" filter="url(#glow)"/>
      <circle cx="165" cy="93" r="3" fill={cyan} opacity="0.9" filter="url(#glow)"/>
      {/* 耳 */}
      <rect x="106" y="106" width="6" height="14" rx="2" fill="#071210" stroke={cyan} strokeWidth="0.8"/>
      <rect x="188" y="106" width="6" height="14" rx="2" fill="#071210" stroke={cyan} strokeWidth="0.8"/>
      {/* 口 */}
      <rect x="132" y="134" width="36" height="8" rx="2" fill="#001a10" stroke={cyan} strokeWidth="0.8"/>
      <rect x="137" y="136" width="6"  height="4" rx="1" fill={cyan} opacity="0.5"/>
      <rect x="147" y="136" width="6"  height="4" rx="1" fill={cyan} opacity="0.5"/>
      <rect x="157" y="136" width="6"  height="4" rx="1" fill={cyan} opacity="0.5"/>
      {/* 首 */}
      <rect x="140" y="150" width="20" height="18" rx="2" fill="#071210" stroke={cyanDim} strokeWidth="1"/>
      {/* 胴体 */}
      <rect x="108" y="168" width="84" height="132" rx="6" fill="#071210" stroke={cyan} strokeWidth="1.2"/>
      {/* 胸部パネル */}
      <rect x="116" y="178" width="30" height="54" rx="3" fill="#001510" stroke={cyanDim} strokeWidth="0.8"/>
      <rect x="154" y="178" width="30" height="54" rx="3" fill="#001510" stroke={cyanDim} strokeWidth="0.8"/>
      {/* 腹部パネル */}
      <rect x="118" y="240" width="64" height="48" rx="3" fill="#001510" stroke={cyanDim} strokeWidth="0.8"/>
      <text x="150" y="268" textAnchor="middle" fontSize="6" fill={cyan} opacity="0.35" fontFamily="monospace">HUMAN v1.0</text>
      {/* 左腕 */}
      <rect x="75"  y="172" width="29" height="92" rx="5" fill="#071210" stroke={cyan} strokeWidth="1"/>
      {/* 左手 */}
      <rect x="73"  y="267" width="33" height="40" rx="4" fill="#071210" stroke={cyan} strokeWidth="1"/>
      <rect x="79"  y="272" width="5" height="26" rx="2" fill="#001a10" stroke={cyanDim} strokeWidth="0.6"/>
      <rect x="87"  y="270" width="5" height="28" rx="2" fill="#001a10" stroke={cyanDim} strokeWidth="0.6"/>
      <rect x="95"  y="272" width="5" height="26" rx="2" fill="#001a10" stroke={cyanDim} strokeWidth="0.6"/>
      {/* 右腕 */}
      <rect x="196" y="172" width="29" height="92" rx="5" fill="#071210" stroke={cyan} strokeWidth="1"/>
      {/* 右手 */}
      <rect x="194" y="267" width="33" height="40" rx="4" fill="#071210" stroke={cyan} strokeWidth="1"/>
      {/* 左脚 */}
      <rect x="117" y="302" width="29" height="100" rx="5" fill="#071210" stroke={cyan} strokeWidth="1"/>
      <rect x="115" y="397" width="33" height="16" rx="3" fill="#071210" stroke={cyan} strokeWidth="1"/>
      {/* 右脚 */}
      <rect x="154" y="302" width="29" height="100" rx="5" fill="#071210" stroke={cyan} strokeWidth="1"/>
      <rect x="152" y="397" width="33" height="16" rx="3" fill="#071210" stroke={cyan} strokeWidth="1"/>

      {/* 計測点 & ライン */}
      {PARTS.map((p) => {
        const s    = scores[p.id]
        const isHov = hoveredId === p.id
        const lx   = p.side === 'left' ? LABEL_X_LEFT : LABEL_X_RIGHT
        const col  = isHov ? cyan : '#00ffe755'

        return (
          <g key={p.id}
            onMouseEnter={() => onHover(p.id)}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: 'pointer' }}>
            <line
              x1={p.cx} y1={p.cy} x2={lx} y2={p.cy}
              stroke={col} strokeWidth={isHov ? 1 : 0.5}
              strokeDasharray={isHov ? 'none' : '3 2'}/>
            <circle cx={p.cx} cy={p.cy} r={isHov ? 5 : 3}
              fill={dark} stroke={col} strokeWidth="1.2"
              filter={isHov ? 'url(#glow)' : 'none'}/>
            {isHov && <circle cx={p.cx} cy={p.cy} r="2" fill={cyan}/>}
            <text
              x={p.side === 'left' ? lx - 2 : lx + 2}
              y={p.cy + 4}
              textAnchor={p.side === 'left' ? 'end' : 'start'}
              fontSize="6.5" fill={isHov ? cyan : '#00ffe766'}
              fontFamily="monospace">
              {p.id}{s ? ` ${s.displayVal}${s.unit}` : ''}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function RobotDiagram({ scores }) {
  const [hoveredId, setHoveredId] = useState(null)
  const hovered = hoveredId ? scores[hoveredId] : null
  const effBase = hovered ? (hovered.inverted ? 100 - hovered.base : hovered.base) : 0
  const comment = hovered ? getComment(hovered, hovered.comments) : ''

  return (
    <div className="relative">
      <RobotSVG scores={scores} onHover={setHoveredId} hoveredId={hoveredId}/>

      {/* ホバーポップアップ */}
      {hovered && (
        <div className="mt-4 border border-cyan-700 bg-black/95 p-4 text-xs border-glow animate-fadeInUp">
          {/* ヘッダー */}
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-cyan-400 font-bold tracking-widest">[{hoveredId}]</span>
              <span className="text-cyan-300 ml-2">{hovered.label}</span>
              <span className="text-cyan-700 ml-2 text-[10px]">{hovered.part}</span>
            </div>
            <div className="text-right">
              <span className="text-cyan-100 text-xl font-bold">{hovered.displayVal.toLocaleString()}</span>
              <span className="text-cyan-600 ml-1 text-[10px]">{hovered.unit}</span>
            </div>
          </div>

          {/* スコアバー */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-cyan-700 text-[10px] w-12 shrink-0">SCORE</span>
            <div className="flex-1 h-1 bg-cyan-950">
              <div className="h-1 bg-cyan-400 transition-all duration-500"
                style={{ width: `${effBase}%` }}/>
            </div>
            <span className="text-cyan-500 text-[10px] w-8 text-right">{effBase}/100</span>
          </div>

          {/* AI・ロボット比較バー */}
          {hovered.bench && (
            <div className="mb-3 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-purple-400 w-12 shrink-0">AI</span>
                <div className="flex-1 h-1 bg-purple-950">
                  <div className="h-1 bg-purple-500" style={{ width: `${hovered.bench.ai}%` }}/>
                </div>
                <span className="text-purple-600 text-[10px] w-8 text-right">{hovered.bench.ai}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-orange-400 w-12 shrink-0">ROBOT</span>
                <div className="flex-1 h-1 bg-orange-950">
                  <div className="h-1 bg-orange-500" style={{ width: `${hovered.bench.robot}%` }}/>
                </div>
                <span className="text-orange-600 text-[10px] w-8 text-right">{hovered.bench.robot}</span>
              </div>
            </div>
          )}

          {/* 理論コメント */}
          <p className="text-cyan-400/70 leading-relaxed border-t border-cyan-900 pt-2 mt-1">
            {comment}
          </p>
          {hovered.bench?.note && (
            <p className="text-cyan-700 leading-relaxed mt-1 text-[10px]">
              ▸ {hovered.bench.note}
            </p>
          )}
        </div>
      )}

      {!hoveredId && (
        <p className="text-center text-[11px] text-cyan-700 mt-4 tracking-widest">
          ▸ 各部位をホバーして詳細解析
        </p>
      )}
    </div>
  )
}
