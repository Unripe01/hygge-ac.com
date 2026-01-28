/**
 * 一般社団法人 ヒュッゲ美育協会
 * メインJavaScript
 */

(function() {
  'use strict';

  // DOM Ready
  document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initSmoothScroll();
    initCurrentPageHighlight();
  });

  /**
   * モバイルナビゲーションの初期化
   */
  function initMobileNav() {
    var toggle = document.querySelector('.nav__toggle');
    var navList = document.querySelector('.nav__list');

    if (!toggle || !navList) return;

    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      navList.classList.toggle('nav__list--open');
      
      var isOpen = navList.classList.contains('nav__list--open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // ナビリンククリックで閉じる
    var navLinks = navList.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navList.classList.remove('nav__list--open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // 外側クリックで閉じる
    document.addEventListener('click', function(e) {
      if (!toggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('nav__list--open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /**
   * スムーススクロールの初期化
   */
  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        var target = document.querySelector(targetId);
        
        if (target) {
          e.preventDefault();
          
          var headerHeight = document.querySelector('.header');
          var offset = headerHeight ? headerHeight.offsetHeight : 0;
          
          var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /**
   * 現在のページをナビゲーションでハイライト
   */
  function initCurrentPageHighlight() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav__link, .footer__nav-link');
    
    navLinks.forEach(function(link) {
      var linkHref = link.getAttribute('href');
      
      if (linkHref === currentPage) {
        link.classList.add('nav__link--active');
      }
    });
  }

})();
