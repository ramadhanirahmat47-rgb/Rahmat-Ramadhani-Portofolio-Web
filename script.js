
'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

let app, db, docRef;

async function initFirebase() {
  const response = await fetch('/firebase-applet-config.json');
  const firebaseConfig = await response.json();
  
  app = initializeApp(firebaseConfig);
  const databaseId = firebaseConfig.firestoreDatabaseId || "(default)";
  db = getFirestore(app, databaseId);
  docRef = doc(db, "portfolio", "data");
  
  onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      const parsed = snap.data();
      appData = {
        ...defaultPortfolioData,
        ...parsed,
        profile: { ...defaultPortfolioData.profile, ...(parsed.profile || {}) },
        hero: { ...defaultPortfolioData.hero, ...(parsed.hero || {}) },
        social: { ...defaultPortfolioData.social, ...(parsed.social || {}) },
        settings: { ...defaultPortfolioData.settings, ...(parsed.settings || {}) },
        skills: (parsed.skills && parsed.skills.length) ? parsed.skills : defaultPortfolioData.skills,
        experience: (parsed.experience && parsed.experience.length) ? parsed.experience : defaultPortfolioData.experience,
        projects: (parsed.projects && parsed.projects.length) ? parsed.projects : defaultPortfolioData.projects,
        education: (parsed.education && parsed.education.length) ? parsed.education : defaultPortfolioData.education,
        certificates: (parsed.certificates && parsed.certificates.length) ? parsed.certificates : defaultPortfolioData.certificates,
        services: (parsed.services && parsed.services.length) ? parsed.services : defaultPortfolioData.services
      };
    }
    // Re-render
    syncDynamicData();
    renderSkills();
    renderExperience();
    renderEducation();
    renderCertificates();
    renderServices();
    ProjectsEngine.render();
    // Re-observe dynamically created .reveal elements and skill bars
    refreshScrollReveal();
    refreshSkillBars();
  });
}
initFirebase();



/* ==========================================================================
   DEFAULT COMPLETE DATASET (Shared Schema with admin.js)
   ========================================================================== */
