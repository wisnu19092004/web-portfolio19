import { skillsData } from './data.js';
import { 
  createIcons, 
  Smartphone, 
  Code2, 
  Gamepad2, 
  Hash, 
  Cpu, 
  Server, 
  Database, 
  Layout, 
  FileCode, 
  Palette, 
  Layers, 
  Figma, 
  Brush, 
  Box, 
  SearchX 
} from 'lucide';

// Render 5-Level Parallelogram Bars
export function renderParallelogramBars(level, total = 5) {
  let barsHtml = '<div class="flex items-center gap-1.5">';
  for (let i = 1; i <= total; i++) {
    const isActive = i <= level;
    barsHtml += `
      <div 
        class="parallelogram-bar h-2.5 w-6 ${isActive ? 'bar-active' : 'bar-inactive'}" 
        title="Level ${level} of ${total}"
      ></div>
    `;
  }
  barsHtml += '</div>';
  return barsHtml;
}

// Render Skill Cards ke dalam Container
export function renderSkills(filterCategory = 'all', searchQuery = '') {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const filtered = skillsData.filter(skill => {
    const matchesCategory = filterCategory === 'all' || skill.category === filterCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
        <i data-lucide="search-x" class="w-10 h-10 mx-auto mb-3 opacity-50"></i>
        <p class="text-base font-medium">Skill tidak ditemukan.</p>
        <p class="text-sm">Coba kata kunci lain atau pilih kategori "All".</p>
      </div>
    `;
    createIcons({ icons: { SearchX } });
    return;
  }

  container.innerHTML = filtered.map(skill => `
    <div class="spotlight-card glass-card rounded-2xl p-6 relative group overflow-hidden border border-slate-200/80 dark:border-slate-800/80">
      <!-- Top Row: Icon & Category Badge -->
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-tr ${skill.color} p-[1px] shadow-sm">
          <div class="w-full h-full bg-white dark:bg-slate-900 rounded-[11px] flex items-center justify-center text-slate-800 dark:text-slate-100 group-hover:scale-105 transition-transform">
            <i data-lucide="${skill.icon}" class="w-6 h-6"></i>
          </div>
        </div>
        <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          ${skill.categoryLabel}
        </span>
      </div>

      <!-- Skill Name & Star rating -->
      <div class="flex items-center justify-between mb-1.5">
        <h3 class="text-lg font-bold text-slate-800 dark:text-white group-hover:text-cyan-500 transition-colors">
          ${skill.name}
        </h3>
        <span class="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold tracking-wider">
          ${skill.level} / 5
        </span>
      </div>

      <!-- Parallelogram Indicator -->
      <div class="mt-2 mb-4">
        ${renderParallelogramBars(skill.level, 5)}
      </div>

      <!-- Description -->
      <p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
        ${skill.description}
      </p>
    </div>
  `).join('');

  createIcons({
    icons: {
      Smartphone,
      Code2,
      Gamepad2,
      Hash,
      Cpu,
      Server,
      Database,
      Layout,
      FileCode,
      Palette,
      Layers,
      Figma,
      Brush,
      Box,
      SearchX
    }
  });
}

// Inisialisasi Event Listener Filter & Search
export function initSkillsPage() {
  const filterButtons = document.querySelectorAll('.skill-filter-btn');
  const searchInput = document.getElementById('skill-search-input');
  
  let currentCategory = 'all';
  let currentSearch = '';

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-indigo-600', 'text-white', 'dark:bg-cyan-500', 'dark:text-slate-950');
        b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      });

      btn.classList.add('active', 'bg-indigo-600', 'text-white', 'dark:bg-cyan-500', 'dark:text-slate-950');
      btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');

      currentCategory = btn.getAttribute('data-category');
      renderSkills(currentCategory, currentSearch);
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderSkills(currentCategory, currentSearch);
    });
  }

  // Render awal
  renderSkills('all', '');
}
