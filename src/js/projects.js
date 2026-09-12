import { projectsData } from './data.js';
import { 
  createIcons, 
  Layers, 
  Github, 
  ExternalLink, 
  FolderX,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
  Clock
} from 'lucide';

// State modal screenshot
let currentGallery = [];
let currentImageIndex = 0;
let currentDirection = 'next'; // 'next' atau 'prev'

// Render Project Cards ke Container
export function renderProjects(filterCategory = 'all') {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const filtered = filterCategory === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filterCategory);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
        <i data-lucide="folder-x" class="w-10 h-10 mx-auto mb-3 opacity-50"></i>
        <p class="text-base font-medium">Belum ada proyek di kategori ini.</p>
      </div>
    `;
    createIcons({ icons: { FolderX } });
    return;
  }

  container.innerHTML = filtered.map((project, idx) => {
    const hasScreenshots = project.screenshots && project.screenshots.length > 0;
    const cover = project.coverImage || (hasScreenshots ? project.screenshots[0].url : null);

    return `
    <div class="spotlight-card glass-card rounded-2xl overflow-hidden flex flex-col group border border-slate-200/80 dark:border-slate-800/80">
      <!-- Media Cover -->
      <div class="h-52 relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center border-b border-slate-200/60 dark:border-slate-800/60 group">
        ${cover ? `
          <img 
            src="${cover}" 
            alt="${project.title}" 
            class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 cursor-pointer project-gallery-trigger"
            data-project-id="${project.id}"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3.5 cursor-pointer project-gallery-trigger" data-project-id="${project.id}">
            <div class="flex justify-end">
              <span class="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-transform hover:scale-110 shadow-lg">
                <i data-lucide="images" class="w-4 h-4"></i>
              </span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-white/90 bg-cyan-500/80 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md">
                <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-300"></i>
                Buka Galeri Interaktif
              </span>
              <span class="text-[11px] font-mono font-medium text-slate-200 bg-black/60 px-2 py-0.5 rounded-md">
                ${hasScreenshots ? `${project.screenshots.length} Foto` : ''}
              </span>
            </div>
          </div>
        ` : `
          <div class="absolute inset-0 bg-grid-slate-700/[0.05] dark:bg-grid-slate-100/[0.05]"></div>
          <div class="relative z-10 flex flex-col items-center gap-2 text-center p-6">
            <div class="w-12 h-12 rounded-xl bg-indigo-500/10 dark:bg-cyan-500/10 flex items-center justify-center text-indigo-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
              <i data-lucide="layers" class="w-6 h-6"></i>
            </div>
            <span class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              ${project.imagePlaceholderText || project.title}
            </span>
          </div>
        `}
      </div>

      <!-- Content -->
      <div class="p-6 flex-1 flex flex-col">
        <!-- Tags -->
        <div class="flex flex-wrap gap-1.5 mb-3">
          ${project.tags.map(tag => `
            <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
              ${tag}
            </span>
          `).join('')}
        </div>

        <h3 class="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
          ${project.title}
        </h3>

        <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1">
          ${project.description}
        </p>

        <!-- Extra: Gallery View Button if available -->
        ${hasScreenshots ? `
          <div class="mb-4">
            <button 
              type="button"
              class="w-full flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-purple-500/15 hover:from-cyan-500/25 hover:to-indigo-500/25 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-md hover:shadow-cyan-500/10 transition-all project-gallery-trigger transform hover:-translate-y-0.5"
              data-project-id="${project.id}"
            >
              <i data-lucide="sparkles" class="w-4 h-4 text-cyan-500 dark:text-cyan-400 animate-pulse"></i>
              <span>Lihat Galeri Screenshot (${project.screenshots.length} Preview)</span>
            </button>
          </div>
        ` : ''}

        <!-- Actions -->
        <div class="flex items-center gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
          <a 
            href="${project.githubUrl || '#'}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            <i data-lucide="github" class="w-4 h-4"></i>
            Code
          </a>
          
          ${project.demoUrl ? `
            <a 
              href="${project.demoUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:text-slate-950 transition-colors ml-auto shadow-sm"
            >
              <i data-lucide="external-link" class="w-4 h-4"></i>
              Link Project
            </a>
          ` : `
            <span class="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-400 dark:text-slate-500 border border-slate-200/50 dark:border-slate-800 ml-auto cursor-default" title="Link demo segera hadir">
              <i data-lucide="clock" class="w-3.5 h-3.5"></i>
              Link Menyusul
            </span>
          `}
        </div>
      </div>
    </div>
    `;
  }).join('');

  createIcons({
    icons: {
      Layers,
      Github,
      ExternalLink,
      FolderX,
      Images,
      Clock
    }
  });

  setupGalleryEvents();
}

// Setup Gallery Modal logic
function ensureGalleryModal() {
  let modal = document.getElementById('project-gallery-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'project-gallery-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-xl hidden p-3 sm:p-6 opacity-0 transition-all duration-300 select-none';
    modal.innerHTML = `
      <div class="relative w-full max-w-4xl max-h-[96vh] flex flex-col items-center gallery-modal-content">
        
        <!-- Header Bar Modal -->
        <div class="w-full flex items-center justify-between mb-3 px-2">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-cyan-500/30">
              <i data-lucide="images" class="w-4 h-4"></i>
            </div>
            <div id="gallery-project-heading" class="text-sm font-bold text-white tracking-wide">
              Dual Clash: Strategy Arena
            </div>
          </div>

          <div class="flex items-center gap-2.5">
            <span id="gallery-counter" class="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-3 py-1 rounded-full shadow-inner"></span>
            <!-- Close Button -->
            <button 
              id="gallery-close-btn"
              class="p-2 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all hover:rotate-90 duration-300 cursor-pointer"
              title="Tutup (Esc)"
            >
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>
        </div>

        <!-- Main Interactive Image Viewport -->
        <div class="relative w-full flex items-center justify-center overflow-hidden rounded-2xl bg-slate-900/90 border border-slate-700/60 shadow-2xl gallery-glow-frame min-h-[350px] max-h-[68vh] sm:max-h-[72vh] p-2 sm:p-4">
          
          <img 
            id="gallery-active-img" 
            src="" 
            alt="Screenshot" 
            class="max-h-[64vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-xl select-none"
          />

          <!-- Navigation Prev/Next Overlay Buttons -->
          <button 
            id="gallery-prev-btn"
            class="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-600/60 hover:border-cyan-400 transition-all hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md cursor-pointer z-10"
            title="Foto Sebelumnya (←)"
          >
            <i data-lucide="chevron-left" class="w-6 h-6"></i>
          </button>
          <button 
            id="gallery-next-btn"
            class="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-600/60 hover:border-cyan-400 transition-all hover:scale-110 active:scale-95 shadow-xl backdrop-blur-md cursor-pointer z-10"
            title="Foto Berikutnya (→)"
          >
            <i data-lucide="chevron-right" class="w-6 h-6"></i>
          </button>

          <!-- Image Description Floating Pill -->
          <div class="absolute bottom-4 inset-x-4 flex justify-center pointer-events-none">
            <div id="gallery-img-title" class="text-xs sm:text-sm font-semibold text-white bg-slate-950/85 backdrop-blur-md border border-white/15 px-4 py-2 rounded-xl shadow-lg max-w-[90%] text-center">
            </div>
          </div>
        </div>

        <!-- Thumbnails Strip -->
        <div class="w-full flex items-center justify-center mt-3 overflow-hidden">
          <div id="gallery-thumbnails" class="flex items-center gap-2 overflow-x-auto max-w-full p-1.5 scrollbar-thin scrollbar-thumb-slate-700"></div>
        </div>

      </div>
    `;
    document.body.appendChild(modal);

    // Bind modal global buttons
    const closeBtn = document.getElementById('gallery-close-btn');
    const prevBtn = document.getElementById('gallery-prev-btn');
    const nextBtn = document.getElementById('gallery-next-btn');

    closeBtn.onclick = closeGallery;
    prevBtn.onclick = () => {
      currentDirection = 'prev';
      navigateGallery(-1);
    };
    nextBtn.onclick = () => {
      currentDirection = 'next';
      navigateGallery(1);
    };

    modal.onclick = (e) => {
      if (e.target === modal) closeGallery();
    };

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('hidden')) {
        if (e.key === 'Escape') closeGallery();
        if (e.key === 'ArrowLeft') {
          currentDirection = 'prev';
          navigateGallery(-1);
        }
        if (e.key === 'ArrowRight') {
          currentDirection = 'next';
          navigateGallery(1);
        }
      }
    });

    createIcons({
      icons: {
        X,
        ChevronLeft,
        ChevronRight
      }
    });
  }
}

function setupGalleryEvents() {
  ensureGalleryModal();

  const triggers = document.querySelectorAll('.project-gallery-trigger');
  triggers.forEach(trigger => {
    trigger.onclick = (e) => {
      e.stopPropagation();
      const projectId = trigger.getAttribute('data-project-id');
      const project = projectsData.find(p => p.id === projectId);
      if (project && project.screenshots && project.screenshots.length > 0) {
        openGallery(project.screenshots, 0, project.title);
      }
    };
  });
}

function openGallery(screenshots, startIndex = 0, projectTitle = '') {
  currentGallery = screenshots;
  currentImageIndex = startIndex;
  currentDirection = 'next';
  
  const modal = document.getElementById('project-gallery-modal');
  if (!modal) return;

  const headingEl = document.getElementById('gallery-project-heading');
  if (headingEl && projectTitle) {
    headingEl.textContent = projectTitle;
  }

  renderGalleryContent();
  modal.classList.remove('hidden');
  setTimeout(() => {
    modal.classList.remove('opacity-0');
  }, 10);
}

function closeGallery() {
  const modal = document.getElementById('project-gallery-modal');
  if (!modal) return;
  modal.classList.add('opacity-0');
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
}

function navigateGallery(direction) {
  if (currentGallery.length <= 1) return;
  currentImageIndex = (currentImageIndex + direction + currentGallery.length) % currentGallery.length;
  renderGalleryContent();
}

function renderGalleryContent() {
  const activeImg = document.getElementById('gallery-active-img');
  const titleEl = document.getElementById('gallery-img-title');
  const counterEl = document.getElementById('gallery-counter');
  const thumbsContainer = document.getElementById('gallery-thumbnails');

  if (!activeImg || !currentGallery[currentImageIndex]) return;

  const cur = currentGallery[currentImageIndex];
  
  // Re-trigger visual transition animation
  activeImg.classList.remove('gallery-slide-next', 'gallery-slide-prev');
  void activeImg.offsetWidth; // Force reflow
  activeImg.classList.add(currentDirection === 'next' ? 'gallery-slide-next' : 'gallery-slide-prev');

  activeImg.src = cur.url;
  activeImg.alt = cur.title || `Screenshot ${currentImageIndex + 1}`;
  titleEl.textContent = cur.title || `Screenshot ${currentImageIndex + 1}`;
  counterEl.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;

  // Render Thumbnails
  thumbsContainer.innerHTML = currentGallery.map((img, idx) => `
    <button 
      type="button" 
      class="h-11 w-16 sm:h-12 sm:w-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all transform hover:scale-105 cursor-pointer ${idx === currentImageIndex ? 'border-cyan-400 scale-105 shadow-lg shadow-cyan-500/30 opacity-100 ring-2 ring-cyan-500/50' : 'border-white/20 opacity-50 hover:opacity-90'}"
      data-idx="${idx}"
      title="${img.title || `Foto ${idx + 1}`}"
    >
      <img src="${img.url}" class="w-full h-full object-cover" alt="thumb ${idx + 1}" />
    </button>
  `).join('');

  // Thumbnail click handlers
  thumbsContainer.querySelectorAll('button').forEach(btn => {
    btn.onclick = () => {
      const targetIdx = parseInt(btn.getAttribute('data-idx'), 10);
      currentDirection = targetIdx >= currentImageIndex ? 'next' : 'prev';
      currentImageIndex = targetIdx;
      renderGalleryContent();
    };
  });

  // Scroll active thumbnail into view
  const activeBtn = thumbsContainer.querySelector(`button[data-idx="${currentImageIndex}"]`);
  if (activeBtn) {
    activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

// Inisialisasi Filter Projects
export function initProjectsPage() {
  const filterButtons = document.querySelectorAll('.project-filter-btn');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-indigo-600', 'text-white', 'dark:bg-cyan-500', 'dark:text-slate-950');
        b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      });

      btn.classList.add('active', 'bg-indigo-600', 'text-white', 'dark:bg-cyan-500', 'dark:text-slate-950');
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');

      const category = btn.getAttribute('data-category');
      renderProjects(category);
    });
  });

  renderProjects('all');
}
