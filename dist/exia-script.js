/*!
 * Mobile Suit Exia Monitor System - Theme Enhancement Script
 * 机动战士能天使监控系统 - 主题增强脚本
 * Version: 1.0.0
 */

(function() {
  'use strict';

  console.log('🤖 机动战士能天使监控系统启动中...');

  // 等待DOM加载完成
  function initExiaTheme() {
    // 检查是否是管理页面
    const isAdminResult = window.isAdminPage?.();

    if (isAdminResult === undefined) {
      console.warn('⚠️ 管理页面检测器不可用，跳过主题应用');
      return;
    }

    if (isAdminResult) {
      console.log('🔧 检测到管理页面，跳过主题应用');
      return;
    }
    
    // 添加主题标识
    document.documentElement.setAttribute('data-theme', 'exia');
    document.body.classList.add('exia-theme');

    // 强制应用机动战士样式
    const style = document.createElement('style');
    style.textContent = `
      /* 强制覆盖所有样式 */
      * {
        font-family: 'Orbitron', 'Courier New', monospace !important;
      }
      
      body, html, #root {
        background: linear-gradient(135deg, #0a0a0a 0%, #001122 50%, #000a1a 100%) !important;
        color: #ffffff !important;
      }
      
      /* 确保卡片样式生效 */
      [class*="card"], [class*="server"], [class*="node"], .card, .server-card, .node-card {
        background: rgba(0, 20, 40, 0.9) !important;
        border: 1px solid rgba(0, 255, 136, 0.3) !important;
        border-radius: 8px !important;
        box-shadow: 0 0 20px rgba(0, 255, 136, 0.1) !important;
      }
      
      /* 标题和文字颜色 - 增强发光效果 */
      h1, h2, h3, .title, [class*="title"], title {
        color: #00ff88 !important;
        text-shadow: 
          0 0 5px #00ff88,
          0 0 10px #00ff88,
          0 0 15px #00ff88,
          0 0 20px #00ff88 !important;
        font-weight: 700 !important;
      }
      
      /* 页面标题特殊处理 */
      title, head title {
        color: #00ff88 !important;
      }
    `;
    document.head.appendChild(style);

    // 添加HUD界面元素
    addHUDInterface();
    
    // 监听配置变化
    observeConfigChanges();
    
    // 添加点击事件增强
    enhanceClickEvents();
    
    console.log('✅ 机动战士能天使监控系统已激活');
  }

  // 添加HUD界面
  function addHUDInterface() {
    // 创建顶部HUD栏
    const hudBar = document.createElement('div');
    hudBar.className = 'exia-hud-bar';
    hudBar.innerHTML = `
      <div class="hud-left">
        <span class="org-name">CELESTIAL BEING</span>
        <span class="mission-code">OPERATION FALLEN ANGELS</span>
      </div>
      <div class="hud-center">
        <span class="mobile-suit">GUNDAM EXIA</span>
        <span class="pilot">SETSUNA F. SEIEI</span>
      </div>
      <div class="hud-right">
        <span class="gn-drive">GN DRIVE: ACTIVE</span>
        <span class="system-status">ALL SYSTEMS NOMINAL</span>
      </div>
    `;
    
    // 添加HUD样式
    const hudStyle = document.createElement('style');
    hudStyle.textContent = `
      .exia-hud-bar {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        height: 60px !important;
        background: rgba(0, 20, 40, 0.95) !important;
        border-bottom: 2px solid #00ff88 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 0 20px !important;
        font-family: 'Orbitron', monospace !important;
        font-size: 12px !important;
        color: #00ff88 !important;
        z-index: 10000 !important;
        backdrop-filter: blur(10px) !important;
      }
      
      .hud-left, .hud-center, .hud-right {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
      }
      
      .org-name, .mobile-suit, .gn-drive {
        font-weight: 700 !important;
        text-shadow: 0 0 5px #00ff88 !important;
      }
      
      .mission-code, .pilot, .system-status {
        font-size: 10px !important;
        opacity: 0.8 !important;
      }
      
      /* 为HUD栏留出空间 */
      body {
        padding-top: 60px !important;
      }
      
      #root {
        padding-top: 60px !important;
      }
    `;
    
    document.head.appendChild(hudStyle);
    document.body.insertBefore(hudBar, document.body.firstChild);
  }

  // 监听配置变化
  function observeConfigChanges() {
    // 监听主题配置变化
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' || mutation.type === 'childList') {
          // 重新应用主题样式
          applyThemeStyles();
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true
    });
  }

  // 应用主题样式
  function applyThemeStyles() {
    // 确保所有卡片都有正确的样式
    const cards = document.querySelectorAll('[class*="card"], [class*="server"], [class*="node"]');
    cards.forEach(card => {
      // 检查是否是离线状态
      const isOffline = card.classList.contains('offline') || 
                       card.querySelector('.offline') || 
                       card.textContent.includes('离线') ||
                       card.textContent.includes('offline');
      
      if (isOffline) {
        // 离线服务器红色样式
        card.style.background = 'rgba(40, 0, 0, 0.9)';
        card.style.border = '2px solid #ff0044';
        card.style.boxShadow = '0 0 30px rgba(255, 0, 68, 0.3)';
      } else {
        // 在线服务器绿色样式
        card.style.background = 'rgba(0, 20, 40, 0.9)';
        card.style.border = '1px solid rgba(0, 255, 136, 0.3)';
        card.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.1)';
      }
      card.style.borderRadius = '8px';
    });

    // 确保文字颜色正确
    const titles = document.querySelectorAll('h1, h2, h3, [class*="title"]');
    titles.forEach(title => {
      title.style.color = '#00ff88';
      title.style.textShadow = '0 0 10px #00ff88';
    });
    
    // 修改底部版权信息
    const footerLinks = document.querySelectorAll('a[href*="purcarte"], a[href*="PurCarte"]');
    footerLinks.forEach(link => {
      if (link.textContent.includes('PurCarte')) {
        link.textContent = link.textContent.replace('PurCarte', 'Exia');
        link.href = 'https://github.com/EmersonLopez2005/GundamHUD';
      }
    });
    
    // 查找并替换所有包含PurCarte的文本
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
    }
  }

  // 增强点击事件
  function enhanceClickEvents() {
    document.addEventListener('click', function(e) {
      const card = e.target.closest('[class*="card"], [class*="server"], [class*="node"]');
      if (card) {
        // 添加点击效果
        card.style.transform = 'scale(0.98)';
        card.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.3)';
        
        setTimeout(() => {
          card.style.transform = '';
          card.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.1)';
        }, 150);
        
        console.log('🎯 机体卡片点击:', card);
      }
    });
  }

  // 添加粒子效果
  function createParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.opacity = '0.3';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    
    // 创建GN粒子
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }

  // 初始化主题
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExiaTheme);
  } else {
    initExiaTheme();
  }

  // 延迟启动粒子系统
  setTimeout(() => {
    createParticleSystem();
  }, 1000);

  // 定期检查和应用样式
  setInterval(() => {
    applyThemeStyles();
    detectOfflineServers();
  }, 2000);

  // 检测离线服务器
  function detectOfflineServers() {
    // 查找所有可能的离线指示器
    const offlineIndicators = [
      '[class*="offline"]',
      '[class*="down"]',
      '[class*="error"]',
      '.status-offline',
      '.server-offline',
      '.node-offline'
    ];
    
    offlineIndicators.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        const card = element.closest('[class*="card"], [class*="server"], [class*="node"]');
        if (card) {
          // 强制应用离线样式
          card.style.background = 'rgba(40, 0, 0, 0.9) !important';
          card.style.border = '2px solid #ff0044 !important';
          card.style.boxShadow = '0 0 30px rgba(255, 0, 68, 0.3) !important';
          card.classList.add('exia-offline');
        }
      });
    });
    
    // 通过文本内容检测离线状态
    const allCards = document.querySelectorAll('[class*="card"], [class*="server"], [class*="node"]');
    allCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes('离线') || text.includes('offline') || text.includes('down') || text.includes('error')) {
        card.style.background = 'rgba(40, 0, 0, 0.9) !important';
        card.style.border = '2px solid #ff0044 !important';
        card.style.boxShadow = '0 0 30px rgba(255, 0, 68, 0.3) !important';
        card.classList.add('exia-offline');
      }
    });
  }

  // 添加快捷键支持
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey) {
      switch(e.key) {
        case 'T':
          e.preventDefault();
          console.log('🔴 Trans-Am模式切换');
          document.body.classList.toggle('trans-am-mode');
          break;
        case 'R':
          e.preventDefault();
          console.log('📡 雷达扫描切换');
          document.body.classList.toggle('radar-scan');
          break;
      }
    }
  });

})();