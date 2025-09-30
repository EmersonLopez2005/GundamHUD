// 管理页面检测器
(function() {
  'use strict';
  
  // 检测是否是管理页面
  function isAdminPage() {
    const url = window.location.href;
    const pathname = window.location.pathname;
    
    return url.includes('/admin') || 
           pathname.includes('/admin') ||
           document.title.includes('Admin') ||
           document.title.includes('管理') ||
           document.body.className.includes('admin');
  }
  
  // 如果是管理页面，禁用主题
  if (isAdminPage()) {
    console.log('🔧 检测到管理页面，禁用机动战士主题');
    
    // 移除主题样式
    const themeStyles = document.querySelectorAll('link[href*="exia-theme"]');
    themeStyles.forEach(style => style.remove());
    
    // 阻止主题脚本执行
    window.gundamSystemDisabled = true;
    
    // 恢复原始样式
    document.body.style.background = '';
    document.body.style.color = '';
    document.body.style.fontFamily = '';
  }
})();