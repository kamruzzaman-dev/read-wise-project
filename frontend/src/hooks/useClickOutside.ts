import { useEffect } from 'react'

export const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const outsideHandler = (e) => {
      const el = ref?.current
      if (!el || el.contains(e.target)) {
        return
      }
      handler(e)
    }
    document.addEventListener('mousedown', outsideHandler)
    document.addEventListener('touchstart', outsideHandler)
    return () => {
      document.addEventListener('mousedown', outsideHandler)
      document.addEventListener('touchstart', outsideHandler)
    }
  }, [ref, handler])
}
