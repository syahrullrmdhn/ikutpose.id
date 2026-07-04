export default function Card({ className = '', children, ...props }) {
 return (
 <div
 className={`bg-white dark:bg-gray-900 rounded-xl border border-border-subtle dark:border-gray-800 ${className}`}
 {...props}
 >
 {children}
 </div>
 )
}
