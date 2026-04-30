import { useState } from 'react'

// ロボット各部位の定義（SVG座標系 viewBox="0 0 300 500"）
const PARTS = [
  // --- 頭部まわり ---
  { id: 'CPU', cx: 150, cy: 68,  side: 'left',  bodyPart: '頭部（演算）' },
  { id: 'GPU', cx: 150, cy: 88,  side: 'right', bodyPart: '頭部（描画）' },
  { id: 'NPU', cx: 150, cy: 108, side: 'left',  bodyPart: '頭部（推論）' },
  { id: 'RAM', cx: 150, cy: 128, side: 'right', bodyPart: '頭部（記憶）' },
  { id: 'CAM', cx: 135, cy: 95,  side: 'left',  bodyPart: '目（視覚）' },
  { id: 'MIC', cx: 125, cy: 115, side: 'left',  bodyPart: '耳（聴覚）' },
  { id: 'SPK', cx: 150, cy: 138, side: 'right', bodyPart: '口（音声）' },
  // --- 首・胸部 ---
  { id: 'NET', cx: 150, cy: 170, side: 'right', bodyPart: '首（通信）' },
  { id: 'SSD', cx: 135, cy: 210, side: 'left',  bodyPart: '胸部左（高速記憶）' },
  { id: 'HDD', cx: 135, cy: 235, side: 'left',  bodyPart: '胸部左（大容量）' },
  { id: 'PSU', cx: 165, cy: 210, side: 'right', bodyPart: '胸部右（電力）' },
  { id: 'EFF', cx: 165, cy: 235, side: 'right', bodyPart: '胸部右（効率）' },
  // --- 腹部 ---
  { id: 'FW',  cx: 140, cy: 275, side: 'left',  bodyPart: '腹部（制御）' },
  { id: 'EXH', cx: 160, cy: 295, side: 'right', bodyPart: '腹部（排熱）' },
  { id: 'THM', cx: 150, cy: 260, side: 'right', bodyPart: '背部（冷却）' },
  // --- 腕・手 ---
  { id: 'ACT', cx: 95,  cy: 230, side: 'left',  bodyPart: '左腕（駆動）' },
  { id: 'SRV', cx: 85,  cy: 295, side: 'left',  bodyPart: '左手（精密）' },
  { id: 'FRM', cx: 205, cy: 230, side: 'right', bodyPart: '右腕（フレーム）' },
  // --- センサー・脚部 ---
  { id: 'TCH', cx: 150, cy: 320, side: 'left',  bodyPart: '体幹（触覚）' },
  { id: 'GYR', cx: 135, cy: 390, side: 'left',  bodyPart: '脚部（姿勢）' },
  { id: 'LAT', cx: 165, cy: 390, side: 'right', bodyPart: '脚部（反応）' },
]

// 吹き出しのX座標（左右）
const LABEL_X_LEFT  = 30
const LABEL_X_RIGHT = 270

