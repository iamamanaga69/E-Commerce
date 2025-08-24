document.addEventListener('DOMContentLoaded', function() {
    //
    // Reusable Logic for All Pages
    // --------------------------------------------------------------------------
    
    // Select key DOM elements that exist on every page
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const cartCountElement = document.getElementById('cart-count');
    const cartCountMobileElement = document.getElementById('cart-count-mobile');
    
    // Mobile menu toggle functionality
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }

    // Function to update the cart item count in the header
    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountElement) cartCountElement.textContent = totalItems;
        if (cartCountMobileElement) cartCountMobileElement.textContent = totalItems;
    }

    // Call the function on page load to display the current cart count
    updateCartCount();

    // Placeholder for search functionality
    const searchButton = document.getElementById('search-button');
    const searchButtonMobile = document.getElementById('search-button-mobile');

    const showSearchMessage = () => {
        alert("Search functionality is not yet implemented.");
    };
    if(searchButton) searchButton.addEventListener('click', showSearchMessage);
    if(searchButtonMobile) searchButtonMobile.addEventListener('click', showSearchMessage);

    // Placeholder for newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            if (email) {
                alert(`Thank you for subscribing, ${email}!`);
                document.getElementById('newsletter-email').value = '';
            }
        });
    }

    //
    // Interactive Canvas Logic (unique to pages with a canvas element)
    // --------------------------------------------------------------------------
    
    const canvas = document.getElementById('interactive-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let mouse = { x: null, y: null };
        let particles = [];
        const particleColors = ['#0891b2', '#f87171', '#2dd4bf'];

        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        
        canvas.addEventListener('mousemove', (event) => {
            mouse.x = event.offsetX;
            mouse.y = event.offsetY;
        });
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.radius = Math.random() * 2 + 1;
                this.velocity = {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                };
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.closePath();
            }

            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                    this.velocity.x = -this.velocity.x;
                }
                if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                    this.velocity.y = -this.velocity.y;
                }
                this.draw();
            }
        }
        function init() {
            particles = [];
            for (let i = 0; i < 150; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const color = particleColors[Math.floor(Math.random() * particleColors.length)];
                particles.push(new Particle(x, y, color));
            }
        }
        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        opacityValue = 1 - (distance / 120);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
            });
            connect();
        }
        init();
        animate();
    }


    //
    // Page-specific Logic
    // --------------------------------------------------------------------------
    
    // Products data (used on product.html and cart.html)
    const products = {
        'cover1': { name: 'Sleek Black Case', price: 19.99, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Sleek+Black+Case', description: 'A sleek and stylish black case that offers robust protection without compromising on design. Features a smooth matte finish and precise cutouts for all ports and buttons.' },
        'cover2': { name: 'Vibrant Abstract Cover', price: 24.50, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Vibrant+Abstract+Cover', description: 'Make a statement with this vibrant abstract cover. Its unique design adds a pop of color and personality to your phone, all while keeping it safe from daily bumps and scratches.' },
        'cover3': { name: 'Geometric Crystal Case', price: 29.00, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Geometric+Crystal+Case', description: 'This case is a work of art. The geometric crystal design catches the light and adds a premium, high-fashion look to your device. Durable and scratch-resistant.' },
        'cover4': { name: 'Frosted Grip Cover', price: 17.75, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Frosted+Grip+Cover', description: 'Get a secure hold with this frosted grip cover. The subtle texture prevents slips and drops, while the semi-transparent material adds a modern, minimalist feel.' },
        'cover5': { name: 'Matte Finish Cover', price: 22.00, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Matte+Finish+Cover', description: 'The perfect blend of elegance and simplicity. This matte finish cover feels great in your hand and resists fingerprints, keeping your phone looking clean and pristine.' },
        'cover6': { name: 'Transparent Bumper', price: 15.50, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Transparent+Bumper', description: 'Show off the original design of your phone with this ultra-clear transparent bumper case. It provides shock absorption and edge protection without hiding your device’s beauty.' },
        'cover7': { name: 'Floral Print Case', price: 21.99, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Floral+Print+Case', description: 'A delicate and trendy floral design that adds a touch of nature to your tech. Made from flexible, durable material for easy installation and removal.' },
        'cover8': { name: 'Camo Phone Armor', price: 28.50, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Camo+Phone+Armor', description: 'Engineered for maximum protection, this camo phone armor is built to withstand drops and impacts. The rugged design and a subtle camo pattern are perfect for those who live an active lifestyle.' },
        'shirt1': { name: 'Minimalist T-Shirt', price: 35.00, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=T-Shirt', description: 'A super soft and comfortable tee with a clean, minimalist design. The perfect everyday staple for a streamlined and effortless look.' },
        'hoodie1': { name: 'Urban Street Hoodie', price: 65.00, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Hoodie', description: 'Designed for the urban explorer, this hoodie combines comfort with street-style edge. Made from a heavy-weight cotton blend to keep you warm and stylish.' },
        'jeans1': { name: 'Slim Fit Jeans', price: 89.99, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Jeans', description: 'These slim-fit jeans provide a modern silhouette with just enough stretch for all-day comfort. A timeless piece for any wardrobe.' },
        'jacket1': { name: 'Vintage Denim Jacket', price: 120.00, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Jacket', description: 'Inspired by classic styles, this vintage denim jacket features a timeless design and a worn-in feel. A durable and versatile piece that will only get better with age.' },
        'shirt2': { name: 'Graphic Print Tee', price: 45.00, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=T-Shirt', description: 'Express yourself with our limited edition graphic tee. Bold design and premium cotton make this a standout piece. The print is soft to the touch and won’t crack or fade over time.' },
        'hoodie2': { name: 'Oversized Hoodie', price: 75.00, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Hoodie', description: 'The ultimate in comfort, this oversized hoodie is perfect for layering or lounging. Its relaxed fit provides a casual, cool look and the brushed fleece interior feels amazing.' },
        'jeans2': { name: 'Distressed Jeans', price: 99.99, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Jeans', description: 'Edge meets comfort with these distressed jeans. Carefully crafted rips and fading give them a unique, lived-in character, perfect for a casual, rebellious vibe.' },
        'jacket2': { name: 'Padded Bomber Jacket', price: 150.00, image: 'https://placehold.co/600x600/1a202c/6b46c1?text=Jacket', description: 'Stay warm and stylish with this padded bomber jacket. Featuring a sleek, minimalist design, a quilted interior for warmth, and durable outer shell for protection from the elements.' },
        'look1': { name: 'The Urban Vibe', price: 84.99, image: 'https://placehold.co/800x600/1a202c/6b46c1?text=Look+1', description: 'The perfect combo for a modern urban look. Features our premium Urban Street Hoodie and a Sleek Black Mobile Case. Effortless style meets functional protection. '},
        'look2': { name: 'Minimalist Style', price: 124.99, image: 'https://placehold.co/800x600/1a202c/6b46c1?text=Look+2', description: 'A timeless look that never goes out of style. Combines our classic Minimalist T-Shirt with our versatile Slim Fit Jeans. The perfect foundation for any outfit.'},
        'look3': { name: 'The Denim Classic', price: 148.50, image: 'https://placehold.co/800x600/1a202c/6b46c1?text=Look+3', description: 'Embrace a retro-inspired look with this classic pairing. Our Vintage Denim Jacket and Frosted Grip Mobile Cover provide a cohesive and stylish statement. Built for adventure and style.'}
    };

    // Product page logic
    if (document.getElementById('product-page-content')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = products[productId];

        if (product) {
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-description').textContent = product.description;

            document.getElementById('add-to-cart-button').addEventListener('click', () => {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingItem = cart.find(item => item.id === productId);
                
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cart.push({
                        id: productId,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} has been added to your cart!`);
                updateCartCount();
            });
        } else {
            // If product not found, show an error message
            document.getElementById('product-page-content').innerHTML = `
                <div class="container mx-auto py-24 text-center">
                    <h1 class="text-5xl font-bold text-gray-100 mb-4">Product Not Found</h1>
                    <p class="text-xl text-gray-400">The product you are looking for does not exist.</p>
                    <a href="index.html" class="mt-8 inline-block text-neon-pink font-semibold hover:underline">Go back to the homepage</a>
                </div>
            `;
        }
    }

    // Cart page logic
    if (document.getElementById('cart-page-content')) {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');
        const emptyCartMessage = document.getElementById('empty-cart-message');
        const checkoutButton = document.getElementById('checkout-button');
        
        function renderCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartItemsContainer.innerHTML = '';
            let total = 0;

            if (cart.length === 0) {
                emptyCartMessage.classList.remove('hidden');
                cartTotalElement.textContent = '$0.00';
                if (checkoutButton) checkoutButton.disabled = true;
            } else {
                emptyCartMessage.classList.add('hidden');
                if (checkoutButton) checkoutButton.disabled = false;
                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('flex', 'flex-col', 'md:flex-row', 'items-center', 'space-y-4', 'md:space-y-0', 'md:space-x-4', 'bg-gray-800', 'p-6', 'rounded-xl', 'card-shadow');
                    cartItem.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-md flex-shrink-0">
                        <div class="flex-1 text-center md:text-left">
                            <h4 class="font-semibold text-lg text-gray-100">${item.name}</h4>
                            <p class="text-gray-400">Price: $${item.price.toFixed(2)}</p>
                            <p class="text-gray-400">Quantity: ${item.quantity}</p>
                        </div>
                        <div class="text-xl font-bold text-gray-100">
                            $${itemTotal.toFixed(2)}
                        </div>
                        <button class="remove-item-button px-4 py-2 bg-red-600 text-white rounded-full transition-colors duration-300 hover:bg-red-700" data-id="${item.id}">Remove</button>
                    `;
                    cartItemsContainer.appendChild(cartItem);
                });
                cartTotalElement.textContent = `$${total.toFixed(2)}`;
            }

            document.querySelectorAll('.remove-item-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const idToRemove = e.target.dataset.id;
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    cart = cart.filter(item => item.id !== idToRemove);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCart();
                    updateCartCount();
                });
            });
        }
        
        if(checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                alert("Checkout functionality is not yet implemented.");
            });
        }

        renderCart();
    }
});
