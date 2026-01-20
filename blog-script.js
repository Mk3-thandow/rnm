// Blog functionality script

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            icon.classList.remove('bx-moon');
            icon.classList.add('bx-sun');
            document.documentElement.style.setProperty('--bg-color', '#f8f9fa');
            document.documentElement.style.setProperty('--text-color', '#333');
            document.documentElement.style.setProperty('--white-color', '#333');
            document.documentElement.style.setProperty('--second-color', '#e9ecef');
        } else {
            icon.classList.remove('bx-sun');
            icon.classList.add('bx-moon');
            document.documentElement.style.setProperty('--bg-color', '#080808');
            document.documentElement.style.setProperty('--text-color', '#f0f0f0');
            document.documentElement.style.setProperty('--white-color', '#f0f0f0');
            document.documentElement.style.setProperty('--second-color', 'rgba(87, 6, 52, 0.527)');
        }
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        blogPosts.forEach(post => {
            const title = post.querySelector('.post-title').textContent.toLowerCase();
            const text = post.querySelector('.post-text').textContent.toLowerCase();
            const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
            
            const matches = title.includes(searchTerm) || 
                           text.includes(searchTerm) || 
                           tags.some(tag => tag.includes(searchTerm));
            
            if (matches || searchTerm === '') {
                post.style.display = 'flex';
            } else {
                post.style.display = 'none';
            }
        });
    });

    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter posts
            blogPosts.forEach(post => {
                const postCategory = post.getAttribute('data-category');
                
                if (selectedCategory === 'all' || postCategory === selectedCategory) {
                    post.style.display = 'flex';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Load More functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const allPosts = Array.from(document.querySelectorAll('.blog-post'));
    let visiblePosts = 4; // Show first 4 posts initially
    
    // Initially hide posts beyond the first 4
    allPosts.forEach((post, index) => {
        if (index >= visiblePosts) {
            post.style.display = 'none';
        }
    });
    
    loadMoreBtn.addEventListener('click', function() {
        // Show next 2 posts
        for (let i = visiblePosts; i < visiblePosts + 2 && i < allPosts.length; i++) {
            allPosts[i].style.display = 'flex';
        }
        
        visiblePosts += 2;
        
        // Hide button if all posts are visible
        if (visiblePosts >= allPosts.length) {
            loadMoreBtn.style.display = 'none';
            loadMoreBtn.textContent = 'All posts loaded';
        }
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // In a real application, you would send this to a server
                alert(`Thank you for subscribing with: ${email}\nYou'll receive updates when new posts are published.`);
                this.reset();
                
                // Add visual feedback
                const submitBtn = this.querySelector('button');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Subscribed!';
                submitBtn.style.background = '#28a745';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 2000);
            }
        });
    }

    // Read More links functionality
    const readMoreLinks = document.querySelectorAll('.read-more, .read-more-btn');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // In a real blog, this would navigate to individual post pages
            // For this demo, we'll just show an alert
            e.preventDefault();
            
            const postTitle = this.closest('.blog-post') ? 
                this.closest('.blog-post').querySelector('.post-title').textContent :
                'Featured Post';
            
            alert(`In a complete blog, this would open the full article: "${postTitle}"\n\nFor now, you can imagine reading the full detailed post here!`);
        });
    });

    // Popular posts links
    const popularPostLinks = document.querySelectorAll('.popular-posts a');
    
    popularPostLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`This would navigate to the "${this.textContent}" post in a complete blog.`);
        });
    });

    // Social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.querySelector('i').className.includes('linkedin') ? 'LinkedIn' :
                           this.querySelector('i').className.includes('github') ? 'GitHub' :
                           this.querySelector('i').className.includes('twitter') ? 'Twitter' : 'Medium';
            
            alert(`In a real portfolio, this would link to your ${platform} profile.`);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to posts when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all blog posts
    blogPosts.forEach(post => observer.observe(post));

    // Add some initial animation to featured post
    const featuredPost = document.querySelector('.featured-post');
    if (featuredPost) {
        setTimeout(() => {
            featuredPost.classList.add('animated');
        }, 300);
    }

    // Display post count
    updatePostCount();
    
    function updatePostCount() {
        const postCountElement = document.createElement('div');
        postCountElement.className = 'post-count';
        postCountElement.innerHTML = `Showing <span>${Math.min(visiblePosts, allPosts.length)}</span> of <span>${allPosts.length}</span> posts`;
        
        const loadMoreContainer = document.querySelector('.load-more-container');
        if (loadMoreContainer && !document.querySelector('.post-count')) {
            loadMoreContainer.insertBefore(postCountElement, loadMoreBtn);
        }
    }
});

// Optional: Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .blog-post, .featured-post {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .blog-post.animated, .featured-post.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .post-count {
        font-size: 1.4rem;
        margin-bottom: 1.5rem;
        color: var(--text-color);
        opacity: 0.8;
    }
    
    .post-count span {
        color: var(--main-color);
        font-weight: 600;
    }
`;

document.head.appendChild(style);
