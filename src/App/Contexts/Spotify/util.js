import animatedScroll from '@robinnnnn/scroll-to'

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
