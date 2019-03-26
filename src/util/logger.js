import moment from 'moment'

export const log = (type, ...messages) => {
  const ts = moment().format('hh:mm:ss')
  const style = {
    trace: 'color: #EF746E',
    info: 'color: #353AD8',
    error: 'background: #e2312b; color: #ffffff'
  }
  messages.forEach(m => {
    if (typeof m === 'object') {
      console.log(`%c[${ts}]`, style[type], ' ', m)
      return
    }
    console.log(`%c[${ts}] ${m}`, style[type])
  })
}