const defaultPortfolioData = {
  "profile": {
    "name": "Rahmat Ramadhani",
    "role": "Software Engineering Student",
    "school": "SMK Krian 1 Sidoarjo",
    "major": "Rekayasa Perangkat Lunak / Software Engineering",
    "location": "Sidoarjo, Jawa Timur",
    "email": "ramadhanirahmat47@gmail.com",
    "status": "Available for Learning & Projects",
    "avatar": "assets/profile.jpg",
    "bio": "Sebagai seorang pelajar Rekayasa Perangkat Lunak (RPL) di SMK Krian 1, saya memiliki ketertarikan mendalam pada dunia pengembangan web dan pemrograman. Perjalanan belajar ini tidak hanya memberi saya pemahaman teknis yang kuat, tetapi juga memicu semangat saya untuk terus mengeksplorasi teknologi-teknologi terbaru yang terus berkembang. Bagi saya, mempraktikkan ilmu melalui pembuatan proyek-proyek digital yang fungsional dan berdampak nyata adalah cara terbaik untuk mengasah keterampilan, memecahkan masalah kompleks, dan menghadirkan solusi yang bermanfaat bagi banyak orang.",
    "philosophy": "Sebagai seorang pelajar Rekayasa Perangkat Lunak (RPL) di SMK Krian 1, saya memiliki ketertarikan mendalam pada dunia pengembangan web dan pemrograman. Perjalanan belajar ini tidak hanya memberi saya pemahaman teknis yang kuat, tetapi juga memicu semangat saya untuk terus mengeksplorasi teknologi-teknologi terbaru yang terus berkembang. Bagi saya, mempraktikkan ilmu melalui pembuatan proyek-proyek digital yang fungsional dan berdampak nyata adalah cara terbaik untuk mengasah keterampilan, memecahkan masalah kompleks, dan menghadirkan solusi yang bermanfaat bagi banyak orang.",
    "stats": {
      "certificates": 8,
      "technologies": 12,
      "projects": 18,
      "learningYears": 3
    }
  },
  "hero": {
    "badge": "Available for Learning & Projects",
    "greeting": "Hi, I'm",
    "name": "Rahmat Ramadhani",
    "roleLead": "Specialized as a",
    "roles": [
      "Software Engineering Student"
    ],
    "description": "I am a Software Engineering Student at SMK Krian 1 who is interested in web development and programming. I enjoy learning new technologies and creating usefull digital projects.",
    "primaryBtnText": "View My Projects",
    "primaryBtnLink": "#projects",
    "secondaryBtnText": "Contact Me",
    "secondaryBtnLink": "#contact",
    "cvBtnText": "Download CV"
  },
  "skills": [
    {
      "id": 1,
      "level": 40,
      "name": "HTML5 Semantic",
      "category": "Frontend"
    },
    {
      "category": "Frontend",
      "id": 2,
      "name": "CSS3 / Flex / Grid",
      "level": 10
    },
    {
      "id": 3,
      "category": "Frontend",
      "name": "Vanilla JavaScript (ES6+)",
      "level": 10
    },
    {
      "id": 4,
      "level": 10,
      "category": "Frontend",
      "name": "Responsive & UI/UX"
    },
    {
      "id": 5,
      "name": "JavaScript Logic & DOM",
      "level": 10,
      "category": "Programming"
    },
    {
      "level": 35,
      "name": "Python Fundamentals",
      "id": 6,
      "category": "Programming"
    },
    {
      "category": "Programming",
      "level": 20,
      "id": 7,
      "name": "Java (OOP Architecture)"
    },
    {
      "level": 15,
      "id": 8,
      "category": "Programming",
      "name": "C++ Core Logic"
    },
    {
      "id": 9,
      "name": "Git & GitHub Workflow",
      "level": 20,
      "category": "Tools"
    },
    {
      "name": "VS Code & Web DevTools",
      "category": "Tools",
      "id": 10,
      "level": 60
    },
    {
      "id": 11,
      "name": "Figma UI Prototyping",
      "category": "Tools",
      "level": 70
    },
    {
      "category": "Tools",
      "id": 12,
      "level": 10,
      "name": "REST APIs & Fetch / JSON"
    }
  ],
  "projects": [
    {
      "image": "assets/projects/project-1.jpg",
      "features": [],
      "github": "https://embed.figma.com/proto/Skd7WYRCNgcux2502m3PG9/RAHMAT-RAMADHANI-X-RPL-1?node-id=1-57&starting-point-node-id=1%3A3&embed-host=share",
      "fullDescription": "Projek Hasil Dari Lomba 17 agustus Web Design",
      "category": "UI/UX",
      "createdAt": "2026-09-09",
      "technologies": [],
      "description": "Projek Hasil Dari Lomba 17 agustus Web Design",
      "id": 1788965526874,
      "title": "Mobile App Design",
      "demo": "https://embed.figma.com/proto/Skd7WYRCNgcux2502m3PG9/RAHMAT-RAMADHANI-X-RPL-1?node-id=1-57&starting-point-node-id=1%3A3&embed-host=share"
    },
    {
      "createdAt": "2026-09-09",
      "title": "Menananam Kangkung: Tugas Ketahanan Pangan Mapel PPLG",
      "technologies": [],
      "fullDescription": "Proyek ketahanan pangan dalam mata pelajaran Pengembangan Perangkat Lunak dan Gim (PPLG) ini merupakan wujud nyata dari integrasi antara dunia pendidikan kejuruan dan kemandirian lingkungan. Kegiatan budidaya tanaman kangkung ini dirancang tidak hanya untuk memahami proses agrikultur praktis dari tahap penanaman hingga masa panen, tetapi juga sebagai media eksplorasi untuk melihat bagaimana teknologi dapat diterapkan dalam mengoptimalkan pengelolaan pertanian perkotaan skala kecil. Melalui proyek ini, para siswa dilatih untuk mengembangkan kepedulian terhadap isu ketahanan pangan, mengasah kedisiplinan dalam perawatan tanaman, serta membangun kesadaran kolektif tentang pentingnya inovasi berkelanjutan yang dimulai dari lingkungan sekolah.",
      "description": "Proyek ketahanan pangan mata pelajaran Pengembangan Perangkat Lunak dan Gim (PPLG) berupa kegiatan budidaya tanaman kangkung, yang menggabungkan proses pembelajaran agrikultur praktis untuk mendukung kemandirian pangan.",
      "demo": "#",
      "features": [],
      "category": "Farm",
      "github": "#",
      "image": "assets/projects/project-2.jpg",
      "id": 1788966321770
    },
    {
      "github": "#",
      "id": 1788967027105,
      "category": "Farm",
      "demo": "#",
      "image": "assets/projects/project-3.jpg",
      "description": "Proyek ketahanan pangan dan pemanfaatan lahan sekolah melalui budidaya 10 jenis Tanaman Obat Keluarga (TOGA) pilihan, yang memadukan kegiatan agrikultur praktis dengan penerapan teknologi digital untuk mendukung kesehatan mandiri dan edukasi lingkungan.",
      "fullDescription": "Proyek budidaya 10 Tanaman Obat Keluarga (TOGA) ini merupakan bagian dari inisiatif ketahanan pangan dan pemanfaatan lahan lingkungan sekitar. Proyek ini tidak hanya melatih kepedulian terhadap lingkungan dan kearifan lokal melalui pemanfaatan tanaman herbal, tetapi juga menjadi sarana aplikatif untuk menggabungkan ilmu rekayasa perangkat lunak dalam pengelolaan data pertanian modern.",
      "createdAt": "2026-09-09",
      "features": [],
      "technologies": [],
      "title": "Menanam 10 Jenis TOGA: Projek Kesehatan Mandiri dan Lingkungan"
    }
  ],
  "experience": [],
  "education": [
    {
      "description": "Program kejuruan terakreditasi A dengan kurikulum berbasis industri. Mempelajari rekayasa perangkat lunak modern, database management, algoritma struktur data, dan pengembangan UI web profesional.",
      "achievements": [
        "Juara 1 Kompetisi Web Design (2026)."
      ],
      "institution": "SMK Krian 1",
      "coursework": [
        "Pemrograman Berorientasi Objek (OOP)",
        "Pemrograman Web & Mobile",
        "Basis Data Relasional & SQL",
        "Desain Pengalaman Pengguna (UI/UX)",
        "Pengujian Perangkat Lokasi (QA)"
      ],
      "id": 1,
      "years": "2026 - Present",
      "major": "Rekayasa Perangkat Lunak (Software Engineering)"
    }
  ],
  "certificates": [
    {
      "image": "assets/certificates/cert-1.jpg",
      "credentialUrl": "https://dicoding.com",
      "credentialId": "NVP7WY21RZR0",
      "id": 1,
      "issuer": "Dicoding Academy",
      "description": "memulai karier di dunia AI. Setelah mengikuti kelas, siswa diharapkan mampu menelaah berbagai konsep dasar dalam AI beserta penerapannya dengan baik.",
      "title": "Belajar Dasar AI",
      "year": "2026"
    },
    {
      "year": "2026",
      "description": "belajar dasar pemrograman Python dengan mengacu pada standar industri. Di akhir kelas, siswa mampu membuat program dengan Python menggunakan berbagai IDE yang telah dipelajari, seperti Visual Studio Code, Jupyter Notebook, dan Google Colaboratory.",
      "issuer": "Dicoding Academy",
      "credentialUrl": "https://freecodecamp.org",
      "id": 2,
      "image": "assets/certificates/cert-2.jpg",
      "credentialId": "07Z6QR412ZQR",
      "title": "Pemrograman Dengan Python"
    },
    {
      "title": "Introduction To Financial Literacy",
      "credentialUrl": "https://interaction-design.org",
      "image": "assets/certificates/cert-3.jpg",
      "year": "2026",
      "id": 3,
      "description": "bagi peserta Coding Camp powered by DBS Foundation 2026 yang ingin belajar mengenai Literasi Finansial. Di akhir kelas, peserta mampu membangun pemahaman yang kuat tentang prinsip-prinsip dasar literasi finansial, menerapkannya dalam pengambilan keputusan keuangan sehari-hari, serta merancang strategi finansial jangka panjang.",
      "issuer": "Dicoding Academy",
      "credentialId": "ERZR79RWMZYV"
    },
    {
      "year": "2026",
      "title": "Belajar Strategi Pengembangan Diri",
      "credentialUrl": "https://bnsp.go.id",
      "credentialId": "JLX1KL1KJP72",
      "id": 4,
      "issuer": "Dicoding Academy",
      "image": "assets/certificates/cert-4.jpg",
      "description": "bagi pelajar maupun pekerja yang ingin mengembangkan diri dalam kehidupan pribadi dan profesi (karier). Setelah mengikuti kelas, siswa mampu menerapkan berbagai strategi pengembangan diri melalui pengelolaan pola pikir (growth mindset), waktu (time management), dan proses adaptasi (adaptability) dalam kehidupan pribadi dan profesional."
    }
  ],
  "services": [
    {
      "features": [],
      "icon": "wegwg",
      "status": "Active",
      "description": "egfeswgew",
      "title": "rhrwh",
      "id": 1789005603905
    }
  ],
  "social": {
    "github": "https://github.com/ramadhanirahmat47-rgb",
    "linkedin": "https://www.linkedin.com/in/rahmat-ramadhani01",
    "instagram": "https://www.instagram.com/matrahmat_t/",
    "email": "ramadhanirahmat47@gmail.com"
  },
  "settings": {
    "siteTitle": "Rahmat Ramadhani | Software Engineering Student Portfolio",
    "accentColor": "#38bdf8",
    "theme": "dark",
    "footerText": "Terus belajar, terus berkarya, dan menciptakan solusi dari setiap tantangan.",
    "footerCopyright": "Rahmat Ramadhani. Built with Love❤️.",
    "lastUpdated": "2026-09-10"
  }
}
;

