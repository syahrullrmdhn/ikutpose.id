import { forwardRef } from 'react'

const variants = {
 primary:
 'bg-primary-400 text-white shadow-btn hover:bg-primary-500 active:bg-primary-600',
 secondary:
 'border border-neutral-200 dark:border-gray-700 text-neutral-700 dark:text-gray-200 hover:border-primary-400 hover:text-primary-400 dark:hover:text-primary-300 dark:hover:bg-gray-800/70',
 ghost:
 'text-neutral-500 dark:text-gray-400 hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-800/70',
 danger:
 'bg-primary-600 text-white hover:bg-primary-700',
}

const sizes = {
 sm: 'px-4 py-2 text-sm',
 md: 'px-6 py-3 text-sm',
 lg: 'px-8 py-4 text-base',
}

const Button = forwardRef(function Button(
 { variant = 'primary', size = 'md', className = '', children, ...props },
 ref
) {
 return (
 <button
 ref={ref}
 className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
 {...props}
 >
 {children}
 </button>
 )
})

export default Button
