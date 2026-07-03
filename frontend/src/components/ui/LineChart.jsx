import { useRef, useEffect } from 'react'

export default function LineChart({ data, labels, color = '#ff4d50', height = 200 }) {
 const canvasRef = useRef(null)

 useEffect(() => {
 const canvas = canvasRef.current
 if (!canvas || !data?.length || !labels?.length) return

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

 // X labels
 ctx.fillStyle = '#a3a3a3'
 ctx.font = '11px Plus Jakarta Sans, system-ui'
 ctx.textAlign = 'center'
 const xStep = data.length > 1 ? chartW / (data.length - 1) : chartW
 labels.forEach((label, i) => {
 const x = padding.left + xStep * i
 if (isFinite(x)) ctx.fillText(label ?? '', x, h - 8)
 })

 // Line points
 const points = data.map((val, i) => ({
 x: padding.left + (data.length > 1 ? (chartW / (data.length - 1)) * i : chartW / 2),
 y: padding.top + chartH - (val / max) * chartH,
 }))

 if (points.length === 0) return

 // Area fill
 ctx.beginPath()
 ctx.moveTo(points[0].x, points[0].y)
 points.forEach((p, i) => {
 if (i > 0) {
 const prev = points[i - 1]
 const cpx = (prev.x + p.x) / 2
 ctx.bezierCurveTo(cpx, prev.y, cpx, p.y, p.x, p.y)
 }
 })
 ctx.lineTo(points[points.length - 1].x, padding.top + chartH)
 ctx.lineTo(points[0].x, padding.top + chartH)
 ctx.closePath()

 const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH)
 gradient.addColorStop(0, color + '30')
 gradient.addColorStop(1, color + '05')
 ctx.fillStyle = gradient
 ctx.fill()

 // Line stroke
 ctx.beginPath()
 ctx.moveTo(points[0].x, points[0].y)
 points.forEach((p, i) => {
 if (i > 0) {
 const prev = points[i - 1]
 const cpx = (prev.x + p.x) / 2
 ctx.bezierCurveTo(cpx, prev.y, cpx, p.y, p.x, p.y)
 }
 })
 ctx.strokeStyle = color
 ctx.lineWidth = 2.5
 ctx.lineCap = 'round'
 ctx.lineJoin = 'round'
 ctx.stroke()

 // Dots
 points.forEach((p) => {
 ctx.beginPath()
 ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
 ctx.fillStyle = '#ffffff'
 ctx.fill()
 ctx.strokeStyle = color
 ctx.lineWidth = 2.5
 ctx.stroke()
 })
 }, [data, labels, color, height])

 return (
 <canvas
 ref={canvasRef}
 style={{ width: '100%', height: `${height}px` }}
 />
 )
}
