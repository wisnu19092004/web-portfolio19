import { 
  createIcons, 
  Sun, 
  Moon, 
  Menu, 
  User, 
  Sparkle, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Code, 
  Compass, 
  CheckCircle, 
  Workflow, 
  Palette,
  ExternalLink,
  Phone,
  Copy,
  FolderGit2
} from 'lucide';

// Sinkronisasi status tema instan
export function applyTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Jalankan penerapan tema secepat mungkin sebelum render DOM selesai
applyTheme();

// Inisialisasi Lucide Icons
export function initIcons() {
  createIcons({
    icons: {
      Sun,
      Moon,
      Menu,
      User,
      Sparkle,
      Sparkles,
      Zap,
      ArrowRight,
      Github,
      Linkedin,
      Mail,
      MapPin,
      Code,
      Compass,
      CheckCircle,
      Workflow,
      Palette,
      ExternalLink,
      Phone,
      Copy,
      FolderGit2
    }
  });
}

// Inisialisasi Tema Gelap / Terang (Dark / Light Mode)
export function initThemeToggle() {
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  
  applyTheme();

  themeToggleButtons.forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      const isCurrentlyDark = document.documentElement.classList.contains('dark');
      if (isCurrentlyDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    };
  });
}

// Mobile Menu Toggle
export function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.onclick = (e) => {
      e.preventDefault();
      mobileMenu.classList.toggle('hidden');
    };
  }
}

// Highlight Menu Aktif Berdasarkan URL
export function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    const isHome = (currentPath === '/' || currentPath.endsWith('/') || currentPath.endsWith('index.html')) && (href === '/' || href === 'index.html' || href === './index.html');
    const isCurrentPage = currentPath.endsWith(href) || (href !== '/' && currentPath.includes(href.replace('./', '').replace('.html', '')));

    if (isHome || isCurrentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Spotlight Card Hover Effect
export function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Inisialisasi Global saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  initIcons();
  initThemeToggle();
  initMobileMenu();
  highlightActiveNav();
  initSpotlightCards();
});
