import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-9 h-9 rounded-lg border border-border-subtle dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-card dark:hover:shadow-gray-800/30 transition-all duration-300 flex items-center justify-center ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={`absolute transition-all duration-500 ${theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}>
        <Sun size={16} className="text-amber-500" />
      </span>
      <span className={`absolute transition-all duration-500 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}>
        <Moon size={16} className="text-blue-400" />
      </span>
    </button>
  )
}