// Global active data state
let appData = JSON.parse(JSON.stringify(defaultPortfolioData));

/* ==========================================================================
   LOCALSTORAGE DATABASE SYNC ENGINE
   ========================================================================== */


/* ==========================================================================
   TOAST NOTIFICATION MANAGER
   ========================================================================== */
const ToastManager = {
  box: document.getElementById('toast-container'),
  show(message, type = 'info', duration = 3000) {
    if (!this.box) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    const icon = type === 'success' ? '✓' : 'ℹ';
    toast.innerHTML = `<strong>${icon}</strong><span>${message}</span>`;
    this.box.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
    }, duration);
  }
};

/* ==========================================================================
   DYNAMIC SECTION RENDERERS
   ========================================================================== */

/* 1. Synchronize Profile, Hero, Settings, and Socials */
function syncDynamicData() {
  const p = appData.profile;
  const h = appData.hero;
  const s = appData.settings;
  const soc = appData.social;

  // Window Title & Accent Color
  if (s.siteTitle) document.title = s.siteTitle;
  if (s.accentColor) {
    document.documentElement.style.setProperty('--accent-cyan', s.accentColor);
  }

  // Data bindings (name, role, school, major, location, bio, email, shortName)
  document.querySelectorAll('[data-bind]').forEach(el => {
    const k = el.getAttribute('data-bind');
    if (k === 'shortName') {
      const parts = (p.name || 'Rahmat').trim().split(/\s+/);
      el.textContent = parts[0] || 'Rahmat';
    } else if (p[k]) {
      el.textContent = p[k];
    }
  });

  document.querySelectorAll('[data-bind-href]').forEach(el => {
    const k = el.getAttribute('data-bind-href');
    if (k === 'email' && p.email) el.setAttribute('href', `mailto:${p.email}`);
  });

  // Profile Photo
  const avatarImg = document.getElementById('profile-avatar-img');
  if (avatarImg && p.avatar) {
    avatarImg.src = p.avatar;
  }

  // Hero Section Elements
  const heroBadge = document.getElementById('hero-badge');
  if (heroBadge && h.badge) {
    heroBadge.innerHTML = `<span class="dot-pulse"></span>${h.badge}`;
  }

  const heroHeading = document.getElementById('hero-heading');
  if (heroHeading) {
    const greet = h.greeting || "Hi, I'm";
    const name = h.name || p.name;
    heroHeading.innerHTML = `${greet} <span class="gradient-text">${name}</span>`;
  }

  const roleLead = document.getElementById('hero-role-lead');
  if (roleLead && h.roleLead) roleLead.textContent = h.roleLead;

  const heroDesc = document.getElementById('hero-desc');
  if (heroDesc && h.description) heroDesc.textContent = h.description;

  const btnPrimary = document.getElementById('hero-btn-primary');
  if (btnPrimary) {
    if (h.primaryBtnText) btnPrimary.querySelector('span').textContent = h.primaryBtnText;
    if (h.primaryBtnLink) btnPrimary.setAttribute('href', h.primaryBtnLink);
  }

  const btnSecondary = document.getElementById('hero-btn-secondary');
  if (btnSecondary) {
    if (h.secondaryBtnText) btnSecondary.querySelector('span').textContent = h.secondaryBtnText;
    if (h.secondaryBtnLink) btnSecondary.setAttribute('href', h.secondaryBtnLink);
  }

  const btnCv = document.getElementById('hero-btn-cv');
  if (btnCv && h.cvBtnText) btnCv.textContent = h.cvBtnText;

  const projChip = document.getElementById('hero-projects-count-chip');
  if (projChip) projChip.textContent = `${appData.projects.length}+ Projects`;

  // About Section Texts & Stats
  const aboutStatus = document.getElementById('about-status-text');
  if (aboutStatus && p.status) aboutStatus.textContent = p.status;

  const aboutPhilosophy = document.getElementById('about-philosophy');
  if (aboutPhilosophy && p.philosophy) aboutPhilosophy.textContent = p.philosophy;

  const statProj = document.getElementById('stat-proj-count');
  if (statProj) statProj.setAttribute('data-target', appData.projects.length);

  const statTech = document.getElementById('stat-tech-count');
  if (statTech) statTech.setAttribute('data-target', appData.skills.length);

  const statCert = document.getElementById('stat-cert-count');
  if (statCert) statCert.setAttribute('data-target', appData.certificates.length);

  // Social Links
  document.querySelectorAll('[data-social="github"]').forEach(el => el.setAttribute('href', soc.github || '#'));
  document.querySelectorAll('[data-social="linkedin"]').forEach(el => el.setAttribute('href', soc.linkedin || '#'));
  document.querySelectorAll('[data-social="instagram"]').forEach(el => el.setAttribute('href', soc.instagram || '#'));

  // Footer Texts
  const footerMotto = document.getElementById('footer-motto');
  if (footerMotto && s.footerText) footerMotto.textContent = s.footerText;

  const footerCopyright = document.getElementById('footer-copyright');
  if (footerCopyright && s.footerCopyright) {
    footerCopyright.innerHTML = `&copy; 2026 ${p.name}. ${s.footerCopyright}`;
  }
}

