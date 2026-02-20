/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#CCFF00',
					foreground: '#121212',
				},
				secondary: {
					DEFAULT: '#FF0055',
					foreground: '#FFFFFF',
				},
				accent: {
					DEFAULT: '#CCFF00',
					foreground: '#121212',
				},
				destructive: {
					DEFAULT: '#FF0055',
					foreground: '#FFFFFF',
				},
				muted: {
					DEFAULT: '#2A2A2A',
					foreground: '#D4D4D4',
				},
				popover: {
					DEFAULT: '#1A1A1A',
					foreground: '#FFFFFF',
				},
				card: {
					DEFAULT: '#1A1A1A',
					foreground: '#FFFFFF',
				},
				street: {
					black: '#121212',
					carbon: '#1A1A1A',
					concrete: '#2A2A2A',
					lime: '#CCFF00',
					pink: '#FF0055',
					white: '#FFFFFF',
					grey: '#D4D4D4',
				}
			},
			fontFamily: {
				graffiti: ['Permanent Marker', 'cursive'],
				street: ['Space Grotesk', 'sans-serif'],
			},
			backgroundImage: {
				'concrete-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
				'graffiti-gradient': 'linear-gradient(135deg, #CCFF00 0%, #00FF88 50%, #FF0055 100%)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'glitch': {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
				},
				'spray': {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'50%': { opacity: '1', transform: 'scale(1.05)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				'bounce-in': {
					'0%': { transform: 'scale(0.3)', opacity: '0' },
					'50%': { transform: 'scale(1.05)' },
					'70%': { transform: 'scale(0.9)' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'slide-up': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glitch': 'glitch 0.3s ease-in-out',
				'spray': 'spray 0.5s ease-out',
				'bounce-in': 'bounce-in 0.6s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
			},
			boxShadow: {
				'neon-lime': '0 0 10px #CCFF00, 0 0 20px #CCFF00, 4px 4px 0px #CCFF00',
				'neon-pink': '0 0 10px #FF0055, 0 0 20px #FF0055, 4px 4px 0px #FF0055',
				'hard-lime': '4px 4px 0px #CCFF00',
				'hard-pink': '4px 4px 0px #FF0055',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}