function RobotSVG({ scores, onHover, hoveredId }) {
  const cyan    = '#00ffe7'
  const cyanDim = '#00ffe744'
  const dark    = '#050a0f'

  return (
    <svg viewBox="0 0 300 500" className="w-full max-w-xs mx-auto select-none">
      {/* グリッド背景 */}
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00ffe711" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="300" height="500" fill={dark}/>
      <rect width="300" height="500" fill="url(#grid)"/>

      {/* ===== ロボット本体 ===== */}
      {/* 頭 */}
      <rect x="112" y="60" width="76" height="90" rx="6" fill="#0a1a1a" stroke={cyan} strokeWidth="1.2"/>
      {/* 目 */}
      <ellipse cx="135" cy="95" rx="8" ry="6" fill="#001a10" stroke={cyan} strokeWidth="1"/>
      <ellipse cx="165" cy="95" rx="8" ry="6" fill="#001a10" stroke={cyan} strokeWidth="1"/>
      <circle cx="135" cy="95" r="3" fill={cyan} opacity="0.8"/>
      <circle cx="165" cy="95" r="3" fill={cyan} opacity="0.8"/>
      {/* 耳センサー */}
      <rect x="106" y="108" width="6" height="14" rx="2" fill="#0a1a1a" stroke={cyan} strokeWidth="0.8"/>
      <rect x="188" y="108" width="6" height="14" rx="2" fill="#0a1a1a" stroke={cyan} strokeWidth="0.8"/>
      {/* 口 */}
      <rect x="132" y="134" width="36" height="8" rx="2" fill="#001a10" stroke={cyan} strokeWidth="0.8"/>
      <rect x="137" y="136" width="6" height="4" rx="1" fill={cyan} opacity="0.6"/>
      <rect x="147" y="136" width="6" height="4" rx="1" fill={cyan} opacity="0.6"/>
      <rect x="157" y="136" width="6" height="4" rx="1" fill={cyan} opacity="0.6"/>

      {/* 首 */}
      <rect x="140" y="150" width="20" height="18" rx="2" fill="#0a1a1a" stroke={cyanDim} strokeWidth="1"/>

      {/* 胴体 */}
      <rect x="108" y="168" width="84" height="130" rx="6" fill="#0a1a1a" stroke={cyan} strokeWidth="1.2"/>
      {/* 胸部パネル */}
      <rect x="118" y="178" width="28" height="50" rx="3" fill="#001510" stroke={cyanDim} strokeWidth="0.8"/>
      <rect x="154" y="178" width="28" height="50" rx="3" fill="#001510" stroke={cyanDim} strokeWidth="0.8"/>
      {/* 腹部パネル */}
      <rect x="120" y="238" width="60" height="46" rx="3" fill="#001510" stroke={cyanDim} strokeWidth="0.8"/>
      {/* ロゴ */}
      <text x="150" y="267" textAnchor="middle" fontSize="7" fill={cyan} opacity="0.5" fontFamily="monospace">HUMAN v1.0</text>

      {/* 左腕 */}
      <rect x="76" y="172" width="28" height="90" rx="5" fill="#0a1a1a" stroke={cyan} strokeWidth="1"/>
      {/* 左手 */}
      <rect x="74" y="265" width="32" height="40" rx="4" fill="#0a1a1a" stroke={cyan} strokeWidth="1"/>
      <rect x="80" y="270" width="5" height="28" rx="2" fill="#001a10" stroke={cyanDim} strokeWidth="0.6"/>
      <rect x="88" y="268" width="5" height="30" rx="2" fill="#001a10" stroke={cyanDim} strokeWidth="0.6"/>
      <rect x="96" y="270" width="5" height="28" rx="2" fill="#001a10" stroke={cyanDim} strokeWidth="0.6"/>

      {/* 右腕 */}
      <rect x="196" y="172" width="28" height="90" rx="5" fill="#0a1a1a" stroke={cyan} strokeWidth="1"/>
      {/* 右手 */}
      <rect x="194" y="265" width="32" height="40" rx="4" fill="#0a1a1a" stroke={cyan} strokeWidth="1"/>

      {/* 左脚 */}
      <rect x="118" y="300" width="28" height="100" rx="5" fill="#0a1a1a" stroke={cyan} strokeWidth="1"/>
      <rect x="116" y="395" width="32" height="16" rx="3" fill="#0a1a1a" stroke={cyan} strokeWidth="1"/>
      {/* 右脚 */}
      <rect x="154" y="300" width="28" height="100" rx="5" fill="#0a1a1a" stroke={cyan} strokeWidth="1"/>
      <rect x="152" y="395" width="32" height="16" rx="3" fill="#0a1a1a" stroke={cyan} strokeWidth="1"/>

      {/* ===== 計測点 & ラベルライン ===== */}
      {PARTS.map((p) => {
        const meta  = scores[p.id]
        const isHov = hoveredId === p.id
        const lx    = p.side === 'left' ? LABEL_X_LEFT : LABEL_X_RIGHT
        const color = isHov ? cyan : cyanDim

        return (
          <g key={p.id} onMouseEnter={() => onHover(p.id)} onMouseLeave={() => onHover(null)}>
            {/* ライン */}
            <line
              x1={p.cx} y1={p.cy}
              x2={lx}   y2={p.cy}
              stroke={color} strokeWidth={isHov ? 1 : 0.5}
              strokeDasharray={isHov ? 'none' : '3 2'}
            />
            {/* 計測点 */}
            <circle cx={p.cx} cy={p.cy} r={isHov ? 5 : 3} fill={dark} stroke={color} strokeWidth="1.2"/>
            {isHov && <circle cx={p.cx} cy={p.cy} r="2" fill={cyan}/>}

            {/* ラベル */}
            <text
              x={p.side === 'left' ? lx - 2 : lx + 2}
              y={p.cy + 4}
              textAnchor={p.side === 'left' ? 'end' : 'start'}
              fontSize="7"
              fill={isHov ? cyan : '#00ffe766'}
              fontFamily="monospace"
            >
              {p.id}
              {meta ? ` ${meta.displayVal}${meta.unit}` : ''}
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

  return (
    <div className="relative">
      <RobotSVG scores={scores} onHover={setHoveredId} hoveredId={hoveredId}/>

      {/* ホバーポップアップ */}
      {hovered && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none
          border border-cyan-400 bg-black/90 px-4 py-3 text-xs min-w-[200px] border-glow">
          <p className="text-cyan-400 font-bold tracking-widest mb-1">[{hoveredId}] {hovered.label}</p>
          <p className="text-cyan-300/60 mb-2">{hovered.part}</p>
          <p className="text-cyan-100 text-lg font-bold">
            {hovered.displayVal}
            <span className="text-cyan-500 text-xs ml-1">{hovered.unit}</span>
          </p>
          <div className="mt-2 w-full bg-cyan-950 h-1">
            <div
              className="h-1 bg-cyan-400"
              style={{ width: `${hovered.inverted ? 100 - hovered.base : hovered.base}%` }}
            />
          </div>
          <p className="text-cyan-600 text-right mt-1">
            {hovered.inverted ? 100 - hovered.base : hovered.base} / 100
          </p>
        </div>
      )}
    </div>
  )
}
