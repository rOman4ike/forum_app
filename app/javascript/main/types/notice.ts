type NoticeType = 'success' | 'danger' | 'warning' | 'info'

export default interface Notice {
  title: string,
  type: NoticeType,
  text: string,
  list?: Array<string>
}