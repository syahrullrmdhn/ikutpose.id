import { useRef, useCallback, useState, useEffect } from 'react'

export function useCamera() {
  const webcamRef = useRef(null)
  const [mirrored, setMirrored] = useState(true)
  const [error, setError] = useState(null)
  const [devices, setDevices] = useState([])
  const [activeDeviceId, setActiveDeviceId] = useState(null)
  const [facingMode, setFacingMode] = useState('user')
  const [orientation, setOrientation] = useState('landscape')

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent)
  const isDesktop = !isMobile && !isTablet

  useEffect(() => {
    const detectOrientation = () => {
      if (isDesktop) { setOrientation('landscape'); return }
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
    }
    detectOrientation()
    window.addEventListener('resize', detectOrientation)
    return () => window.removeEventListener('resize', detectOrientation)
  }, [isDesktop])

  useEffect(() => {
    const getDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        stream.getTracks().forEach((t) => t.stop())
        const allDevices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = allDevices.filter((d) => d.kind === 'videoinput')
        setDevices(videoDevices)

        if (videoDevices.length > 0) {
          const front = videoDevices.find((d) => d.label.toLowerCase().includes('front') || d.label.toLowerCase().includes('facetime'))
          const back = videoDevices.find((d) => d.label.toLowerCase().includes('back') || d.label.toLowerCase().includes('rear'))

          if (isMobile && front) { setActiveDeviceId(front.deviceId); setFacingMode('user'); setMirrored(true) }
          else if (isMobile && back) { setActiveDeviceId(back.deviceId); setFacingMode('environment'); setMirrored(false) }
          else { setActiveDeviceId(videoDevices[0].deviceId); setFacingMode('user'); setMirrored(true) }
        }
      } catch (err) {
        setError('Tidak bisa mengakses kamera. Pastikan izin kamera diaktifkan.')
      }
    }
    getDevices()
  }, [isMobile])

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (!imageSrc) { setError('Gagal mengambil foto'); return null }
    return imageSrc
  }, [])

  // Capture FULL frame tanpa crop - biarkan hasil asli kamera
  const captureFull = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (!imageSrc) { setError('Gagal mengambil foto'); return null }
    return imageSrc
  }, [])

  const toggleMirror = useCallback(() => setMirrored((m) => !m), [])

  const switchCamera = useCallback(() => {
    if (devices.length < 2) return
    const isFront = facingMode === 'user'
    const targetMode = isFront ? 'environment' : 'user'
    const targetDevice = devices.find((d) => {
      const l = d.label.toLowerCase()
      if (targetMode === 'user') return l.includes('front') || l.includes('facetime')
      return l.includes('back') || l.includes('rear')
    })
    if (targetDevice) {
      setActiveDeviceId(targetDevice.deviceId); setFacingMode(targetMode); setMirrored(targetMode === 'user')
    } else {
      const nextIndex = devices.findIndex((d) => d.deviceId === activeDeviceId)
      const next = (nextIndex + 1) % devices.length
      setActiveDeviceId(devices[next].deviceId); setMirrored(false)
    }
  }, [devices, activeDeviceId, facingMode])

  const selectCamera = useCallback((deviceId) => {
    setActiveDeviceId(deviceId)
    const device = devices.find((d) => d.deviceId === deviceId)
    if (device) {
      const l = device.label.toLowerCase()
      const isFront = l.includes('front') || l.includes('facetime')
      setMirrored(isFront); setFacingMode(isFront ? 'user' : 'environment')
    }
  }, [devices])

  // Tidak paksa resolusi — biarkan kamera pakai default/natural
  const videoConstraints = {
    facingMode,
    ...(activeDeviceId ? { deviceId: { exact: activeDeviceId } } : {}),
  }

  const hasMultipleCameras = devices.length > 1
  const currentDevice = devices.find((d) => d.deviceId === activeDeviceId)
  const currentDeviceLabel = currentDevice?.label || 'Kamera'

  return {
    webcamRef, mirrored, setMirrored, toggleMirror, capture, captureFull, error,
    devices, activeDeviceId, selectCamera, switchCamera,
    videoConstraints, facingMode,
    isMobile, isTablet, isDesktop, hasMultipleCameras, currentDeviceLabel,
    orientation,
  }
}
