import { categoryMeta } from '../data/questions'

const GRADES = [
  { min: 90, grade: 'S+', title: '次世代量子コンピューター型' },
  { min: 80, grade: 'S',  title: '超高性能サーバー型' },
  { min: 70, grade: 'A+', title: 'ハイエンドワークステーション型' },
  { min: 60, grade: 'A',  title: 'ゲーミングPC型' },
  { min: 50, grade: 'B+', title: '標準スペックPC型' },
  { min: 40, grade: 'B',  title: 'エントリーモデル型' },
  { min: 30, grade: 'C',  title: 'レガシーシステム型' },
  { min: 0,  grade: 'D',  title: '省電力組込型' },
]

function seededRandom(seed) {
  // 再現性のある乱数（同じ回答 → 同じ結果）
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

export function calcScores(answers) {
  // カテゴリごとに回答をまとめる
  const grouped = {}
  for (const { category, value } of Object.values(answers)) {
    if (!grouped[category]) grouped[category] = []
    grouped[category].push(value)
  }

  // 全回答の合計をシードに使う（再現性）
  const seed = Object.values(answers).reduce((acc, a) => acc + a.value * 7, 0)
  const rand = seededRandom(seed)

  const scores = {}
  let totalBase = 0
  let count = 0

  for (const [catId, meta] of Object.entries(categoryMeta)) {
    const vals = grouped[catId] ?? []
    const avg = vals.length > 0
      ? vals.reduce((a, b) => a + b, 0) / vals.length
      : 3 // 未回答カテゴリは中間値

    const base = (avg - 1) / 4  // 0.0〜1.0

    // ±15% のゆらぎ（診断感の演出）
    const factor = 0.85 + rand() * 0.30

    let displayVal
    if (meta.inverted) {
      // LAT: スコアが高いほど数値が小さい（低レイテンシ）
      displayVal = Math.max(1, Math.round((1 - base) * meta.maxVal * factor))
    } else {
      displayVal = Math.min(meta.maxVal, Math.round(base * meta.maxVal * factor))
    }

    scores[catId] = {
      ...meta,
      base: Math.round(base * 100),   // 0〜100（グレード計算用）
      displayVal,
    }

    totalBase += base * 100
    count++
  }

  const totalScore = Math.round(totalBase / count)
  const gradeInfo = GRADES.find((g) => totalScore >= g.min) ?? GRADES[GRADES.length - 1]

  return {
    scores,
    totalScore,
    grade: gradeInfo.grade,
    title: gradeInfo.title,
  }
}