/* 2. Dynamic Skills Renderer */
function renderSkills() {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  const grouped = {};
  appData.skills.forEach(s => {
    const cat = s.category || 'General';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(s);
  });

  const categoryIcons = {
    Frontend: '🎨',
    Programming: '💻',
    Tools: '⚙️',
    Other: '⚡'
  };

  container.innerHTML = Object.entries(grouped).map(([cat, list]) => `
    <div class="card skill-card reveal">
      <div class="skill-top">
        <span class="skill-ico">${categoryIcons[cat] || '✨'}</span>
        <div>
          <h3>${cat}</h3>
          <small>${list.length} competencies tracked</small>
        </div>
      </div>
      <div class="skill-rows">
        ${list.map(s => `
          <div class="skill-row">
            <div class="skill-info">
              <span>${s.name}</span>
              <span class="skill-pct">${s.level}%</span>
            </div>
            <div class="bar-bg">
              <div class="bar-val" data-progress="${s.level}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* 3. Dynamic Experience Timeline Renderer */
function renderExperience() {
  const container = document.getElementById('experience-timeline');
  if (!container) return;

  container.innerHTML = appData.experience.map((e, idx) => `
    <div class="timeline-row">
      <div class="timeline-point"></div>
      <div class="card timeline-box">
        <div class="timeline-top-row">
          <span class="timeline-yr">${e.year}</span>
          <span class="${idx === 0 ? 'pill-active' : 'pill-norm'}">${idx === 0 ? 'Current Focus' : 'Milestone'}</span>
        </div>
        <h3 class="timeline-role">${e.role}</h3>
        <h4 class="timeline-org">${e.company}</h4>
        <p>${e.description}</p>
        <div class="timeline-chips">
          ${(e.technologies || []).map(t => `<span class="chip-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

/* 4. Dynamic Education Renderer */
function renderEducation() {
  const container = document.getElementById('education-container');
  if (!container) return;

  container.innerHTML = appData.education.map(edu => `
    <div class="card edu-box">
      <div class="edu-header">
        <div class="edu-ico">🎓</div>
        <div>
          <span class="edu-yr">${edu.years}</span>
          <h3 class="edu-title">${edu.institution}</h3>
          <h4 class="edu-dept">${edu.major}</h4>
        </div>
      </div>
      <p class="edu-desc">${edu.description}</p>
      ${edu.coursework && edu.coursework.length ? `
        <div class="edu-courses">
          <h5>Relevant Coursework &amp; Subjects:</h5>
          <div class="course-chips">
            ${edu.coursework.map(c => `<span>${c}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      ${edu.achievements && edu.achievements.length ? `
        <div class="edu-achieve">
          <h5>Academic Highlights:</h5>
          <ul class="check-list">
            ${edu.achievements.map(a => `<li><span class="accent-star">✦</span> ${a}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `).join('');
}

/* 5. Dynamic Certificates Renderer */
function renderCertificates() {
  const container = document.getElementById('certificates-grid');
  if (!container) return;

  container.innerHTML = appData.certificates.map(c => `
    <div class="card cert-item" data-id="${c.id}" tabindex="0" role="button" aria-label="View verified certificate for ${c.title}">
      <div class="cert-thumb">
        <img src="${c.image}" alt="${c.title}" class="cert-img" loading="lazy">
      </div>
      <div class="cert-head">
        <span class="cert-badge-yr">${c.year}</span>
        <span class="cert-badge-iss">${c.issuer}</span>
      </div>
      <h3 class="cert-h3">${c.title}</h3>
      <p class="cert-text">${c.description}</p>
      <span class="cert-action">View Verified Credential →</span>
    </div>
  `).join('');
}

/* 6. Dynamic Services Renderer */
function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container) return;

  container.innerHTML = appData.services.map(s => `
    <div class="card service-box reveal">
      <div class="serv-ico">${s.icon || '🛠️'}</div>
      <h3 class="serv-title">${s.title}</h3>
      <p class="serv-desc">${s.description}</p>
      <ul class="check-list">
        ${(s.features || []).map(f => `<li><span class="check-mark">✓</span> ${f}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('portfolio-theme') || appData.settings.theme || 'dark';
  root.setAttribute('data-theme', saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const cur = root.getAttribute('data-theme') || 'dark';
      const next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      ToastManager.show(next === 'dark' ? 'Dark theme enabled' : 'Light theme enabled', 'info', 2000);
    });
  }
}

/* ==========================================================================
   SCROLL BEHAVIORS & INTERSECTION OBSERVERS
   ========================================================================== */
function initScrollBehaviors() {
  const bar = document.getElementById('scroll-progress');
  const header = document.getElementById('header');
  const topBtn = document.getElementById('back-to-top');

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? (y / h) * 100 : 0;
    if (bar) {
      bar.style.width = `${pct}%`;
      bar.setAttribute('aria-valuenow', Math.round(pct));
    }
    if (header) {
      if (y > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    if (topBtn) {
      if (y > 300) topBtn.classList.add('visible');
      else topBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function initActiveSectionSpy() {
  const secs = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        links.forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === `#${id}`) l.classList.add('active');
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
  secs.forEach(s => obs.observe(s));
}

function initMobileMenu() {
  const btn = document.getElementById('hamburger-btn');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');
  if (!btn || !menu) return;

  const toggle = () => {
    const isOpen = menu.classList.contains('active');
    if (isOpen) close(); else open();
  };
  const open = () => {
    menu.classList.add('active');
    btn.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    menu.classList.remove('active');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', toggle);
  links.forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) close();
  });
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('active') && !menu.contains(e.target) && !btn.contains(e.target)) {
      close();
    }
  });
}

function initTypingEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const roles = (appData.hero && appData.hero.roles && appData.hero.roles.length)
    ? appData.hero.roles
    : ["Software Engineering Student", "Frontend Web Developer", "Creative Programmer"];

  let r = 0, c = 0, del = false, spd = 90;

  function step() {
    const cur = roles[r] || "Software Engineering Student";
    if (del) {
      el.textContent = cur.substring(0, c - 1);
      c--;
      spd = 45;
    } else {
      el.textContent = cur.substring(0, c + 1);
      c++;
      spd = 100;
    }
    if (!del && c === cur.length) {
      spd = 2200;
      del = true;
    } else if (del && c === 0) {
      del = false;
      r = (r + 1) % roles.length;
      spd = 450;
    }
    setTimeout(step, spd);
  }
  step();
}

function initCounters() {
  const list = document.querySelectorAll('.counter');
  if (!list.length) return;
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const start = performance.now();
        const duration = 1600;
        const anim = (now) => {
          const prog = Math.min((now - start) / duration, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - prog, 3)) * target);
          if (prog < 1) requestAnimationFrame(anim);
          else el.textContent = target;
        };
        requestAnimationFrame(anim);
        o.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  list.forEach(i => obs.observe(i));
}

