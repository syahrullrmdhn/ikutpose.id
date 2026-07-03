import { useState, useCallback, useRef } from 'react'

export function useCountdown(seconds = 3) {
  const [count, setCount] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  const start = useCallback(
    (onComplete) => {
      setCount(seconds)
      setIsRunning(true)
      let remaining = seconds

      intervalRef.current = setInterval(() => {
        remaining -= 1
        if (remaining <= 0) {
          clearInterval(intervalRef.current)
          setCount(null)
          setIsRunning(false)
          onComplete?.()
        } else {
          setCount(remaining)
        }
      }, 1000)
    },
    [seconds]
  )

  const cancel = useCallback(() => {
    clearInterval(intervalRef.current)
    setCount(null)
    setIsRunning(false)
  }, [])

  return { count, isRunning, start, cancel }
}
