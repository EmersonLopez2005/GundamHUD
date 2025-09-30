// ================ 高达EXIA加载动画脚本 ================

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 添加加载动画
    addLoadingAnimation();
    
    // 模拟加载过程
    simulateLoading();
});

// 添加加载动画
function addLoadingAnimation() {
    // 检查是否已存在加载动画
    const existingOverlay = document.querySelector('.loading-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.id = 'exiaLoadingOverlay';
    loadingOverlay.innerHTML = `
        <div class="loading-container">
            <div class="loading-gn-circle">
                <div class="loading-gn-particles"></div>
                <div class="loading-gn-core"></div>
            </div>
            <div class="loading-text">GUNDAM EXIA</div>
            <div class="loading-subtext">GN DRIVE INITIALIZING...</div>
            <div class="loading-progress"></div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // 显示动画
    setTimeout(() => {
        loadingOverlay.style.opacity = '1';
        startProgressAnimation();
    }, 10);
}

// 启动进度条动画
function startProgressAnimation() {
    const progressBar = document.querySelector('.loading-progress');
    if (progressBar) {
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.width = '100%';
        }, 10);
    }
}

// 模拟加载过程
function simulateLoading() {
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // 加载完成，隐藏加载动画
            setTimeout(() => {
                hideLoadingAnimation();
            }, 500);
        }
    }, 100);
}

// 隐藏加载动画
function hideLoadingAnimation() {
    const loadingOverlay = document.getElementById('exiaLoadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }
}

// 显示加载动画（供外部调用）
function showLoadingAnimation() {
    addLoadingAnimation();
    simulateLoading();
}

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl+Alt+G 显示加载动画
    if (e.ctrlKey && e.altKey && e.key === 'g') {
        showLoadingAnimation();
    }
    
    // Ctrl+Alt+H 隐藏加载动画
    if (e.ctrlKey && e.altKey && e.key === 'h') {
        hideLoadingAnimation();
    }
});

// 导出函数供其他脚本使用
window.ExiaLoadingAnimation = {
    show: showLoadingAnimation,
    hide: hideLoadingAnimation
};

console.log('GundamEXIA Loading Animation - GN Drive Active!');