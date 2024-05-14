import dayjs from 'dayjs'
export const tableColumns = [
  {
    label: '房间号',
    prop: 'room',
  },
  {
    label: '模式',
    prop: 'mode',
  },
  {
    label: '风速',
    prop: 'speed',
  },
  {
    label: '温度',
    prop: 'temperature',
  },
  {
    label: '在线状态',
    prop: 'onlineStatus'
  },
]

export const filterFields: Array<FilterFieldType> = [
  {
    label: '房间号',
    model: 'room',
    componentName: 'el-input',
    componentProps: {
      placeholder: '请输入房间号',
      clearable: true,
    },
  },

]
