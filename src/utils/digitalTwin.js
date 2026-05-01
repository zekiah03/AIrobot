// Digital Twin Engine
// Layer 1 (AIrobot specs) → Layer 2 (Morpho axes) → Layer 3 (emotion) → Layer 4 (Resonance pattern)
// Theory: see DIGITAL_TWIN_THEORY.md

export const AXIS_META = {
  A: { name: '構造複雑性',  desc: '認知処理・思考の多層性' },
  B: { name: 'エネルギー代謝', desc: '持続力・効率・活力' },
  C: { name: '入出力',     desc: 'センサーと表現力の総量' },
  D: { name: '制御・自律性', desc: '反射精度と意思決定力' },
  E: { name: '健康・耐久',  desc: 'ストレス耐性と回復速度' },
  F: { name: '環境依存度',  desc: '外部条件への依存レベル' },
  G: { name: '社交性',     desc: '対人接続・共鳴能力' },
  H: { name: '重力・影響力', desc: '他者への吸引力・存在感' },
  I: { name: '排除・免疫',  desc: 'ノイズ除去・感情回復力' },
  J: { name: '流動性',     desc: '情報処理と記憶の流れ' },
  K: { name: 'プライド',   desc: '自己イメージ・誇り' },
  L: { name: '生命力',     desc: '持続性・死との距離（10=不滅）' },
};

export const TWIN_EMOTIONS = {
  joy:         { nameJa: '喜び',         valence:  1.5, arousal:  1.5 },
  excitement:  { nameJa: '高揚',         valence:  1.5, arousal:  2.0 },
  pride:       { nameJa: '誇り',         valence:  1.5, arousal:  0.5 },
  flow:        { nameJa: 'フロー',       valence:  1.5, arousal:  0.5 },
  curiosity:   { nameJa: '好奇心',       valence:  1.0, arousal:  1.0 },
  gratitude:   { nameJa: '感謝',         valence:  1.5, arousal:  0.0 },
  awe:         { nameJa: '畏敬',         valence:  0.5, arousal:  1.5 },
  contentment: { nameJa: '静謐',         valence:  1.0, arousal: -1.5 },
  nostalgia:   { nameJa: 'ノスタルジア', valence:  0.0, arousal:  0.0 },
  loneliness:  { nameJa: '寂しさ',       valence: -1.0, arousal: -0.5 },
  boredom:     { nameJa: '退屈',         valence: -0.5, arousal: -1.5 },
  sadness:     { nameJa: '悲しみ',       valence: -1.5, arousal: -0.5 },
  anxiety:     { nameJa: '不安',         valence: -1.5, arousal:  1.5 },
  fear:        { nameJa: '恐怖',         valence: -1.5, arousal:  1.0 },
  anger:       { nameJa: '怒り',         valence: -1.5, arousal:  1.5 },
};

export const EMOTION_TO_PATTERN = {
  joy:         { id: 'laughter',       trajectoryType: 'I',    label: '笑い' },
  excitement:  { id: 'nori',           trajectoryType: 'VII',  label: 'ノリの良さ' },
  pride:       { id: 'catharsis',      trajectoryType: 'IV',   label: 'カタルシス' },
  flow:        { id: 'conv_pleasure',  trajectoryType: 'VII',  label: '会話の気持ちよさ' },
  curiosity:   { id: 'fukusen',        trajectoryType: 'II',   label: '伏線回収の快感' },
  gratitude:   { id: 'kandou',         trajectoryType: 'IV',   label: '感動' },
  awe:         { id: 'odoroki',        trajectoryType: 'III',  label: '驚き' },
  contentment: { id: 'yoi_anshin',     trajectoryType: 'VIII', label: '予想通りの安心感' },
  nostalgia:   { id: 'nakeru',         trajectoryType: 'IV',   label: '泣けるドラマ' },
  loneliness:  { id: 'kimazui',        trajectoryType: 'V',    label: '気まずさ' },
  boredom:     { id: 'taikutsu',       trajectoryType: 'VIII', label: '退屈' },
  sadness:     { id: 'nakeru',         trajectoryType: 'IV',   label: '泣けるドラマ' },
  anxiety:     { id: 'suspense',       trajectoryType: 'V',    label: 'サスペンス' },
  fear:        { id: 'kowai_chinmoku', trajectoryType: 'V',    label: '怖い沈黙' },
  anger:       { id: 'catharsis',      trajectoryType: 'IV',   label: 'カタルシス' },
};

function toAxis(base) {
  return Math.round(Math.min(10, Math.max(0, base / 10)) * 10) / 10;
}

function mean(...vals) {
  const v = vals.filter(x => x != null && !isNaN(x));
  return v.length ? v.reduce((a, b) => a + b, 0) / v.length : 50;
}

