import { useState, useRef, useCallback } from 'react'

export default function DraggableSticker({ sticker, index, onMove, onRemove }) {
 const [pos, setPos] = useState({ x: sticker.x || 50, y: sticker.y || 50 })
 const [dragging, setDragging] = useState(false)
 const [size, setSize] = useState(sticker.size || 48)
 const offsetRef = useRef({ x: 0, y: 0 })
 const containerRef = useRef(null)

 const handlePointerDown = useCallback((e) => {
 e.preventDefault()
 e.stopPropagation()
 const rect = e.currentTarget.getBoundingClientRect()
 offsetRef.current = {
 x: e.clientX - rect.left,
 y: e.clientY - rect.top,
 }
 setDragging(true)
 e.currentTarget.setPointerCapture(e.pointerId)
 }, [])

 const handlePointerMove = useCallback((e) => {
 if (!dragging) return
 e.preventDefault()

 const parent = e.currentTarget.parentElement
 if (!parent) return

 const parentRect = parent.getBoundingClientRect()
 const newX = e.clientX - parentRect.left - offsetRef.current.x
 const newY = e.clientY - parentRect.top - offsetRef.current.y

 const clampedX = Math.max(-size / 2, Math.min(newX, parentRect.width - size / 2))
 const clampedY = Math.max(-size / 2, Math.min(newY, parentRect.height - size / 2))

 const newPos = { x: clampedX, y: clampedY }
 setPos(newPos)
 onMove?.(index, newPos)
 }, [dragging, size, index, onMove])

 const handlePointerUp = useCallback(() => {
 setDragging(false)
 }, [])

 const handleWheel = useCallback((e) => {
 e.preventDefault()
 const delta = e.deltaY > 0 ? -4 : 4
 setSize((s) => {
 const newSize = Math.max(24, Math.min(120, s + delta))
 return newSize
 })
 }, [])

 return (
 <div
 ref={containerRef}
 className={`absolute select-none touch-none ${dragging ? 'z-50 cursor-grabbing' : 'z-10 cursor-grab'}`}
 style={{
 left: pos.x,
 top: pos.y,
 fontSize: size,
 lineHeight: 1,
 transform: dragging ? 'scale(1.15)' : 'scale(1)',
 transition: dragging ? 'none' : 'transform 0.15s',
 filter: dragging ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none',
 }}
 onPointerDown={handlePointerDown}
 onPointerMove={handlePointerMove}
 onPointerUp={handlePointerUp}
 onPointerCancel={handlePointerUp}
 onWheel={handleWheel}
 title="Drag untuk geser, scroll untuk resize, klik X untuk hapus"
 >
 {sticker.emoji}
 {/* Remove button */}
 <button
 className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity border border-white shadow-sm"
 onClick={(e) => {
 e.stopPropagation()
 onRemove?.(index)
 }}
 onPointerDown={(e) => e.stopPropagation()}
 style={{ fontSize: 10 }}
 >
 X
 </button>
 </div>
 )
}
