
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                'poppins': ['Poppins', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.6s ease-in-out',
                'slide-up': 'slideUp 0.6s ease-out',
                'slide-down': 'slideDown 0.6s ease-out',
                'scale-in': 'scaleIn 0.5s ease-out',
                'bounce-soft': 'bounceSoft 3s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                slideDown: {
                    '0%': { transform: 'translateY(-30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' }
                },
                bounceSoft: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-15px) rotate(2deg)' }
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)', transform: 'scale(1)' },
                    '100%': { boxShadow: '0 0 40px rgba(147, 51, 234, 0.6)', transform: 'scale(1.02)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
                    '33%': { transform: 'translateY(-20px) rotate(5deg)', opacity: '0.9' },
                    '66%': { transform: 'translateY(-10px) rotate(-3deg)', opacity: '0.8' }
                },
                gradientShift: {
                    '0%': { backgroundPosition: '0% 50' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' }
                }
            },
            backgroundSize: {
                '300%': '300%',
                '400%': '400%'
            }
        }
    }
}