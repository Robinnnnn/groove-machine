import animatedScroll from '@robinnnnn/scroll-to'

export const refreshToken = async (refreshToken, spotify) => {
  const res = await fetch(`/api/refresh_token?refresh_token=${refreshToken}`)
  const json = await res.json()
  const aToken = json.access_token
  console.log('~~~ refresh token', refreshToken, aToken)
  return aToken
}

export const scrollToNode = node => {
  const bounds = node.getBoundingClientRect()
  const middle = window.scrollY + bounds.top - window.innerHeight / 2 + bounds.height / 2
  const config = {
    duration: 2500,
    ease: 'inOutQuint',
    cancelOnUserScroll: true
  }
  animatedScroll(0, middle, config)
}
