import { forwardRef } from 'react'

const Input = forwardRef(function Input({ label, error, className = '', ...props }, ref) {
 return (
 <div className="w-full">
 {label && (
 <label className="block text-sm font-medium text-neutral-700 dark:text-gray-300 mb-1.5">
 {label}
 </label>
 )}
 <input
 ref={ref}
 className={`w-full px-4 py-3 rounded-[10px] border border-neutral-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-neutral-800 dark:text-gray-100 placeholder:text-neutral-400 dark:placeholder:text-gray-500 transition-all focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 ${error ? 'border-muted-red' : ''} ${className}`}
 {...props}
 />
 {error && <p className="mt-1 text-xs text-muted-red">{error}</p>}
 </div>
 )
})

export default Input
