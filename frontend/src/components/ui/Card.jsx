export default function Card({ className = '', children, ...props }) {
 return (
 <div
 className={`bg-white rounded-xl border border-border-subtle ${className}`}
 {...props}
 >
 {children}
 </div>
 )
}
