/* xAI Clone — JavaScript */
document.addEventListener('DOMContentLoaded', () => {

  // ===== Navbar Dropdowns (hover to open) =====
  const dropdowns = document.querySelectorAll('[data-xai-dropdown]');
  dropdowns.forEach(dd => {
    dd.addEventListener('mouseenter', () => {
      dropdowns.forEach(d => d.classList.remove('open'));
      dd.classList.add('open');
    });
    dd.addEventListener('mouseleave', () => {
      dd.classList.remove('open');
    });
  });
  document.querySelectorAll('.xai-dropdown-menu').forEach(m => m.addEventListener('click', e => e.stopPropagation()));

  // ===== Product Tab Switching =====
  const productItems = document.querySelectorAll('.xai-product-item');
  const previewPanels = document.querySelectorAll('.xai-preview-panel');

  productItems.forEach(item => {
    item.addEventListener('click', () => {
      const product = item.dataset.product;

      // Update active item
      productItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      // Update active panel
      previewPanels.forEach(p => p.classList.remove('active'));
      const targetPanel = document.querySelector(`[data-preview="${product}"]`);
      if (targetPanel) {
        targetPanel.classList.add('active');
        // Re-trigger animations by cloning and replacing animated elements
        retriggerAnimations(targetPanel);
      }
    });
  });

  function retriggerAnimations(panel) {
    // Re-trigger CSS animations on chat bubbles
    panel.querySelectorAll('.anim-fade').forEach(el => {
      el.style.animation = 'none';
      el.offsetHeight; // force reflow
      el.style.animation = '';
    });
  }

  // ===== Auto-cycle through products =====
  let currentIdx = 0;
  const totalProducts = productItems.length;
  let autoInterval;

  function startAutoCycle() {
    autoInterval = setInterval(() => {
      currentIdx = (currentIdx + 1) % totalProducts;
      productItems[currentIdx].click();
    }, 5000);
  }

  function stopAutoCycle() {
    clearInterval(autoInterval);
  }

  startAutoCycle();

  // Pause on hover
  const container = document.querySelector('.xai-products-container');
  if (container) {
    container.addEventListener('mouseenter', stopAutoCycle);
    container.addEventListener('mouseleave', startAutoCycle);
  }

  // Stop auto-cycle on manual click, restart after 15s
  productItems.forEach(item => {
    item.addEventListener('click', () => {
      stopAutoCycle();
      currentIdx = Array.from(productItems).indexOf(item);
      setTimeout(startAutoCycle, 15000);
    });
  });

});
