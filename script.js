document.addEventListener('DOMContentLoaded', function() {
    // 处理logo图片加载错误
    document.querySelectorAll('.link-logo').forEach(img => {
        img.addEventListener('error', function() {
            const text = this.alt.substring(0, 2).toUpperCase();
            const fallbackLogo = document.createElement('div');
            fallbackLogo.className = 'fallback-logo';
            fallbackLogo.textContent = text;
            this.parentNode.replaceChild(fallbackLogo, this);
        });
    });

    // 滚动到顶部按钮
    const scrollTopButton = document.getElementById('scrollToTop');

    // 滚动监听 - 添加null检查
    if (scrollTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopButton.classList.add('visible');
            } else {
                scrollTopButton.classList.remove('visible');
            }
        });

        // 点击滚动到顶部
        scrollTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 平滑滚动到锚点
    document.querySelectorAll('.category-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 链接卡片悬停效果
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.05)';
        });
    });

    // 添加分类导航高亮效果
    const sections = document.querySelectorAll('.category');
    const navItems = document.querySelectorAll('.category-nav a');
    
    if (sections.length > 0 && navItems.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                const href = item.getAttribute('href');
                if (href && href.substring(1) === current) {
                    item.classList.add('active');
                }
            });
        });
    }

    // 添加导航高亮样式
    const style = document.createElement('style');
    style.textContent = `
        .category-nav a.active {
            background-color: var(--primary-color);
            color: white;
        }
    `;
    document.head.appendChild(style);
    
    // 添加动画效果
    document.querySelectorAll('.link-card').forEach((card, index) => {
        card.style.animationDelay = (index * 0.05) + 's';
        card.classList.add('animate-in');
    });
    
    // 添加动画样式
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
        }
    `;
    document.head.appendChild(animationStyle);
    
    // 懒加载图片
    if ('IntersectionObserver' in window) {
        const lazyLoadImages = () => {
            const imgObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imgObserver.observe(img);
            });
        };
        
        lazyLoadImages();
    } else {
        // 降级处理
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }

    // 处理远程 favicon 加载失败
    document.querySelectorAll('.link-card-header img.link-logo').forEach(img => {
        // 记录原始 src
        const originalSrc = img.src;
        
        // 设置错误处理
        img.addEventListener('error', function() {
            // 如果是远程 favicon，尝试加载本地备份
            if (originalSrc.includes('favicon.ico')) {
                const siteName = this.alt.split(' ')[0].toLowerCase();
                // 尝试使用本地备份（如果有）
                this.src = `favicons/${siteName}.png`;
                
                // 如果本地备份也失败，则使用文本替代
                this.onerror = function() {
                    const text = this.alt.substring(0, 2).toUpperCase();
                    const fallbackLogo = document.createElement('div');
                    fallbackLogo.className = 'fallback-logo';
                    fallbackLogo.textContent = text;
                    this.parentNode.replaceChild(fallbackLogo, this);
                };
            }
        });
    });

    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        // Esc 键关闭模态窗口
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal[style*="display: block"]');
            openModals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
        
        // 向上箭头滚动到顶部
        if (e.key === 'Home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    // 添加可访问性属性
    document.querySelectorAll('.link-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        
        // 键盘聚焦时显示悬停效果
        card.addEventListener('focus', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('blur', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.05)';
        });
    });

    // 主题切换功能
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // 检查本地存储中的主题偏好
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                this.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                this.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    if (searchInput && searchButton) {
        const performSearch = () => {
            const query = searchInput.value.toLowerCase().trim();
            if (!query) return;
            
            const linkCards = document.querySelectorAll('.link-card');
            let foundCount = 0;
            
            linkCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                if (title.includes(query) || description.includes(query) || tags.some(tag => tag.includes(query))) {
                    card.style.display = '';
                    card.classList.add('search-highlight');
                    setTimeout(() => card.classList.remove('search-highlight'), 2000);
                    foundCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // 显示搜索结果提示
            let resultMessage = document.getElementById('searchResults');
            if (!resultMessage) {
                resultMessage = document.createElement('div');
                resultMessage.id = 'searchResults';
                resultMessage.className = 'search-results';
                searchInput.parentNode.after(resultMessage);
            }
            
            resultMessage.textContent = `找到 ${foundCount} 个匹配结果`;
            resultMessage.style.display = 'block';
        };
        
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}); 