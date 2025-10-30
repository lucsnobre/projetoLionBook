// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.querySelector('.login-btn');
const loginCard = document.querySelector('.login-card');
const cartIcon = document.querySelector('.cart-icon');
const forgotPasswordLink = document.querySelector('.forgot-password');

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

// Form Validation and Animation
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        // Form submission
        loginForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Input focus animations
        [usernameInput, passwordInput].forEach(input => {
            input.addEventListener('focus', () => this.onInputFocus(input));
            input.addEventListener('blur', () => this.onInputBlur(input));
            input.addEventListener('input', () => this.onInputChange(input));
        });

        // Button hover effects
        loginBtn.addEventListener('mouseenter', () => this.onButtonHover());
        loginBtn.addEventListener('mouseleave', () => this.onButtonLeave());
    }

    onInputFocus(input) {
        const wrapper = input.closest('.input-wrapper');
        wrapper.style.transform = 'translateY(-3px)';
        wrapper.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.1)';
    }

    onInputBlur(input) {
        const wrapper = input.closest('.input-wrapper');
        if (!input.value) {
            wrapper.style.transform = 'translateY(0)';
            wrapper.style.boxShadow = 'none';
        }
    }

    onInputChange(input) {
        const wrapper = input.closest('.input-wrapper');
        if (input.value) {
            wrapper.classList.add('has-value');
        } else {
            wrapper.classList.remove('has-value');
        }
    }

    onButtonHover() {
        cartIcon.style.transform = 'scale(1.1) rotate(5deg)';
    }

    onButtonLeave() {
        cartIcon.style.transform = 'scale(1) rotate(0deg)';
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!username || !password) {
            this.showError('Please fill in all fields');
            return;
        }

        if (username.length < 3) {
            this.showError('Username must be at least 3 characters');
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters');
            return;
        }

        // Show loading state
        this.showLoading();

        // Simulate API call
        try {
            await this.simulateLogin(username, password);
            this.showSuccess();
        } catch (error) {
            this.showError(error.message);
        }
    }

    simulateLogin(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simple demo validation
                if (username.toLowerCase() === 'admin' && password === 'password') {
                    resolve({ success: true });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 2000);
        });
    }

    showLoading() {
        loginBtn.textContent = '';
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
    }

    showSuccess() {
        loginBtn.classList.remove('loading');
        loginBtn.textContent = 'SUCCESS!';
        loginBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        loginCard.classList.add('success-animation');
        
        // Success particles removed (no bubble effects)
        
        setTimeout(() => {
            // Redirect or show next step
            console.log('Login successful! Redirect to dashboard...');
        }, 1500);
    }

    showError(message) {
        loginBtn.classList.remove('loading');
        loginBtn.textContent = 'LOGIN';
        loginBtn.disabled = false;
        
        // Shake animation
        loginCard.classList.add('error-shake');
        
        // Show error message
        this.displayErrorMessage(message);
        
        setTimeout(() => {
            loginCard.classList.remove('error-shake');
        }, 500);
    }

    displayErrorMessage(message) {
        // Remove existing error message
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ff6b6b;
            background: rgba(255, 107, 107, 0.1);
            border: 1px solid rgba(255, 107, 107, 0.3);
            padding: 10px 15px;
            border-radius: 8px;
            margin-top: 15px;
            font-size: 0.9rem;
            text-align: center;
            animation: errorFadeIn 0.3s ease;
        `;

        loginForm.appendChild(errorDiv);

        // Remove error after 3 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'errorFadeOut 0.3s ease';
            setTimeout(() => errorDiv.remove(), 300);
        }, 3000);
    }

}

// Typewriter Effect for Placeholders
class TypewriterEffect {
    constructor() {
        this.init();
    }

    init() {
        setTimeout(() => {
            this.typeWriterEffect(usernameInput, 'USERNAME', 100);
        }, 1000);
        
        setTimeout(() => {
            this.typeWriterEffect(passwordInput, 'PASSWORD', 100);
        }, 2000);
    }

    typeWriterEffect(element, text, speed) {
        element.placeholder = '';
        let i = 0;
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.placeholder += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
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
        // Subtle notification that image loaded
        const notification = document.createElement('div');
        notification.textContent = '✅ Background image loaded';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(76, 175, 80, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 0.8rem;
            z-index: 1000;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    showImageMissingNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <strong>📁 Add your background image:</strong><br>
            Rename your image to <code>background.jpg</code><br>
            and place it in the project folder
        `;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 152, 0, 0.95);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            font-size: 0.85rem;
            z-index: 1000;
            text-align: center;
            max-width: 300px;
            animation: slideInDown 0.3s ease, fadeOut 0.3s ease 7s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;
        
        notification.addEventListener('click', () => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        document.body.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 8000);
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
        
        @keyframes successParticle {
            0% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
            100% {
                transform: translate(
                    calc(-50% + ${Math.random() * 400 - 200}px),
                    calc(-50% + ${Math.random() * 400 - 200}px)
                ) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize all components
    new BackgroundImageLoader();
    new ParticleSystem();
    new ParallaxEffect();
    new FormHandler();
    new TypewriterEffect();

    // Add entrance animation
    setTimeout(() => {
        loginCard.style.opacity = '1';
        loginCard.style.transform = 'translateY(0)';
    }, 300);
});

// Forgot password interaction
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create modal or show message
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
});

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
