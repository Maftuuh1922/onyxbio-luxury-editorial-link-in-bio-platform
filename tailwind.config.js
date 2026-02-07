/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'Space Grotesk', 'sans-serif'],
			display: ['Playfair Display', 'serif'],
			ornament: ['Cinzel', 'serif'],
			serif: ['Cormorant Garamond', 'serif'],
			space: ['Space Grotesk', 'sans-serif'],
  		},
  		colors: {
			landing: {
				'purple-hero': '#8B5CF6',
				'blue-feat': '#3B82F6',
				'red-share': '#DC2626',
				'mint-analytics': '#D4F8E8',
				'yellow-bento': '#FBBF24',
				'maroon-faq': '#7C2D12',
				'dark-footer': '#1F2937',
			},
  			onyx: {
				dark: '#0a0a0a',
				secondary: '#1a1a1a',
				white: '#e8e8e8',
				gray: '#a8a8a8',
				'gray-dark': '#6a6a6a',
				gold: '#c9a961',
				'gold-dark': '#9d7d3f',
				'gold-light': '#e4c98b',
			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  		},
  		keyframes: {
  			'gradient-shift': {
  				'0%, 100%': { transform: 'translate(0, 0) scale(1)' },
  				'50%': { transform: 'translate(-5%, 5%) scale(1.1)' }
  			},
			'shimmer-effect': {
				'0%': { transform: 'translateX(-100%)' },
				'100%': { transform: 'translateX(100%)' }
			},
			'float-particle': {
				'0%, 100%': { transform: 'translate(0, 0)' },
				'33%': { transform: 'translate(10px, -15px)' },
				'66%': { transform: 'translate(-5px, 10px)' }
			},
			'float-slow': {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-20px)' }
			}
  		},
  		animation: {
  			'gradient-shift': 'gradient-shift 15s ease-in-out infinite',
			'shimmer-effect': 'shimmer-effect 2s infinite',
			'float-particle': 'float-particle 15s ease-in-out infinite',
			'float-slow': 'float-slow 6s ease-in-out infinite',
			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")]
}