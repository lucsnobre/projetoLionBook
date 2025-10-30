// Alpine.js Login App
function loginApp() {
    return {
        // Form data
        form: {
            username: '',
            password: ''
        },
        
        // State management
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
        
        // Computed properties
        get buttonText() {
            if (this.isLoading) return '';
            if (this.isSuccess) return 'SUCCESS!';
            return 'LOGIN';
        },
        
        get buttonStyle() {
            if (this.isSuccess) {
                return {
                    background: '#ffffff',
                    color: '#4CAF50',
                    border: '2px solid #4CAF50'
                };
            }
            return {
                background: '#ffffff',
                color: '#333333',
                border: 'none'
            };
        },
        
        // Methods
        async handleSubmit() {
            // Basic validation
            if (!this.form.username.trim() || !this.form.password.trim()) {
                this.showError('Please fill in all fields');
                return;
            }

            if (this.form.username.length < 3) {
                this.showError('Username must be at least 3 characters');
                return;
            }

            if (this.form.password.length < 6) {
                this.showError('Password must be at least 6 characters');
                return;
            }

            // Show loading state
            this.isLoading = true;
            this.clearError();

            try {
                // Simulate API call
                await this.simulateLogin(this.form.username, this.form.password);
                this.showSuccess();
            } catch (error) {
                this.showError(error.message);
            }
        },
        
        simulateLogin(username, password) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (username.toLowerCase() === 'admin' && password === 'password') {
                        resolve({ success: true });
                    } else {
                        reject(new Error('Invalid credentials'));
                    }
                }, 2000);
            });
        },
        
        showSuccess() {
            this.isLoading = false;
            this.isSuccess = true;
            
            setTimeout(() => {
                console.log('Login successful! Redirect to dashboard...');
            }, 1500);
        },
        
        showError(message) {
            this.isLoading = false;
            this.isError = true;
            this.errorMessage = message;
            
            // Remove error state after animation
            setTimeout(() => {
                this.isError = false;
            }, 500);
            
            // Clear error message after 3 seconds
            setTimeout(() => {
                this.errorMessage = '';
            }, 3000);
        },
        
        clearError() {
            this.errorMessage = '';
            this.isError = false;
        },
        
        showForgotPassword() {
            // Create notification
            const message = document.createElement('div');
            message.textContent = 'Password reset functionality would be implemented here';
            message.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.9);
                color: #333;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                animation: slideInRight 0.3s ease;
            `;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => message.remove(), 300);
            }, 3000);
        }
    }
}

// Legacy DOM Elements (para manter compatibilidade com código existente)
const loginCard = document.querySelector('.login-card');
const cartIcon = document.querySelector('.cart-icon');

// Particle System for Background Effects - DISABLED
class ParticleSystem {
    constructor() {
        // Sistema de partículas desabilitado conforme solicitado
        console.log('Particle system disabled - no floating bubbles');
    }
}

// Mouse Movement Parallax Effect
class ParallaxEffect {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
            this.updateParallax();
        });
    }

    updateParallax() {
        // Move login card slightly based on mouse position
        const moveX = this.mouseX * 5; // Reduzido para movimento mais sutil
        const moveY = this.mouseY * 5;
        
        loginCard.style.transform = `translate(${moveX}px, ${moveY}px)`;
        
        // Floating circles movimento removido (circles disabled)
    }
}

// Form Handler - Simplified (Alpine.js handles most form logic now)
class FormHandler {
    constructor() {
        // Alpine.js now handles form validation and submission
        // Keeping this class for any additional form enhancements if needed
        console.log('Form handling delegated to Alpine.js');
    }
}

// Typewriter Effect - Simplified for Alpine.js compatibility
class TypewriterEffect {
    constructor() {
        // Typewriter effect simplified - placeholders are now static for better Alpine.js integration
        console.log('Typewriter effect simplified for Alpine.js compatibility');
    }
}

// Background Image Loader
class BackgroundImageLoader {
    constructor() {
        this.checkBackgroundImage();
    }

    checkBackgroundImage() {
        const img = new Image();
        img.onload = () => {
            console.log('✅ Background image loaded successfully!');
            this.showImageLoadedNotification();
        };
        
        img.onerror = () => {
            console.log('⚠️ Background image not found - using fallback gradient');
            this.showImageMissingNotification();
        };
        
        img.src = 'background.jpg';
    }

    showImageLoadedNotification() {
        // Silent success - only log to console to avoid visual clutter
        console.log('✅ Background image loaded successfully');
    }

    showImageMissingNotification() {
        // Silent fallback - CSS gradient already handles background elegantly
        console.log('📷 Background image not found - using CSS gradient fallback');
    }
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations for particles, errors and notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes errorFadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes errorFadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideInDown {
            from { opacity: 0; transform: translate(-50%, -100%); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }
        
        /* Success particle animations removed (no bubble effects) */
    `;
    document.head.appendChild(style);

    // Initialize components (Alpine.js handles form, we keep visual effects)
    new BackgroundImageLoader();
    new ParallaxEffect();
    new TypewriterEffect();
    
    console.log('🎯 Alpine.js integration complete - Form reactivity enabled');

    // Modern entrance animations with staggered timing
    setTimeout(() => {
        // Background overlay entrance
        document.querySelector('.background-overlay').classList.add('loaded');
        
        // Login card entrance
        setTimeout(() => {
            loginCard.classList.add('loaded');
        }, 300);
        
        // Logo animation
        setTimeout(() => {
            document.querySelector('.logo-section').classList.add('animate');
        }, 500);
        
        // Input fields animation (staggered)
        setTimeout(() => {
            document.querySelectorAll('.input-group').forEach(group => {
                group.classList.add('animate');
            });
        }, 700);
        
        // Button animation
        setTimeout(() => {
            document.querySelector('.login-btn').classList.add('animate');
        }, 900);
        
        // Forgot password link animation
        setTimeout(() => {
            document.querySelector('.forgot-password').classList.add('animate');
        }, 1100);
        
        console.log('✨ Modern entrance animations completed');
        
    }, 100);
});

// Forgot password interaction now handled by Alpine.js

// Add slide animations
const slideAnimations = document.createElement('style');
slideAnimations.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(slideAnimations);