let revealObserver = null;

function initScrollReveal() {
  revealObserver = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  const items = document.querySelectorAll('.reveal');
  items.forEach(i => revealObserver.observe(i));
}

function refreshScrollReveal() {
  if (!revealObserver) return;
  // Observe any new .reveal elements that haven't been revealed yet
  const items = document.querySelectorAll('.reveal:not(.revealed)');
  items.forEach(i => revealObserver.observe(i));
}

let skillBarObserver = null;

function initSkillBars() {
  skillBarObserver = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const b = e.target;
        b.style.width = `${b.getAttribute('data-progress') || '0'}%`;
        o.unobserve(b);
      }
    });
  }, { threshold: 0.25 });
  const bars = document.querySelectorAll('.bar-val');
  bars.forEach(b => skillBarObserver.observe(b));
}

function refreshSkillBars() {
  if (!skillBarObserver) return;
  // Observe any new skill bar elements after re-render
  const bars = document.querySelectorAll('.bar-val');
  bars.forEach(b => {
    b.style.width = '0%';
    skillBarObserver.observe(b);
  });
}

/* ==========================================================================
   DYNAMIC PROJECTS ENGINE
   ========================================================================== */
const ProjectsEngine = {
  grid: document.getElementById('projects-grid'),
  search: document.getElementById('project-search'),
  clear: document.getElementById('search-clear-btn'),
  tabsBox: document.getElementById('project-filter-tabs'),
  empty: document.getElementById('projects-empty-state'),
  reset: document.getElementById('reset-filters-btn'),
  cat: 'All',
  query: '',

  init() {
    if (!this.grid) return;
    this.renderCategoryTabs();
    this.render();
    this.bind();
  },

  renderCategoryTabs() {
    if (!this.tabsBox) return;
    const categories = Array.from(new Set(appData.projects.map(p => p.category))).filter(Boolean);
    const tabs = ['All', ...categories];

    this.tabsBox.innerHTML = tabs.map(t => `
      <button class="filter-tab ${t === this.cat ? 'active' : ''}" data-filter="${t}" role="tab" aria-selected="${t === this.cat}">
        ${t}
      </button>
    `).join('');
  },

  bind() {
    if (this.tabsBox) {
      this.tabsBox.addEventListener('click', (e) => {
        const tab = e.target.closest('.filter-tab');
        if (!tab) return;
        this.tabsBox.querySelectorAll('.filter-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        this.cat = tab.getAttribute('data-filter') || 'All';
        this.render();
      });
    }

    if (this.search) {
      this.search.addEventListener('input', (e) => {
        this.query = e.target.value.trim().toLowerCase();
        if (this.clear) {
          if (this.query) this.clear.classList.add('visible');
          else this.clear.classList.remove('visible');
        }
        this.render();
      });
    }

    if (this.clear) {
      this.clear.addEventListener('click', () => {
        if (this.search) {
          this.search.value = '';
          this.query = '';
          this.clear.classList.remove('visible');
          this.search.focus();
          this.render();
        }
      });
    }

    if (this.reset) {
      this.reset.addEventListener('click', () => {
        this.cat = 'All';
        this.query = '';
        if (this.search) this.search.value = '';
        if (this.clear) this.clear.classList.remove('visible');
        if (this.tabsBox) {
          this.tabsBox.querySelectorAll('.filter-tab').forEach(t => {
            t.classList.toggle('active', t.getAttribute('data-filter') === 'All');
            t.setAttribute('aria-selected', t.getAttribute('data-filter') === 'All');
          });
        }
        this.render();
      });
    }

    this.grid.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-details');
      if (btn) {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const p = appData.projects.find(item => item.id === id);
        if (p) ModalEngine.openProject(p);
      }
    });
  },

  getFiltered() {
    return appData.projects.filter(p => {
      const matchCat = this.cat === 'All' || (p.category && p.category.toLowerCase() === this.cat.toLowerCase());
      const matchSearch = !this.query ||
        p.title.toLowerCase().includes(this.query) ||
        p.description.toLowerCase().includes(this.query) ||
        p.category.toLowerCase().includes(this.query) ||
        (p.technologies || []).some(t => t.toLowerCase().includes(this.query));
      return matchCat && matchSearch;
    });
  },

  render() {
    const list = this.getFiltered();
    if (!list.length) {
      this.grid.innerHTML = '';
      if (this.empty) this.empty.classList.remove('hidden');
      return;
    }
    if (this.empty) this.empty.classList.add('hidden');

    this.grid.innerHTML = list.map(p => `
      <article class="card project-item">
        <div class="thumb-box">
          <img src="${p.image}" alt="${p.title}" class="item-thumb" loading="lazy">
          <span class="cat-badge">${p.category}</span>
        </div>
        <div class="item-body">
          <h3 class="item-title">${p.title}</h3>
          <p class="item-desc">${p.description}</p>
          <div class="item-tags">
            ${(p.technologies || []).map(t => `<span class="chip-tag">${t}</span>`).join('')}
          </div>
          <div class="item-btns">
            <button class="btn btn-primary btn-sm btn-details" data-id="${p.id}" aria-label="Details for ${p.title}">
              <span>Details</span>
            </button>
            <a href="${p.github || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
              <span>Code</span>
            </a>
            <a href="${p.demo || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
              <span>Demo</span>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }
};

/* ==========================================================================
   DYNAMIC CERTIFICATES & MODALS
   ========================================================================== */
const CertificatesEngine = {
  grid: document.getElementById('certificates-grid'),
  init() {
    if (!this.grid) return;
    this.bind();
  },
  bind() {
    const open = (el) => {
      const id = parseInt(el.getAttribute('data-id'), 10);
      const c = appData.certificates.find(item => item.id === id);
      if (c) ModalEngine.openCert(c);
    };
    this.grid.addEventListener('click', (e) => {
      const card = e.target.closest('.cert-item');
      if (card) open(card);
    });
    this.grid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.cert-item');
        if (card) { e.preventDefault(); open(card); }
      }
    });
  }
};

const ModalEngine = {
  pModal: document.getElementById('project-modal'),
  pContent: document.getElementById('project-modal-content'),
  pClose: document.getElementById('project-modal-close'),

  cModal: document.getElementById('cert-modal'),
  cContent: document.getElementById('cert-modal-content'),
  cClose: document.getElementById('cert-modal-close'),

  init() {
    if (this.pClose) this.pClose.addEventListener('click', () => this.closeProject());
    if (this.cClose) this.cClose.addEventListener('click', () => this.closeCert());

    [this.pModal, this.cModal].forEach(m => {
      if (m) {
        m.addEventListener('click', (e) => {
          if (e.target === m) { this.closeProject(); this.closeCert(); }
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { this.closeProject(); this.closeCert(); }
    });
  },

  openProject(p) {
    if (!this.pModal || !this.pContent) return;
    this.pContent.innerHTML = `
      <img src="${p.image}" alt="${p.title}" class="modal-img">
      <div class="modal-row">
        <span class="chip-tag">${p.category}</span>
        <code class="status-code">id: #${p.id}</code>
      </div>
      <h2 class="modal-h2" id="modal-project-title">${p.title}</h2>
      <p class="modal-p">${p.fullDescription || p.description}</p>
      ${p.features && p.features.length ? `
        <h4 class="modal-sub">Key Engineering Features:</h4>
        <ul class="modal-list">
          ${p.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      ` : ''}
      <h4 class="modal-sub">Stack &amp; Technologies:</h4>
      <div class="modal-tags">
        ${(p.technologies || []).map(t => `<span class="chip-tag">${t}</span>`).join('')}
      </div>
      <div class="modal-actions">
        <a href="${p.github || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          <span>View Source Code</span>
        </a>
        <a href="${p.demo || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <span>Open Live Demo →</span>
        </a>
      </div>
    `;
    this.pModal.classList.add('active');
    this.pModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  },

  closeProject() {
    if (!this.pModal) return;
    this.pModal.classList.remove('active');
    this.pModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  },

  openCert(c) {
    if (!this.cModal || !this.cContent) return;
    this.cContent.innerHTML = `
      <span class="sec-badge">// VERIFIED CREDENTIAL</span>
      <h2 class="modal-h2" id="modal-cert-title" style="margin-top:0.4rem;">${c.title}</h2>
      <p style="color:var(--text-muted);font-size:0.9rem;">Issued by <strong>${c.issuer}</strong> • ${c.year}</p>
      <img src="${c.image}" alt="${c.title}" class="cert-modal-img">
      <p style="color:var(--text-muted);margin-bottom:1rem;line-height:1.6;">${c.description}</p>
      ${c.credentialId ? `
        <div style="display:inline-block;padding:0.4rem 0.85rem;border-radius:var(--r-sm);border:1px solid var(--border-card);margin-bottom:1.2rem;">
          <span style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-cyan);">Credential ID: ${c.credentialId}</span>
        </div>
      ` : ''}
      <div>
        <a href="${c.credentialUrl || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
          ✓ Verified Registry Status ↗
        </a>
      </div>
    `;
    this.cModal.classList.add('active');
    this.cModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  },

  closeCert() {
    if (!this.cModal) return;
    this.cModal.classList.remove('active');
    this.cModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }
};

/* ==========================================================================
   UTILITY ACTIONS (Copy Email, Download CV, Contact Form)
   ========================================================================== */
function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const email = appData.profile.email;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => notify()).catch(() => fallback(email));
    } else {
      fallback(email);
    }
  });

  function fallback(text) {
    const a = document.createElement('textarea');
    a.value = text;
    a.style.position = 'fixed';
    a.style.left = '-9999px';
    document.body.appendChild(a);
    a.focus();
    a.select();
    try {
      document.execCommand('copy');
      notify();
    } catch (err) {
      ToastManager.show('Manual copy: ' + text, 'info');
    } finally {
      document.body.removeChild(a);
    }
  }

  function notify() {
    const lbl = btn.querySelector('.copy-lbl');
    if (lbl) {
      const prev = lbl.textContent;
      lbl.textContent = 'Copied!';
      btn.style.color = 'var(--accent-green)';
      btn.style.borderColor = 'var(--accent-green)';
      setTimeout(() => {
        lbl.textContent = prev;
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    }
    ToastManager.show(`Copied: ${appData.profile.email}`, 'success');
  }
}

function initDownloadCV() {
  const btn = document.getElementById('download-cv-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const p = appData.profile;
    const text = `CURRICULUM VITAE - ${p.name.toUpperCase()}
============================================================
Role: ${p.role}
School: ${p.school}
Major: ${p.major}
Location: ${p.location}
Contact: ${p.email}

PROFILE SUMMARY:
${p.bio}

PHILOSOPHY:
${p.philosophy}

SKILLS & STACK:
${appData.skills.map(s => `- ${s.name} (${s.category}) : ${s.level}%`).join('\n')}

FEATURED PROJECTS:
${appData.projects.map(pr => `* ${pr.title} [${pr.category}] - ${pr.description}`).join('\n')}

============================================================
Generated from LocalStorage CMS • 100% Native Web Standards.`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${p.name.replace(/\s+/g, '_')}_CV.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    ToastManager.show('CV summary downloaded!', 'success');
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInp = document.getElementById('contact-name');
  const emailInp = document.getElementById('contact-email');
  const subInp = document.getElementById('contact-subject');
  const msgInp = document.getElementById('contact-message');
  const count = document.getElementById('char-count');
  const feedback = document.getElementById('form-feedback');

  const nameErr = document.getElementById('name-error');
  const emailErr = document.getElementById('email-error');
  const subErr = document.getElementById('subject-error');
  const msgErr = document.getElementById('message-error');

  if (msgInp && count) {
    msgInp.addEventListener('input', () => {
      const len = msgInp.value.trim().length;
      count.textContent = `${len} / 10 min`;
      if (len >= 10) {
        count.style.color = 'var(--accent-green)';
        clear(msgInp, msgErr);
      } else {
        count.style.color = 'var(--text-dim)';
      }
    });
  }

  [
    { inp: nameInp, err: nameErr },
    { inp: emailInp, err: emailErr },
    { inp: subInp, err: subErr },
    { inp: msgInp, err: msgErr }
  ].forEach(pair => {
    if (pair.inp) pair.inp.addEventListener('input', () => clear(pair.inp, pair.err));
  });

  function setErr(i, e, msg) {
    if (i) i.classList.add('error');
    if (e) e.textContent = msg;
  }

  function clear(i, e) {
    if (i) i.classList.remove('error');
    if (e) e.textContent = '';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    if (feedback) {
      feedback.className = 'feedback-alert hidden';
      feedback.textContent = '';
    }

    const n = nameInp.value.trim();
    if (!n) { setErr(nameInp, nameErr, 'Nama lengkap wajib diisi.'); valid = false; }
    else if (n.length < 2) { setErr(nameInp, nameErr, 'Nama minimal 2 karakter.'); valid = false; }

    const em = emailInp.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!em) { setErr(emailInp, emailErr, 'Alamat email wajib diisi.'); valid = false; }
    else if (!regex.test(em)) { setErr(emailInp, emailErr, 'Format email tidak valid.'); valid = false; }

    const s = subInp.value.trim();
    if (!s) { setErr(subInp, subErr, 'Subjek pesan wajib diisi.'); valid = false; }

    const m = msgInp.value.trim();
    if (!m) { setErr(msgInp, msgErr, 'Pesan wajib diisi.'); valid = false; }
    else if (m.length < 10) { setErr(msgInp, msgErr, 'Pesan minimal 10 karakter.'); valid = false; }

    if (!valid) {
      ToastManager.show('Silakan periksa kolom formulir yang belum valid.', 'info');
      return;
    }

    const targetEmail = appData.profile.email || "rahmat.ramadhani@example.com";
    const mailto = `mailto:${targetEmail}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(`Halo ${appData.profile.name},\n\nNama: ${n}\nEmail: ${em}\n\nPesan:\n${m}`)}`;

    if (feedback) {
      feedback.className = 'feedback-alert success';
      feedback.innerHTML = `
        <strong>Message prepared successfully!</strong><br>
        Formulir tervalidasi dengan benar di sisi klien.<br>
        <a href="${mailto}" class="btn btn-primary btn-sm" style="margin-top:0.6rem;display:inline-flex;">
          Buka Email Client (Mailto)
        </a>
      `;
    }

    ToastManager.show('Message prepared successfully!', 'success');
    form.reset();
    if (count) count.textContent = '0 / 10 min';
  });
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Sync all dynamic content from LocalStorage CMS
  syncDynamicData();
  renderSkills();
  renderExperience();
  renderEducation();
  renderCertificates();
  renderServices();

  // 2. Interactive Components
  initThemeToggle();
  initScrollBehaviors();
  initActiveSectionSpy();
  initMobileMenu();
  initTypingEffect();
  initCounters();
  initSkillBars();
  initScrollReveal();

  // 3. Engines
  ProjectsEngine.init();
  CertificatesEngine.init();
  ModalEngine.init();

  // 4. Utilities
  initCopyEmail();
  initDownloadCV();
  initContactForm();

  setTimeout(() => {
    ToastManager.show(`Welcome to ${appData.profile.name}'s Portfolio!`, 'info', 2500);
  }, 600);
});
