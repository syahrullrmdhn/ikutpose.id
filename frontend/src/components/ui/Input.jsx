import { forwardRef } from 'react'

const Input = forwardRef(function Input({ label, error, className = '', ...props }, ref) {
 return (
 <div className="w-full">
 {label && (
 <label className="block text-sm font-medium text-neutral-700 mb-1.5">
 {label}
 </label>
 )}
 <input
 ref={ref}
 className={`w-full px-4 py-3 rounded-[10px] border border-neutral-200 text-neutral-800 placeholder:text-neutral-400 transition-all focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 ${error ? 'border-muted-red' : ''} ${className}`}
 {...props}
 />
 {error && <p className="mt-1 text-xs text-muted-red">{error}</p>}
 </div>
 )
})

export default Input
