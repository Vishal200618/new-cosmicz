// Main JavaScript for Cosmicz Website

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');
    const scrollTop = document.getElementById('scroll-top');
    const cookieConsent = document.getElementById('cookie-consent');
    const cookieAccept = document.getElementById('cookie-accept');
    const header = document.querySelector('.header');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    // Toggle Mobile Menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
        
        // Animate menu toggle lines
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Open Cart Sidebar
    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
    
    // Close Cart Sidebar
    function closeCartSidebar() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    
    // Scroll to Top Button
    window.addEventListener('scroll', function() {
        // Show/Hide Scroll to Top button
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('show');
        } else {
            scrollTop.classList.remove('show');
        }
        
        // Header Scroll Effect
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Scroll to Top
    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Cookie Consent
    setTimeout(function() {
        if (!localStorage.getItem('cookieConsent')) {
            cookieConsent.classList.add('show');
        }
    }, 2000);
    
    cookieAccept.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
    });
    
    // Add to Cart Functionality
    let cartCount = 0;
    const cartCountDisplay = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            cartCount++;
            cartCountDisplay.textContent = cartCount;
            
            // Get product info
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'add-cart-notification';
            notification.innerHTML = `<p><i class="fas fa-check-circle"></i> ${productTitle} added to your cart</p>`;
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        });
    });
    
    // Fade-in Animation for Elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    // Animate Hero Text
    const animateElements = document.querySelectorAll('.animate-text');
    
    setTimeout(() => {
        animateElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 300);
        });
    }, 500);
});

// Additional CSS for JS-managed elements
// Additional CSS for JS-managed elements
const style = document.createElement('style');
style.textContent = `
    /* Mobile Menu Styles */
    @media (max-width: 992px) {
        .menu-toggle {
            display: flex;
        }
        .menu {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background-color: var(--white);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease;
            z-index: 100;
        }
        .menu.active {
            max-height: 100vh;
            padding: 20px 0;
            overflow-y: auto;
        }
        .menu ul {
            flex-direction: column;
            padding: 0 20px;
        }
        .menu ul li {
            margin: 10px 0;
        }
    }
    
    /* Cart Sidebar Styles */
    .cart-sidebar {
        position: fixed;
        top: 0;
        right: -400px;
        width: 350px;
        max-width: 100%;
        height: 100vh;
        background-color: var(--white);
        z-index: 1000;
        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
        transition: right 0.3s ease;
        padding: 20px;
        overflow-y: auto;
    }
    
    .cart-sidebar.open {
        right: 0;
    }
    
    .cart-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
    }
    
    .cart-overlay.open {
        opacity: 1;
        visibility: visible;
    }
    
    /* Scroll to Top Button */
    .scroll-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 40px;
        height: 40px;
        background-color: var(--primary-color);
        color: var(--white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 99;
    }
    
    .scroll-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    /* Cookie Consent */
    .cookie-consent {
        position: fixed;
        bottom: -100px;
        left: 0;
        width: 100%;
        background-color: var(--dark-color);
        color: var(--white);
        padding: 15px 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 999;
        transition: bottom 0.5s ease;
        box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.1);
    }
    
    .cookie-consent.show {
        bottom: 0;
    }
    
    /* Add to Cart Notification */
    .add-cart-notification {
        position: fixed;
        top: 100px;
        right: -300px;
        background-color: var(--success-color);
        color: var(--white);
        padding: 12px 20px;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transition: right 0.3s ease;
    }
    
    .add-cart-notification.show {
        right: 20px;
    }
    
    /* Fade-in Animation */
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Hero Text Animation */
    .animate-text {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .animate-text.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Header Scroll Effect */
    .header {
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }
    
    .header.scrolled {
        background-color: var(--white);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
`;

document.head.appendChild(style);

// Product Gallery Functionality
const productThumbnails = document.querySelectorAll('.product-thumbnail');
const productMainImage = document.querySelector('.product-main-image img');

if (productThumbnails.length > 0 && productMainImage) {
    productThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            productThumbnails.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const newSrc = this.getAttribute('data-image');
            productMainImage.src = newSrc;
            
            // Add a small zoom effect
            productMainImage.style.transform = 'scale(1.05)';
            setTimeout(() => {
                productMainImage.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// Newsletter Subscription
const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate email
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(email)) {
            // Show error
            emailInput.classList.add('error');
            
            // Create error message if it doesn't exist
            let errorMsg = newsletterForm.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                newsletterForm.appendChild(errorMsg);
            }
            errorMsg.textContent = 'Please enter a valid email address';
            
            return;
        }
        
        // Remove error if valid
        emailInput.classList.remove('error');
        const errorMsg = newsletterForm.querySelector('.error-message');
        if (errorMsg) {
            newsletterForm.removeChild(errorMsg);
        }
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Thank you for subscribing!';
        newsletterForm.innerHTML = '';
        newsletterForm.appendChild(successMsg);
        
        // You would normally send this to your server
        console.log('Subscribed email:', email);
    });
}

// Product Filters
const filterButtons = document.querySelectorAll('.filter-button');
const productItems = document.querySelectorAll('.product-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Show/hide products based on filter
            productItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    
                    // Add animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}