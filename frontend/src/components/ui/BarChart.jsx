import { useRef, useEffect } from 'react'

export default function BarChart({ data, labels, color = '#ff4d50', height = 200 }) {
 const canvasRef = useRef(null)

 useEffect(() => {
 const canvas = canvasRef.current
 if (!canvas || !data?.length) return

 const ctx = canvas.getContext('2d')
 const dpr = window.devicePixelRatio || 1
 const rect = canvas.getBoundingClientRect()

 if (rect.width === 0) return

 canvas.width = rect.width * dpr
 canvas.height = height * dpr
 ctx.scale(dpr, dpr)

 const w = rect.width
 const h = height
 const padding = { top: 20, right: 20, bottom: 30, left: 40 }
 const chartW = Math.max(w - padding.left - padding.right, 1)
 const chartH = Math.max(h - padding.top - padding.bottom, 1)

 const max = Math.max(...data, 1)

 ctx.clearRect(0, 0, w, h)

 // Grid lines
 ctx.strokeStyle = '#f5f5f5'
 ctx.lineWidth = 1
 for (let i = 0; i <= 4; i++) {
 const y = padding.top + (chartH / 4) * i
 ctx.beginPath()
 ctx.moveTo(padding.left, y)
 ctx.lineTo(w - padding.right, y)
 ctx.stroke()

 const val = Math.round(max - (max / 4) * i)
 ctx.fillStyle = '#a3a3a3'
 ctx.font = '11px Plus Jakarta Sans, system-ui'
 ctx.textAlign = 'right'
 ctx.fillText(val, padding.left - 8, y + 4)
 }

 const barWidth = Math.max(Math.min((chartW / data.length) * 0.6, 40), 4)
 const gap = chartW / data.length

 data.forEach((val, i) => {
 const barH = Math.max((val / max) * chartH, 0)
 const x = padding.left + gap * i + (gap - barWidth) / 2
 const y = padding.top + chartH - barH

 if (!isFinite(x) || !isFinite(y) || !isFinite(barWidth)) return

 // Bar
 const gradient = ctx.createLinearGradient(x, y, x, padding.top + chartH)
 gradient.addColorStop(0, color)
 gradient.addColorStop(1, color + '80')
 ctx.fillStyle = gradient

 ctx.beginPath()
 const radius = Math.min(6, barWidth / 2)
 ctx.moveTo(x + radius, y)
 ctx.lineTo(x + barWidth - radius, y)
 ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius)
 ctx.lineTo(x + barWidth, padding.top + chartH)
 ctx.lineTo(x, padding.top + chartH)
 ctx.lineTo(x, y + radius)
 ctx.quadraticCurveTo(x, y, x + radius, y)
 ctx.closePath()
 ctx.fill()

 // X label
 ctx.fillStyle = '#a3a3a3'
 ctx.font = '11px Plus Jakarta Sans, system-ui'
 ctx.textAlign = 'center'
 ctx.fillText(labels[i] ?? '', x + barWidth / 2, h - 8)
 })
 }, [data, labels, color, height])

 return (
 <canvas
 ref={canvasRef}
 style={{ width: '100%', height: `${height}px` }}
 />
 )
}
