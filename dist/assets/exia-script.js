// Mobile Suit Exia Monitor Theme - JavaScript
// 机动战士能天使监控系统主题脚本

(function() {
    'use strict';
    
    // 创建顶部HUD显示栏
    function createExiaHUD() {
        // 检查是否已经存在HUD
        if (document.querySelector('.exia-hud-top')) {
            return;
        }
        
        const hudHTML = `
            <div class="exia-hud-top">
                <div class="exia-hud-left">
                    <div class="exia-monitor-title">EXIA MONITOR</div>
                    <div class="exia-status-indicator">
                        <div class="exia-status-dot" id="exia-status-left"></div>
                        <span>CELESTIAL BEING</span>
                    </div>
                </div>
                <div class="exia-hud-center">
                    <div class="exia-status-indicator">
                        <span>GUNDAM EXIA</span>
                        <div class="exia-status-dot" id="exia-status-center"></div>
                        <span id="exia-status-text">ON-LINE ACTIVE</span>
                    </div>
                </div>
                <div class="exia-hud-right">
                    <div class="exia-hud-icons">
                        <div class="exia-hud-icon" title="搜索">⚬</div>
                        <div class="exia-hud-icon" title="设置">⚙</div>
                        <div class="exia-hud-icon" title="通知">⚬</div>
                        <div class="exia-hud-icon" title="用户">⚬</div>
                    </div>
                </div>
            </div>
        `;
        
        // 将HUD插入到页面顶部
        document.body.insertAdjacentHTML('afterbegin', hudHTML);
        
        // 添加HUD交互功能
        addHUDInteractions();
        
        // 立即更新状态
        updateHUDStatus();
    }
    
    // 添加HUD交互功能
    function addHUDInteractions() {
        const hudIcons = document.querySelectorAll('.exia-hud-icon');
        
        hudIcons.forEach(icon => {
            icon.addEventListener('click', function() {
                // 添加点击效果
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // 这里可以添加具体的功能逻辑
                const title = this.getAttribute('title');
                console.log(`HUD功能被点击: ${title}`);
            });
        });
    }
    
    // 更新HUD状态 - 保持原版的离线红色功能
    function updateHUDStatus() {
        const statusDots = document.querySelectorAll('.exia-status-dot');
        const statusText = document.getElementById('exia-status-text');
        const isOnline = navigator.onLine;
        
        statusDots.forEach(dot => {
            if (isOnline) {
                dot.style.background = '#00ff88';
                dot.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.5)';
            } else {
                dot.style.background = '#ff4444';
                dot.style.boxShadow = '0 0 10px rgba(255, 68, 68, 0.5)';
            }
        });
        
        // 更新状态文字
        if (statusText) {
            if (isOnline) {
                statusText.textContent = 'ON-LINE ACTIVE';
                statusText.style.color = '#00ff88';
            } else {
                statusText.textContent = 'OFF-LINE';
                statusText.style.color = '#ff4444';
            }
        }
    }
    
    // 监听网络状态变化
    function setupNetworkMonitoring() {
        window.addEventListener('online', updateHUDStatus);
        window.addEventListener('offline', updateHUDStatus);
    }
    
    // 添加特殊效果
    function addSpecialEffects() {
        // Trans-Am模式切换
        let transAmActive = false;
        
        // 监听键盘快捷键 Ctrl+Shift+T 激活Trans-Am模式
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                transAmActive = !transAmActive;
                
                if (transAmActive) {
                    document.body.classList.add('trans-am-mode');
                    console.log('Trans-Am模式已激活！');
                } else {
                    document.body.classList.remove('trans-am-mode');
                    console.log('Trans-Am模式已关闭');
                }
            }
        });
        
        // 雷达扫描效果
        const cards = document.querySelectorAll('.card, .instance-card, .server-card');
        cards.forEach(card => {
            card.classList.add('radar-scan');
        });
    }
    
    // 替换底部主题信息
    function replaceThemeInfo() {
        // 查找并替换包含 "PurCarte" 的文本
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes('PurCarte')) {
                node.textContent = node.textContent.replace(/PurCarte/g, 'Exia');
            }
            if (node.textContent.includes('Theme by')) {
                node.textContent = 'Theme by Exia';
            }
        }
    }
    
    // 主题初始化
    function initExiaTheme() {
        try {
            console.log('正在初始化机动战士能天使监控系统主题...');
            
            // 延迟创建HUD，确保页面加载完成
            setTimeout(() => {
                createExiaHUD();
                updateHUDStatus();
            }, 500);
            
            // 设置网络监控
            setupNetworkMonitoring();
            
            // 添加特殊效果
            addSpecialEffects();
            
            // 替换主题信息
            setTimeout(replaceThemeInfo, 1000);
            
            console.log('机动战士能天使监控系统主题初始化完成！');
            console.log('快捷键: Ctrl+Shift+T - 切换Trans-Am模式');
        } catch (error) {
            console.error('主题初始化错误:', error);
        }
    }
    
    // 等待DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initExiaTheme);
    } else {
        // 如果DOM已经加载完成，延迟执行以确保所有元素都已渲染
        setTimeout(initExiaTheme, 100);
    }
    
    // 监听页面变化，确保HUD始终存在
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                // 检查HUD是否还存在，如果不存在则重新创建
                if (!document.querySelector('.exia-hud-top')) {
                    setTimeout(createExiaHUD, 100);
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
})();