// Layer 1 → Layer 2
export function specsToAxes(scores) {
  const g = (id) => scores[id]?.base ?? 50;
  return {
    A: toAxis(mean(g('CPU'), g('GPU'), g('NPU'))),
    B: toAxis(mean(g('PSU'), g('EFF'))),
    C: toAxis(mean(g('CAM'), g('MIC'), g('SPK'), g('TCH'))),
    D: toAxis(mean(g('FW'),  g('LAT'))),
    E: toAxis(mean(g('PSU'), g('EFF'), g('THM'))),
    F: toAxis(100 - mean(g('EFF'), g('FW'))),
    G: toAxis(mean(g('NET'), g('SPK'))),
    H: toAxis(mean(g('NET'), g('SPK'), g('GPU'))),
    I: toAxis(mean(g('THM'), g('EXH'))),
    J: toAxis(mean(g('RAM'), g('SSD'), g('HDD'))),
    K: toAxis(mean(g('CPU'), g('HDD'), g('NPU'))),
    L: toAxis(mean(g('PSU'), g('EFF'), g('FRM'))),
  };
}

// Layer 2 → valence/arousal
export function axesToEmotionCoords(axes) {
  const valenceRaw =
    axes.B * 0.25 +
    axes.G * 0.20 +
    axes.E * 0.20 +
    axes.L * 0.15 +
    axes.J * 0.10 +
    (10 - axes.F) * 0.10;

  const arousalRaw =
    axes.A * 0.25 +
    axes.C * 0.20 +
    axes.D * 0.20 +
    axes.H * 0.20 +
    axes.I * 0.15;

  return {
    valence: Math.round((valenceRaw / 10 * 4 - 2) * 100) / 100,
    arousal: Math.round((arousalRaw / 10 * 4 - 2) * 100) / 100,
  };
}

// valence/arousal → nearest emotion
export function coordsToEmotion(valence, arousal) {
  let minDist = Infinity;
  let closestId = 'nostalgia';
  for (const [id, e] of Object.entries(TWIN_EMOTIONS)) {
    const d = Math.hypot(e.valence - valence, e.arousal - arousal);
    if (d < minDist) { minDist = d; closestId = id; }
  }
  return { id: closestId, ...TWIN_EMOTIONS[closestId] };
}

// Derive active transitions based on current emotion + axis values
function deriveTransitions(emotionId, axes) {
  const graph = {
    joy: [
      { to: 'pride',       label: '自己帰属',   cond: axes.K > 6 },
      { to: 'gratitude',   label: '他者帰属',   cond: axes.G > 6 },
      { to: 'flow',        label: '活動没入',   cond: axes.J > 6 },
      { to: 'contentment', label: '強度減衰',   cond: axes.B < 5 },
      { to: 'anxiety',     label: '次への不安', cond: axes.E < 4 },
    ],
    anxiety: [
      { to: 'fear',        label: '脅威具体化',  cond: axes.D < 4 },
      { to: 'anger',       label: '脅威への攻撃', cond: axes.I > 6 },
      { to: 'curiosity',   label: '対象への探索', cond: axes.A > 6 },
      { to: 'contentment', label: '脅威解除',   cond: axes.E > 7 },
    ],
    sadness: [
      { to: 'nostalgia',   label: '記憶の美化', cond: axes.J > 5 },
      { to: 'loneliness',  label: '孤立感拡大', cond: axes.G < 4 },
      { to: 'gratitude',   label: '支援の認識', cond: axes.G > 7 },
    ],
    curiosity: [
      { to: 'awe',         label: '規模感の拡大', cond: axes.A > 7 },
      { to: 'flow',        label: '完全没入',   cond: axes.J > 7 && axes.D > 6 },
      { to: 'boredom',     label: '探索の停滞', cond: axes.A < 4 },
    ],
    pride: [
      { to: 'joy',         label: '共有・祝福', cond: axes.G > 6 },
      { to: 'contentment', label: '達成の安定', cond: axes.E > 6 },
      { to: 'anxiety',     label: '地位の不安', cond: axes.D < 4 },
    ],
    anger: [
      { to: 'sadness',     label: '消耗・後悔', cond: axes.B < 4 },
      { to: 'pride',       label: '自己正当化', cond: axes.K > 7 },
      { to: 'contentment', label: '解決・放棄', cond: axes.I > 6 },
    ],
  };

  return (graph[emotionId] ?? [])
    .filter(t => t.cond)
    .map(({ to, label }) => ({ to, label, targetNameJa: TWIN_EMOTIONS[to]?.nameJa ?? to }));
}

// Main: build complete digital twin from AIrobot calcScores() output
export function buildDigitalTwin(scores) {
  const axes = specsToAxes(scores);
  const { valence, arousal } = axesToEmotionCoords(axes);
  const emotion = coordsToEmotion(valence, arousal);
  const pattern = EMOTION_TO_PATTERN[emotion.id];
  const transitions = deriveTransitions(emotion.id, axes);

  return {
    axes,
    emotionState: { ...emotion, valence, arousal, transitions },
    affectivePattern: pattern,
  };
}
