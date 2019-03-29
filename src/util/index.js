const _appendLeadingZero = n => (n < 10 ? `0${n}` : n)

export const msToTimestamp = ms => {
  const h = Math.floor(ms / 60000 / 60)
  const m = Math.floor((ms / 60000) % 60)
  const s = Math.floor((ms % 60000) / 1000).toFixed(0)
  const t = [m, s]
  if (h) t.unshift(h)
  return t.map(_appendLeadingZero).join(':')
}

export { log } from './logger'
