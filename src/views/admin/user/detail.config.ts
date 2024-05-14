
export const detailConfig = [
  { label: '房间号', key: 'room' },
  {
    label: '模式',
    key: 'mode',
    formatter: (val: any) => ['制冷', '制暖'][val],
  },
  { label: '风速', key: 'speed' },
  {
    label: '温度',
    key: 'temperature',
  },
  {
    label: '在线状态',
    key: 'onlineStatus',
  },
]
