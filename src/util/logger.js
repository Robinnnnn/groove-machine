import moment from 'moment'

export const log = (type, ...messages) => {
  const ts = moment().format('hh:mm:ss')
  const style = {
    trace: 'color: #EF746E',
    info: 'color: #353AD8',
    error: 'background: #e2312b; color: #ffffff'
  }
  messages.forEach((m, i) => {
    const indent = !i ? '' : ' '
    const output =
      typeof m === 'object'
        ? [`%c[${ts}]`, style[type], indent, m]
        : [`%c[${ts}] ${indent}${m}`, style[type]]
    console.log(...output)
  })
}
