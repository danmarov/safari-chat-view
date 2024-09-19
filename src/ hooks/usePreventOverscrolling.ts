import { useEffect, useRef } from 'react'

import findNearestScrollContainer from '../lib/findNearestScrollContainer'

// On iOS in the browser you can pull on elements down / make the page bounce
// similar to pull to refresh. This causes weird behavior when trying to
// simulate a full screen app.
// This is a partial fix for edge cases where this is still possible (e.g. on
// iOS 15 when hiding the button bar via the Aa button on the address bar). Most
// regular cases are fixed properly by ensuring the page content height isn't
// larger than the viewport.
const usePreventOverScrolling = () => {
  const container = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const elem = container.current
    if (!elem) {
      return
    }

    let startTouch: Touch | undefined = undefined
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        return
      }
      startTouch = e.touches[0]
    }
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1 || !startTouch) {
        return
      }

      const deltaY = startTouch.pageY - e.targetTouches[0].pageY
      const deltaX = startTouch.pageX - e.targetTouches[0].pageX
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal scroll probably
        return
      }

      const target = e.target as HTMLElement
      const nearestScrollContainer = findNearestScrollContainer(target)
      if (!nearestScrollContainer) {
        console.log('Preventing scroll: no nearest scroll container')
        e.preventDefault()
        return
      }

      const isScrollingUp = deltaY < 0
      const isAtTop = nearestScrollContainer.scrollTop === 0
      if (isScrollingUp && isAtTop) {
        console.log(
          'Preventing scroll: already at top of nearest scroll container',
        )
        e.preventDefault()
        return
      }
      const isAtBottom =
        nearestScrollContainer.scrollTop ===
        nearestScrollContainer.scrollHeight -
          nearestScrollContainer.clientHeight
      if (!isScrollingUp && isAtBottom) {
        console.log(
          'Preventing scroll: already at bottom of nearest scroll container',
        )
        e.preventDefault()
        return
      }
    }

    elem.addEventListener('touchstart', handleTouchStart)
    elem.addEventListener('touchmove', handleTouchMove)
    return () => {
      elem.removeEventListener('touchstart', handleTouchStart)
      elem.removeEventListener('touchmove', handleTouchMove)
    }
  }, [container])

  return container
}

export default usePreventOverScrolling