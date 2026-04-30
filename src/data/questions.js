export const questions = [
  {
    id: 1,
    category: 'CPU',
    text: '複雑な問題に直面したとき、頭の中で素早く整理して解決策を出せる方だ',
  },
  {
    id: 2,
    category: 'CPU',
    text: '数字やパズルを解くのが得意で、論理的な手順を踏むのが自然にできる',
  },
  {
    id: 3,
    category: 'GPU',
    text: '頭の中でものごとを3D映像のように立体的に想像できる',
  },
  {
    id: 4,
    category: 'GPU',
    text: '地図や図面を見ると、すぐに空間全体を把握できる',
  },
  {
    id: 5,
    category: 'NPU',
    text: '初対面の人や場の雰囲気を、わずかな情報から素早く読み取れる',
  },
  {
    id: 6,
    category: 'NPU',
    text: 'パターンや法則性を、人より早く見つけられると感じる',
  },
  {
    id: 7,
    category: 'RAM',
    text: '複数のことを同時に考えたり、並行して作業するのが得意だ',
  },
  {
    id: 8,
    category: 'RAM',
    text: '会話中に相手の言ったことを正確に覚えていて、後から引用できる',
  },
  {
    id: 9,
    category: 'SSD',
    text: '必要な知識や記憶を、素早くピンポイントで引き出せる',
  },
  {
    id: 10,
    category: 'HDD',
    text: '自分の人生経験や学んだ知識の量は、周囲と比べて多い方だと思う',
  },
  {
    id: 11,
    category: 'CAM',
    text: '細かい変化（表情・色・形の違い）を人より早く気づく方だ',
  },
  {
    id: 12,
    category: 'CAM',
    text: '初めて行った場所でも、構造や配置を一瞬で把握できる',
  },
  {
    id: 13,
    category: 'MIC',
    text: '音の微妙なニュアンス（声のトーン・遠くの音）を敏感に感じ取れる',
  },
  {
    id: 14,
    category: 'SPK',
    text: '自分の考えを言葉にして、相手に正確に伝えることが得意だ',
  },
  {
    id: 15,
    category: 'SPK',
    text: '声が通ると言われる、または話すと聞き取りやすいと言われることが多い',
  },
  {
    id: 16,
    category: 'TCH',
    text: '手触りや質感の違いを、細かく識別できる方だ',
  },
  {
    id: 17,
    category: 'GYR',
    text: 'スポーツや運動でバランスを保つのが得意で、転びにくい',
  },
  {
    id: 18,
    category: 'PSU',
    text: '体力・スタミナに自信があり、長時間の活動でも持続できる',
  },
  {
    id: 19,
    category: 'PSU',
    text: '朝から夜まで集中力が続き、疲れにくい体質だと思う',
  },
  {
    id: 20,
    category: 'EFF',
    text: '最小限の努力で最大の成果を出す方法を、自然に考えられる',
  },
  {
    id: 21,
    category: 'EFF',
    text: '無駄な動きが少なく、作業や行動がコンパクトにまとまっている方だ',
  },
  {
    id: 22,
    category: 'THM',
    text: '強いストレスを受けても、短時間で気持ちを切り替えられる',
  },
  {
    id: 23,
    category: 'EXH',
    text: '嫌なことや不要な情報を、引きずらずに忘れることができる',
  },
  {
    id: 24,
    category: 'ACT',
    text: '力仕事や身体を使う作業が得意で、パワーには自信がある',
  },
  {
    id: 25,
    category: 'SRV',
    text: '手先が器用で、細かい作業（工作・料理・楽器など）が得意だ',
  },
  {
    id: 26,
    category: 'SRV',
    text: '文字を丁寧に書いたり、精密な操作を正確にこなせる',
  },
  {
    id: 27,
    category: 'FRM',
    text: '姿勢が良いとよく言われる、または体の軸がしっかりしている方だ',
  },
  {
    id: 28,
    category: 'NET',
    text: '初対面の人ともすぐに打ち解けられ、人脈を広げるのが得意だ',
  },
  {
    id: 29,
    category: 'LAT',
    text: '危険や変化に対して、反射的に素早く反応できる方だ',
  },
  {
    id: 30,
    category: 'FW',
    text: '何も考えなくても体が自然に動く、よく訓練された自動的な行動パターンがある',
  },
]

export const categoryMeta = {
  CPU: { label: '演算ユニット', unit: 'GHz', part: 'CPU', maxVal: 9999 },
  GPU: { label: '描画ユニット', unit: 'TFLOPS', part: 'GPU', maxVal: 9999 },
  NPU: { label: '推論チップ', unit: 'TOPS', part: 'NPU', maxVal: 9999 },
  RAM: { label: '揮発メモリ', unit: 'GB', part: 'RAM', maxVal: 9999 },
  SSD: { label: '高速ストレージ', unit: 'MB/s', part: 'SSD', maxVal: 9999 },
  HDD: { label: '大容量ストレージ', unit: 'TB', part: 'HDD', maxVal: 9999 },
  CAM: { label: '視覚センサー', unit: 'MP', part: 'Camera', maxVal: 9999 },
  MIC: { label: '音声センサー', unit: 'dB', part: 'Microphone', maxVal: 9999 },
  SPK: { label: '音声出力', unit: 'Hz', part: 'Speaker', maxVal: 9999 },
  TCH: { label: '触覚センサー', unit: 'pt', part: 'Touch', maxVal: 9999 },
  GYR: { label: '姿勢センサー', unit: 'rpm', part: 'Gyroscope', maxVal: 9999 },
  PSU: { label: '動力源', unit: 'W', part: 'PSU', maxVal: 9999 },
  EFF: { label: '稼働効率', unit: '%', part: 'Efficiency', maxVal: 9999 },
  THM: { label: '排熱システム', unit: 'RPM', part: 'Cooling', maxVal: 9999 },
  EXH: { label: '廃棄エンジン', unit: 'L/min', part: 'Exhaust', maxVal: 9999 },
  ACT: { label: '粗動駆動系', unit: 'N', part: 'Actuator', maxVal: 9999 },
  SRV: { label: '精密駆動系', unit: 'mm', part: 'Servo', maxVal: 9999 },
  FRM: { label: 'フレーム剛性', unit: 'MPa', part: 'Frame', maxVal: 9999 },
  NET: { label: '通信モジュール', unit: 'Gbps', part: 'Network', maxVal: 9999 },
  LAT: { label: '応答遅延', unit: 'ms', part: 'Latency', maxVal: 999, inverted: true },
  FW:  { label: '基本制御', unit: 'ver', part: 'Firmware', maxVal: 9999 },
}
