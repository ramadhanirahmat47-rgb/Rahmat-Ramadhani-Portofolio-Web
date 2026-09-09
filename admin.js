/**
 * ==============================================================================
 * RAHMAT.DEV PORTFOLIO - ADMIN DASHBOARD & CMS ENGINE
 * 100% Pure Vanilla JavaScript (ES6+) • Client-Side LocalStorage Database
 * ==============================================================================
 */

'use strict';

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, onSnapshot, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  projectId: "gen-lang-client-0307133880",
  appId: "1:946297603830:web:89b2a8559540581f5d0ed7",
  apiKey: "AIzaSyBhPmsH-5LKHrjMnq8RKFBwZYD0VSJtRRk",
  authDomain: "gen-lang-client-0307133880.firebaseapp.com"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-rahmatramadhanip-76a0cf0e-1ed3-4663-bb4c-629074da6c9a");
const docRef = doc(db, "portfolio", "data");

/*
 * DEMO ADMIN AUTHENTICATION
 * This frontend-only authentication is for educational/demo purposes.
 * Production applications should use a secure backend authentication system.
 */
const ADMIN_CONFIG = {
  username: "Rahmat Ramadhani",
  password: "192010"
};

/* ==========================================================================
   CENTRAL DEFAULT PORTFOLIO DATA ARCHITECTURE
   ========================================================================== */
const defaultPortfolioData = {
  profile: {
    name: "Rahmat Ramadhani",
    role: "Software Engineering Student",
    school: "SMK Negeri 1 Jakarta",
    major: "Rekayasa Perangkat Lunak / Software Engineering",
    location: "Jakarta, Indonesia",
    email: "rahmat.ramadhani@example.com",
    status: "Available for Learning & Projects",
    avatar: "assets/profile.jpg",
    bio: "Saya adalah siswa Software Engineering yang tertarik pada Web Development, Software Development, UI/UX, dan teknologi digital terkini. Membangun aplikasi web modern dengan standar kode bersih, modular, dan berperforma tinggi.",
    philosophy: "Bagi saya, rekayasa perangkat lunak adalah seni menyederhanakan masalah nyata menjadi sistem komputasi yang terstruktur, efisien, dan mudah dipelihara. Saya selalu berkomitmen pada Clean Code, aksesibilitas semantik, dan performa tinggi.",
    stats: {
      projects: 18,
      technologies: 12,
      certificates: 8,
      learningYears: 3
    }
  },
  hero: {
    badge: "Available for Learning & Projects",
    greeting: "Hi, I'm",
    name: "Rahmat Ramadhani",
    roleLead: "Specialized as a ",
    roles: [
      "Software Engineering Student",
      "Frontend Web Developer",
      "Creative Programmer",
      "UI/UX Enthusiast"
    ],
    description: "Saya adalah siswa Software Engineering yang berfokus pada Web Development, Software Development, UI/UX, dan teknologi digital terkini. Membangun aplikasi web modern dengan standar kode bersih, modular, dan berperforma tinggi.",
    primaryBtnText: "View My Projects",
    primaryBtnLink: "#projects",
    secondaryBtnText: "Contact Me",
    secondaryBtnLink: "#contact",
    cvBtnText: "Download CV"
  },
  skills: [
    { id: 1, name: "HTML5 Semantic", category: "Frontend", level: 95 },
    { id: 2, name: "CSS3 / Flex / Grid", category: "Frontend", level: 90 },
    { id: 3, name: "Vanilla JavaScript (ES6+)", category: "Frontend", level: 88 },
    { id: 4, name: "Responsive & UI/UX", category: "Frontend", level: 92 },
    { id: 5, name: "JavaScript Logic & DOM", category: "Programming", level: 88 },
    { id: 6, name: "Python Fundamentals", category: "Programming", level: 80 },
    { id: 7, name: "Java (OOP Architecture)", category: "Programming", level: 75 },
    { id: 8, name: "C++ Core Logic", category: "Programming", level: 70 },
    { id: 9, name: "Git & GitHub Workflow", category: "Tools", level: 86 },
    { id: 10, name: "VS Code & Web DevTools", category: "Tools", level: 95 },
    { id: 11, name: "Figma UI Prototyping", category: "Tools", level: 82 },
    { id: 12, name: "REST APIs & Fetch / JSON", category: "Tools", level: 85 }
  ],
  projects: [
    {
      id: 1,
      title: "Personal Developer Portfolio",
      category: "Web",
      description: "Website portfolio personal bertema dark futuristic yang dibangun murni menggunakan HTML5, CSS3, dan Vanilla JavaScript ES6+.",
      fullDescription: "Proyek portfolio modern yang dirancang untuk menampilkan identitas siswa rekayasa perangkat lunak secara profesional. Dilengkapi sistem tema gelap/terang, filter proyek interaktif, pencarian realtime, modal detail, dan animasi responsif tanpa sedikit pun dependensi eksternal.",
      features: [
        "100% Vanilla Web Standards (Zero Frameworks & Libraries)",
        "Dark & Light Theme dengan LocalStorage Persistence",
        "Realtime Fuzzy Search & Category Tab Filtering",
        "Accessible Dialog Modal dengan Body Scroll Lock",
        "Typing Effect & Intersection Observer Animasi Performa Tinggi"
      ],
      technologies: ["HTML5", "CSS3", "Vanilla JS", "LocalStorage", "Web APIs"],
      image: "assets/projects/project-1.jpg",
      github: "https://github.com",
      demo: "#",
      createdAt: "2026-01-15"
    },
    {
      id: 2,
      title: "Restaurant Management System",
      category: "JavaScript",
      description: "Sistem kasir (POS) dan manajemen pesanan meja restoran interaktif berbasis Single-Page Application sederhana.",
      fullDescription: "Aplikasi POS (Point of Sale) restoran untuk memanipulasi pesanan menu, kalkulasi subtotal dan pajak otomatis, manajemen status meja (tersedia/terisi), serta laporan ringkasan kas harian yang disimpan pada LocalStorage browser.",
      features: [
        "Manajemen menu makanan/minuman secara dinamis",
        "Kalkulasi total harga, diskon, dan PPN otomatis",
        "State status meja interaktif dengan visual cue",
        "Pencetakan struk digital (Bill Preview Simulation)",
        "Penyimpanan riwayat transaksi lokal browser"
      ],
      technologies: ["HTML5", "CSS Grid", "JavaScript ES6+", "LocalStorage"],
      image: "assets/projects/project-2.jpg",
      github: "https://github.com",
      demo: "#",
      createdAt: "2026-02-10"
    },
    {
      id: 3,
      title: "Cyber Odyssey - Browser Game",
      category: "Game",
      description: "Game arcade bertema retro-futuristik sci-fi yang dibangun dengan HTML5 Canvas dan JavaScript game-loop murni.",
      fullDescription: "Game arcade 2D interaktif berlatar luar angkasa dengan sistem fisika partikel sederhana, collision detection akurat, dynamic difficulty multiplier, dan audio visual sintetis menggunakan Web Audio API tanpa modul eksternal.",
      features: [
        "60 FPS Native HTML5 Canvas 2D Rendering",
        "Collision Detection & Particle Explosion Effects",
        "Score Tracking & High Score LocalStorage Persistence",
        "Keyboard & Touch Controls Support",
        "State Management (Start, Playing, Pause, Game Over)"
      ],
      technologies: ["HTML5 Canvas", "JavaScript ES6+", "Physics Engine", "Web Audio"],
      image: "assets/projects/project-3.jpg",
      github: "https://github.com",
      demo: "#",
      createdAt: "2026-02-28"
    },
    {
      id: 4,
      title: "Nexus Top-Up - Game Voucher Store",
      category: "UI/UX",
      description: "Konsep antarmuka toko digital voucher game dengan alur checkout instan dan micro-interactions modern.",
      fullDescription: "Proyek desain dan implementasi frontend untuk toko top-up mata uang game. Menitikberatkan pada alur belanja yang mulus: pemilihan game, input User ID dengan validasi otomatis, pemilihan nominal voucher, serta metode pembayaran instan (QRIS & E-Wallet).",
      features: [
        "Katalog game multi-kategori dengan kartu interaktif",
        "Input validasi server ID & format User ID",
        "Pilihan nominal pecahan voucher otomatis kalkulasi",
        "Simulasi pembayaran interaktif dengan QRIS dummy",
        "Micro-interactions & Responsive Card Grid"
      ],
      technologies: ["HTML5", "CSS Variables", "JavaScript DOM", "Responsive UI"],
      image: "assets/projects/project-4.jpg",
      github: "https://github.com",
      demo: "#",
      createdAt: "2026-03-15"
    },
    {
      id: 5,
      title: "Apex Trade - Financial Dashboard",
      category: "JavaScript",
      description: "Dashboard analitik aset digital dengan grafik tren data interaktif dan visualisasi pasar realtime.",
      fullDescription: "Platform monitoring portofolio instrumen keuangan dan mata uang digital. Dilengkapi grafik tren interaktif yang dirender via Native SVG, kalkulator konversi kurs, tabel order book dinamis, dan simulator order beli/jual.",
      features: [
        "Custom Native SVG Chart Generator (Zero Chart Library)",
        "Live Ticker Simulation dengan Algoritma Fluktuasi Pasar",
        "Order Book & Recent Market Transactions Table",
        "Currency Converter Modal & Portfolio Balance Tracker",
        "High Density Dark UI Developer Dashboard"
      ],
      technologies: ["JavaScript ES6+", "Native SVG", "CSS Flex/Grid", "DOM Events"],
      image: "assets/projects/project-5.jpg",
      github: "https://github.com",
      demo: "#",
      createdAt: "2026-04-02"
    },
    {
      id: 6,
      title: "EduSphere - School Portal Website",
      category: "Web",
      description: "Portal informasi sekolah modern, pengumuman akademik, profil guru, dan kalender kegiatan siswa.",
      fullDescription: "Website portal sekolah terintegrasi dengan tata letak berita dinamis, kalender akademik interaktif, direktori staf pengajar, dan form pendaftaran peserta didik baru (PPDB) dengan validasi formulir lengkap.",
      features: [
        "Navigasi hierarki portal sekolah profesional",
        "Sistem filter berita & pengumuman sekolah",
        "Kalender agenda akademik interaktif",
        "Formulir pendaftaran siswa dengan validasi bertahap",
        "Aksesibilitas ramah pembaca layar (ARIA Certified)"
      ],
      technologies: ["HTML5 Semantic", "CSS3 BEM", "JavaScript ES6+", "Form Validation"],
      image: "assets/projects/project-6.jpg",
      github: "https://github.com",
      demo: "#",
      createdAt: "2026-05-18"
    }
  ],
  experience: [
    {
      id: 1,
      year: "2026 - Present",
      role: "Lead Software Engineering Student",
      company: "SMKN 1 Dev Lab & Independent Projects",
      description: "Memimpin tim pembuatan aplikasi capstone sekolah berbasis web, mengorganisir repository Git, dan menerapkan standar penulisan kode modular, semantic, dan performan.",
      technologies: ["Web Architecture", "JavaScript ES6+", "Git Flow"]
    },
    {
      id: 2,
      year: "2025",
      role: "Frontend Web Developer & Open Source",
      company: "Freelance & Student Community",
      description: "Mengembangkan berbagai template antarmuka responsif, sistem kasir sederhana, dan landing page modern. Mendalami asynchronous JavaScript, DOM events, dan Web Storage API.",
      technologies: ["Frontend", "CSS Grid/Flex", "REST APIs"]
    },
    {
      id: 3,
      year: "2024",
      role: "Programming Fundamentals & School Projects",
      company: "SMK Vocational Studies",
      description: "Mempelajari fondasi algoritma logika komputasi, Object-Oriented Programming (OOP), pemodelan basis data relasional, serta konstruksi semantik web standar.",
      technologies: ["Algorithms", "HTML & CSS", "Python & Java"]
    }
  ],
  education: [
    {
      id: 1,
      institution: "SMK Negeri 1 Jakarta",
      major: "Rekayasa Perangkat Lunak (Software Engineering)",
      years: "2023 - 2026 (Expected)",
      description: "Program kejuruan terakreditasi A dengan kurikulum berbasis industri. Mempelajari rekayasa perangkat lunak modern, database management, algoritma struktur data, dan pengembangan UI web profesional.",
      coursework: [
        "Pemrograman Berorientasi Objek (OOP)",
        "Pemrograman Web & Mobile",
        "Basis Data Relasional & SQL",
        "Desain Pengalaman Pengguna (UI/UX)",
        "Pengujian Perangkat Lunak (QA)"
      ],
      achievements: [
        "Juara 1 Kompetisi Web Design & Inovasi IT Sekolah (2025).",
        "Koordinator Divisi Frontend pada Kelompok Studi Coding RPL.",
        "Peringkat 5 Besar Akademik Program Keahlian Rekayasa Perangkat Lunak."
      ]
    }
  ],
  certificates: [
    {
      id: 1,
      title: "Frontend Web Development Masterclass",
      issuer: "Dicoding Academy",
      year: "2025",
      credentialId: "DCD-FE-2025-98214",
      image: "assets/certificates/cert-1.jpg",
      description: "Kelulusan sertifikasi tingkat mahir dalam arsitektur website modern, semantic HTML5, CSS Flex/Grid, dan manipulasi DOM JavaScript tingkat lanjut.",
      credentialUrl: "https://dicoding.com"
    },
    {
      id: 2,
      title: "JavaScript Algorithms & Data Structures",
      issuer: "freeCodeCamp",
      year: "2025",
      credentialId: "FCC-JS-2025-44109",
      image: "assets/certificates/cert-2.jpg",
      description: "Menyelesaikan kurikulum intensif 300 jam algoritma pemrograman, rekursi, struktur data, dan Object-Oriented Programming (OOP).",
      credentialUrl: "https://freecodecamp.org"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      issuer: "Interaction Design Org",
      year: "2024",
      credentialId: "IXD-FND-2024-11890",
      image: "assets/certificates/cert-3.jpg",
      description: "Sertifikasi perancangan antarmuka pengguna, prinsip wireframing, typography hierarki, teori warna, dan usability testing aplikasi.",
      credentialUrl: "https://interaction-design.org"
    },
    {
      id: 4,
      title: "Junior Software Engineering Competency",
      issuer: "BNSP / LSP SMKN 1",
      year: "2026",
      credentialId: "LSP-RPL-2026-00432",
      image: "assets/certificates/cert-4.jpg",
      description: "Sertifikasi Uji Kompetensi Keahlian (UKK) resmi standar Badan Nasional Sertifikasi Profesi pada skema Junior Software Engineer.",
      credentialUrl: "https://bnsp.go.id"
    }
  ],
  services: [
    {
      id: 1,
      title: "Web Development",
      description: "Pembuatan website kustom dari nol dengan arsitektur HTML5 semantik, struktur kode rapi, dan kecepatan render tinggi.",
      icon: "🌐",
      features: [
        "Semantic HTML5 & Accessible Markup",
        "SEO-friendly Meta Tags & Open Graph",
        "Clean Single-Page & Multi-Page Architecture"
      ],
      status: "Active"
    },
    {
      id: 2,
      title: "Frontend Development",
      description: "Menerjemahkan ide visual menjadi halaman web responsif yang bekerja mulus di smartphone, tablet, maupun layar desktop.",
      icon: "📱",
      features: [
        "Mobile-First Responsive Layouts",
        "Modern CSS Grid & Flexbox Mastery",
        "Cross-Browser Compatibility Verified"
      ],
      status: "Active"
    },
    {
      id: 3,
      title: "UI Implementation",
      description: "Penerapan desain Figma menjadi kode CSS presisi tinggi dengan transisi halus, micro-interactions, dan palet futuristik.",
      icon: "✨",
      features: [
        "Pixel-Perfect Figma to HTML/CSS",
        "Dark & Light Theme Integration",
        "Smooth Transitions & Micro-Interactions"
      ],
      status: "Active"
    },
    {
      id: 4,
      title: "JavaScript Development",
      description: "Pengembangan logika interaktif dinamis seperti form validation, search filter realtime, modal popup, dan LocalStorage state.",
      icon: "⚡",
      features: [
        "Native DOM Manipulation & Event Flow",
        "State Persistence with Web Storage",
        "Asynchronous APIs & JSON Handling"
      ],
      status: "Active"
    },
    {
      id: 5,
      title: "Website Optimization",
      description: "Audit dan perbaikan performa website untuk mencapai skor Lighthouse optimal, kecepatan render tinggi, dan hemat bandwidth.",
      icon: "🚀",
      features: [
        "Asset Optimization & Lazy Loading",
        "Zero Frameworks & External Overhead",
        "Clean, Modular, Scalable Code Standards"
      ],
      status: "Active"
    }
  ],
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    email: "rahmat.ramadhani@example.com"
  },
  settings: {
    siteTitle: "Rahmat Ramadhani | Software Engineering Student Portfolio",
    accentColor: "#00f2fe",
    theme: "dark",
    footerText: "Membangun pengalaman antarmuka digital yang modern, responsif, dan berperforma tinggi dengan standar web murni.",
    footerCopyright: "Rahmat Ramadhani. Built with HTML5, CSS3 & Vanilla JavaScript ES6+.",
    lastUpdated: "2026-09-07"
  }
};

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

    let icon = 'ℹ';
    if (type === 'success') icon = '✓';
    else if (type === 'error') icon = '✕';
    else if (type === 'warning') icon = '⚠️';

    toast.innerHTML = `<strong>${icon}</strong><span>${message}</span>`;
    this.box.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 260);
    }, duration);
  }
};

/* ==========================================================================
   IMAGE COMPRESSION UTILITY (Pure Canvas API)
   ========================================================================== */
function compressImage(file, maxDimension = 900, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('File yang dipilih harus berupa file gambar.'));
    }
    if (file.size > 2 * 1024 * 1024) {
      return reject(new Error('Image is too large. Ukuran berkas melebihi 2MB. Silakan pilih gambar yang lebih kecil.'));
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxDimension || h > maxDimension) {
          if (w > h) {
            h = Math.round((h * maxDimension) / w);
            w = maxDimension;
          } else {
            w = Math.round((w * maxDimension) / h);
            h = maxDimension;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Gagal memuat gambar untuk proses kompresi.'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar.'));
    reader.readAsDataURL(file);
  });
}

/* ==========================================================================
   STORAGE ENGINE FUNCTIONS
   ========================================================================== */
const StorageEngine = {
  KEY: "portfolioData",

  load(callback) {
    onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const parsed = snap.data();
        const finalData = {
          ...defaultPortfolioData,
          ...parsed,
          profile: { ...defaultPortfolioData.profile, ...(parsed.profile || {}) },
          hero: { ...defaultPortfolioData.hero, ...(parsed.hero || {}) },
          social: { ...defaultPortfolioData.social, ...(parsed.social || {}) },
          settings: { ...defaultPortfolioData.settings, ...(parsed.settings || {}) }
        };
        callback(finalData);
      } else {
        this.save(defaultPortfolioData);
        callback(JSON.parse(JSON.stringify(defaultPortfolioData)));
      }
    }, (error) => {
      console.error("Firebase load error:", error);
      ToastManager.show('Gagal memuat data dari Firebase.', 'error');
      callback(JSON.parse(JSON.stringify(defaultPortfolioData)));
    });
  },

  async save(data) {
    try {
      data.settings = data.settings || {};
      data.settings.lastUpdated = new Date().toISOString().split('T')[0];
      await setDoc(docRef, data);
      this.updateStorageMeter();
      return true;
    } catch (err) {
      console.error('Firebase Save Error:', err);
      ToastManager.show('Gagal menyimpan ke Firebase. Cek koneksi.', 'error');
      return false;
    }
  },

  async reset() {
    await this.save(defaultPortfolioData);
    this.updateStorageMeter();
  },

  getUsageBytes() {
    return 0; // Not applicable for Firebase
  },

  updateStorageMeter() {
    const txt = document.getElementById('storage-text');
    const bar = document.getElementById('dash-storage-bar');
    const detail = document.getElementById('dash-storage-detail');

    if (txt) txt.textContent = `Storage: Firebase Cloud`;
    if (bar) bar.style.width = `10%`;
    if (detail) detail.textContent = `Data disinkronisasi ke Cloud secara realtime`;
  }
};

/* ==========================================================================
   MAIN ADMIN APP CONTROLLER
   ========================================================================== */
const AdminApp = {
  data: null,
  activeTab: 'sec-dashboard',
  confirmCallback: null,

  init() {
    StorageEngine.load((data) => {
      const isFirstLoad = !this.data;
      this.data = data;
      if (isFirstLoad) {
        this.initAuth();
        this.bindGlobalEvents();
      }
      this.renderAll();
      StorageEngine.updateStorageMeter();
    });
  },

  /* ------------------------------------------------------------------------
     AUTHENTICATION LOGIC
     ------------------------------------------------------------------------ */
  initAuth() {
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('login-form');
    const loginErr = document.getElementById('login-error');
    const togglePwd = document.getElementById('toggle-password-btn');
    const pwdInput = document.getElementById('login-password');
    const logoutBtn = document.getElementById('logout-btn');

    const isAuthenticated = sessionStorage.getItem('adminAuth') === 'true' || localStorage.getItem('adminAuth') === 'true';

    if (isAuthenticated) {
      if (loginView) loginView.classList.add('hidden');
      if (dashboardView) dashboardView.classList.remove('hidden');
    } else {
      if (loginView) loginView.classList.remove('hidden');
      if (dashboardView) dashboardView.classList.add('hidden');
    }

    if (togglePwd && pwdInput) {
      togglePwd.addEventListener('click', () => {
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
        togglePwd.textContent = isPwd ? 'Hide' : 'Show';
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const u = document.getElementById('login-username').value.trim();
        const p = pwdInput.value.trim();

        if (u === ADMIN_CONFIG.username && p === ADMIN_CONFIG.password) {
          sessionStorage.setItem('adminAuth', 'true');
          loginErr.classList.add('hidden');
          loginForm.reset();
          loginView.classList.add('hidden');
          dashboardView.classList.remove('hidden');
          ToastManager.show('Login successful! Welcome to Admin CMS.', 'success');
          this.renderAll();
        } else {
          loginErr.textContent = 'Username atau password salah.';
          loginErr.classList.remove('hidden');
          ToastManager.show('Login failed: Invalid credentials.', 'error');
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.confirm(
          'Confirm Logout',
          'Apakah Anda yakin ingin keluar dari Admin Dashboard?',
          () => {
            sessionStorage.removeItem('adminAuth');
            localStorage.removeItem('adminAuth');
            dashboardView.classList.add('hidden');
            loginView.classList.remove('hidden');
            ToastManager.show('Logged out successfully.', 'info');
          },
          '🚪'
        );
      });
    }
  },

  /* ------------------------------------------------------------------------
     NAVIGATION & TABS
     ------------------------------------------------------------------------ */
  bindGlobalEvents() {
    // Sidebar nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        if (target) this.switchTab(target);
      });
    });

    // Mobile sidebar toggle
    const hamburger = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('admin-sidebar');
    const closeSidebar = document.getElementById('sidebar-close-btn');

    if (hamburger && sidebar) {
      hamburger.addEventListener('click', () => sidebar.classList.add('open'));
    }
    if (closeSidebar && sidebar) {
      closeSidebar.addEventListener('click', () => sidebar.classList.remove('open'));
    }

    // Modal Confirmation bindings
    const confirmModal = document.getElementById('modal-confirm');
    const cancelBtn = document.getElementById('confirm-cancel-btn');
    const okBtn = document.getElementById('confirm-ok-btn');

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        if (confirmModal) confirmModal.classList.remove('active');
        this.confirmCallback = null;
      });
    }
    if (okBtn) {
      okBtn.addEventListener('click', () => {
        if (typeof this.confirmCallback === 'function') {
          this.confirmCallback();
        }
        if (confirmModal) confirmModal.classList.remove('active');
        this.confirmCallback = null;
      });
    }

    // Save Profile Button
    const saveProfileBtn = document.getElementById('save-profile-btn');
    if (saveProfileBtn) saveProfileBtn.addEventListener('click', () => this.saveProfile());

    // Profile Avatar Upload & Reset
    const avatarInput = document.getElementById('profile-avatar-input');
    if (avatarInput) {
      avatarInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const loading = document.getElementById('avatar-loading');
        if (loading) loading.classList.remove('hidden');
        try {
          const dataUrl = await compressImage(file, 800, 0.82);
          this.data.profile.avatar = dataUrl;
          const preview = document.getElementById('profile-avatar-preview');
          if (preview) preview.src = dataUrl;
          StorageEngine.save(this.data);
          ToastManager.show('Profile photo updated and compressed successfully!', 'success');
        } catch (err) {
          ToastManager.show(err.message || 'Failed to process image.', 'error');
        } finally {
          if (loading) loading.classList.add('hidden');
          avatarInput.value = '';
        }
      });
    }

    const removeAvatarBtn = document.getElementById('remove-avatar-btn');
    if (removeAvatarBtn) {
      removeAvatarBtn.addEventListener('click', () => {
        this.data.profile.avatar = defaultPortfolioData.profile.avatar;
        const preview = document.getElementById('profile-avatar-preview');
        if (preview) preview.src = defaultPortfolioData.profile.avatar;
        StorageEngine.save(this.data);
        ToastManager.show('Profile photo reset to default.', 'info');
      });
    }

    // Save Hero Button
    const saveHeroBtn = document.getElementById('save-hero-btn');
    if (saveHeroBtn) saveHeroBtn.addEventListener('click', () => this.saveHero());

    // Add Project Modal Trigger
    const addProjectBtn = document.getElementById('add-project-btn');
    if (addProjectBtn) addProjectBtn.addEventListener('click', () => this.openProjectModal());

    // Project Form Submit
    const projectForm = document.getElementById('project-form-inner');
    if (projectForm) projectForm.addEventListener('submit', (e) => this.saveProject(e));

    // Project Thumbnail File upload
    const pformFile = document.getElementById('pform-img-file');
    if (pformFile) {
      pformFile.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          const dataUrl = await compressImage(file, 900, 0.8);
          const preview = document.getElementById('pform-img-preview');
          const urlInput = document.getElementById('pform-img-url');
          if (preview) preview.src = dataUrl;
          if (urlInput) urlInput.value = dataUrl;
          ToastManager.show('Project image compressed and ready.', 'success');
        } catch (err) {
          ToastManager.show(err.message, 'error');
        }
      });
    }

    // Project Search & Category Filter
    const projSearch = document.getElementById('admin-project-search');
    const projFilter = document.getElementById('admin-project-filter');
    if (projSearch) projSearch.addEventListener('input', () => this.renderProjectsTable());
    if (projFilter) projFilter.addEventListener('change', () => this.renderProjectsTable());

    // Add Skill Modal Trigger
    const addSkillBtn = document.getElementById('add-skill-btn');
    if (addSkillBtn) addSkillBtn.addEventListener('click', () => this.openSkillModal());

    // Skill Range Slider live value
    const sRange = document.getElementById('sform-level');
    const sRangeLbl = document.getElementById('sform-level-val');
    if (sRange && sRangeLbl) {
      sRange.addEventListener('input', () => sRangeLbl.textContent = `${sRange.value}%`);
    }

    // Skill Form Submit
    const skillForm = document.getElementById('skill-form-inner');
    if (skillForm) skillForm.addEventListener('submit', (e) => this.saveSkill(e));

    // Experience
    const addExpBtn = document.getElementById('add-exp-btn');
    if (addExpBtn) addExpBtn.addEventListener('click', () => this.openExpModal());
    const expForm = document.getElementById('exp-form-inner');
    if (expForm) expForm.addEventListener('submit', (e) => this.saveExp(e));

    // Education
    const addEduBtn = document.getElementById('add-edu-btn');
    if (addEduBtn) addEduBtn.addEventListener('click', () => this.openEduModal());
    const eduForm = document.getElementById('edu-form-inner');
    if (eduForm) eduForm.addEventListener('submit', (e) => this.saveEdu(e));

    // Certificates
    const addCertBtn = document.getElementById('add-cert-btn');
    if (addCertBtn) addCertBtn.addEventListener('click', () => this.openCertModal());
    const certForm = document.getElementById('cert-form-inner');
    if (certForm) certForm.addEventListener('submit', (e) => this.saveCert(e));

    const certFile = document.getElementById('cform-img-file');
    if (certFile) {
      certFile.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
          const dataUrl = await compressImage(file, 800, 0.8);
          const preview = document.getElementById('cform-img-preview');
          const urlInput = document.getElementById('cform-img-url');
          if (preview) preview.src = dataUrl;
          if (urlInput) urlInput.value = dataUrl;
          ToastManager.show('Certificate image compressed.', 'success');
        } catch (err) {
          ToastManager.show(err.message, 'error');
        }
      });
    }

    // Services
    const addServBtn = document.getElementById('add-service-btn');
    if (addServBtn) addServBtn.addEventListener('click', () => this.openServModal());
    const servForm = document.getElementById('serv-form-inner');
    if (servForm) servForm.addEventListener('submit', (e) => this.saveServ(e));

    // Social Links
    const saveSocialBtn = document.getElementById('save-social-btn');
    if (saveSocialBtn) saveSocialBtn.addEventListener('click', () => this.saveSocial());

    // Website Settings
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', () => this.saveSettings());

    const colorInp = document.getElementById('set-accent-color');
    const colorHex = document.getElementById('accent-hex-lbl');
    if (colorInp && colorHex) {
      colorInp.addEventListener('input', () => colorHex.textContent = colorInp.value);
    }
    document.querySelectorAll('.color-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const c = btn.getAttribute('data-color');
        if (c && colorInp && colorHex) {
          colorInp.value = c;
          colorHex.textContent = c;
        }
      });
    });

    // Data Export
    const exportBtn = document.getElementById('export-json-btn');
    if (exportBtn) exportBtn.addEventListener('click', () => this.exportData());

    // Data Import
    const importInput = document.getElementById('import-json-input');
    if (importInput) importInput.addEventListener('change', (e) => this.importData(e));

    // Data Reset
    const resetBtn = document.getElementById('reset-data-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.confirm(
          'Reset All Portfolio Data',
          'Apakah Anda yakin ingin mereset seluruh data portofolio ke kondisi awal? Semua proyek dan data kustom Anda akan dihapus.',
          () => {
            StorageEngine.reset();
            this.data = StorageEngine.load();
            this.renderAll();
            ToastManager.show('Semua data portofolio berhasil direset ke bawaan.', 'info');
          },
          '⚠️'
        );
      });
    }
  },

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
    const targetPanel = document.getElementById(tabId);
    if (targetPanel) targetPanel.classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-target') === tabId);
    });

    // Update Topbar Title
    const titleEl = document.getElementById('current-section-title');
    if (titleEl) {
      const activeBtn = document.querySelector(`.nav-btn[data-target="${tabId}"]`);
      if (activeBtn) {
        titleEl.textContent = activeBtn.querySelector('span').textContent;
      }
    }

    // Auto-close sidebar on mobile
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebar && window.innerWidth <= 820) {
      sidebar.classList.remove('open');
    }
  },

  confirm(title, desc, callback, icon = '⚠️') {
    const modal = document.getElementById('modal-confirm');
    const titleEl = document.getElementById('confirm-modal-title');
    const descEl = document.getElementById('confirm-modal-desc');
    const iconEl = document.getElementById('confirm-modal-icon');

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (iconEl) iconEl.textContent = icon;

    this.confirmCallback = callback;
    if (modal) modal.classList.add('active');
  },

  /* ------------------------------------------------------------------------
     RENDER ALL PANELS & CONTROLS
     ------------------------------------------------------------------------ */
  renderAll() {
    this.renderDashboardOverview();
    this.renderProfileForm();
    this.renderHeroForm();
    this.renderProjectsTable();
    this.renderSkillsManager();
    this.renderExperienceTable();
    this.renderEducationList();
    this.renderCertificatesTable();
    this.renderServicesTable();
    this.renderSocialForm();
    this.renderSettingsForm();
    this.updateBadges();
  },

  updateBadges() {
    const bProj = document.getElementById('badge-projects-count');
    const bSkill = document.getElementById('badge-skills-count');
    if (bProj) bProj.textContent = this.data.projects.length;
    if (bSkill) bSkill.textContent = this.data.skills.length;
  },

  /* ------------------------------------------------------------------------
     1. DASHBOARD OVERVIEW
     ------------------------------------------------------------------------ */
  renderDashboardOverview() {
    const dProj = document.getElementById('dash-stat-projects');
    const dSkill = document.getElementById('dash-stat-skills');
    const dCert = document.getElementById('dash-stat-certs');
    const dServ = document.getElementById('dash-stat-services');
    const dUpdated = document.getElementById('dash-last-updated');

    if (dProj) dProj.textContent = this.data.projects.length;
    if (dSkill) dSkill.textContent = this.data.skills.length;
    if (dCert) dCert.textContent = this.data.certificates.length;
    if (dServ) dServ.textContent = this.data.services.length;
    if (dUpdated) dUpdated.textContent = this.data.settings.lastUpdated || '-';

    // Recent Projects Table (last 4)
    const tbody = document.getElementById('dash-recent-projects-tbody');
    if (tbody) {
      const recents = [...this.data.projects].slice(-4).reverse();
      tbody.innerHTML = recents.map(p => `
        <tr>
          <td><img src="${p.image}" alt="${p.title}" class="table-thumb"></td>
          <td><strong>${p.title}</strong></td>
          <td><span class="status-code">${p.category}</span></td>
          <td><small>${(p.technologies || []).slice(0, 3).join(', ')}</small></td>
          <td>
            <div class="table-actions">
              <button class="action-icon-btn" onclick="AdminApp.openProjectModal(${p.id})">Edit</button>
              <button class="action-icon-btn" onclick="AdminApp.duplicateProject(${p.id})">Duplicate</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  },

  /* ------------------------------------------------------------------------
     2. PROFILE MANAGEMENT
     ------------------------------------------------------------------------ */
  renderProfileForm() {
    const p = this.data.profile;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('prof-name', p.name);
    setVal('prof-role', p.role);
    setVal('prof-school', p.school);
    setVal('prof-major', p.major);
    setVal('prof-location', p.location);
    setVal('prof-email', p.email);
    setVal('prof-status', p.status);
    setVal('prof-bio', p.bio);
    setVal('prof-philosophy', p.philosophy);

    const prev = document.getElementById('profile-avatar-preview');
    if (prev) prev.src = p.avatar || defaultPortfolioData.profile.avatar;
  },

  saveProfile() {
    const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value.trim() : '';
    this.data.profile.name = getVal('prof-name');
    this.data.profile.role = getVal('prof-role');
    this.data.profile.school = getVal('prof-school');
    this.data.profile.major = getVal('prof-major');
    this.data.profile.location = getVal('prof-location');
    this.data.profile.email = getVal('prof-email');
    this.data.profile.status = getVal('prof-status');
    this.data.profile.bio = getVal('prof-bio');
    this.data.profile.philosophy = getVal('prof-philosophy');

    // Also update social.email
    if (this.data.social) this.data.social.email = this.data.profile.email;

    StorageEngine.save(this.data);
    ToastManager.show('Profile information saved successfully!', 'success');
  },

  /* ------------------------------------------------------------------------
     3. HERO MANAGEMENT
     ------------------------------------------------------------------------ */
  renderHeroForm() {
    const h = this.data.hero;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('hero-badge', h.badge);
    setVal('hero-greeting', h.greeting);
    setVal('hero-name', h.name);
    setVal('hero-role-lead', h.roleLead);
    setVal('hero-roles', (h.roles || []).join(', '));
    setVal('hero-description', h.description);
    setVal('hero-btn1-text', h.primaryBtnText);
    setVal('hero-btn1-link', h.primaryBtnLink);
    setVal('hero-btn2-text', h.secondaryBtnText);
    setVal('hero-btn2-link', h.secondaryBtnLink);
    setVal('hero-cv-text', h.cvBtnText);
  },

  saveHero() {
    const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value.trim() : '';
    this.data.hero.badge = getVal('hero-badge');
    this.data.hero.greeting = getVal('hero-greeting');
    this.data.hero.name = getVal('hero-name');
    this.data.hero.roleLead = getVal('hero-role-lead');
    this.data.hero.roles = getVal('hero-roles').split(',').map(s => s.trim()).filter(Boolean);
    this.data.hero.description = getVal('hero-description');
    this.data.hero.primaryBtnText = getVal('hero-btn1-text');
    this.data.hero.primaryBtnLink = getVal('hero-btn1-link');
    this.data.hero.secondaryBtnText = getVal('hero-btn2-text');
    this.data.hero.secondaryBtnLink = getVal('hero-btn2-link');
    this.data.hero.cvBtnText = getVal('hero-cv-text');

    StorageEngine.save(this.data);
    ToastManager.show('Hero section configuration saved!', 'success');
  },

  /* ------------------------------------------------------------------------
     4. PROJECTS MANAGEMENT (CRUD + Duplicate)
     ------------------------------------------------------------------------ */
  renderProjectsTable() {
    const tbody = document.getElementById('admin-projects-tbody');
    const filterSelect = document.getElementById('admin-project-filter');
    const query = (document.getElementById('admin-project-search')?.value || '').toLowerCase().trim();
    const cat = filterSelect ? filterSelect.value : 'All';

    // Update filter dropdown with available categories
    if (filterSelect) {
      const categories = Array.from(new Set(this.data.projects.map(p => p.category))).filter(Boolean);
      const currentVal = filterSelect.value;
      filterSelect.innerHTML = `<option value="All">All Categories (${this.data.projects.length})</option>` +
        categories.map(c => `<option value="${c}" ${c === currentVal ? 'selected' : ''}>${c}</option>`).join('');
    }

    if (!tbody) return;

    const filtered = this.data.projects.filter(p => {
      const matchCat = cat === 'All' || p.category.toLowerCase() === cat.toLowerCase();
      const matchQuery = !query ||
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        (p.technologies || []).some(t => t.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-dim);padding:2rem;">Tidak ada proyek yang sesuai dengan kriteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(p => `
      <tr>
        <td><img src="${p.image}" alt="${p.title}" class="table-thumb"></td>
        <td>
          <strong>${p.title}</strong><br>
          <span class="status-code">${p.category}</span>
        </td>
        <td style="max-width:280px;"><small class="help-text">${p.description}</small></td>
        <td><small>${(p.technologies || []).join(', ')}</small></td>
        <td>
          <div class="table-actions">
            <button class="action-icon-btn" onclick="AdminApp.openProjectModal(${p.id})">Edit</button>
            <button class="action-icon-btn" onclick="AdminApp.duplicateProject(${p.id})">Duplicate</button>
            <button class="action-icon-btn btn-del" onclick="AdminApp.deleteProject(${p.id})">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  openProjectModal(id = null) {
    const modal = document.getElementById('modal-project-form');
    const titleEl = document.getElementById('project-modal-title');
    const form = document.getElementById('project-form-inner');

    form.reset();
    document.getElementById('pform-id').value = '';

    if (id) {
      const p = this.data.projects.find(x => x.id === id);
      if (!p) return;
      titleEl.textContent = 'Edit Project: ' + p.title;
      document.getElementById('pform-id').value = p.id;
      document.getElementById('pform-title').value = p.title;
      document.getElementById('pform-category').value = p.category;
      document.getElementById('pform-desc').value = p.description;
      document.getElementById('pform-fulldesc').value = p.fullDescription || p.description;
      document.getElementById('pform-features').value = (p.features || []).join('\n');
      document.getElementById('pform-tech').value = (p.technologies || []).join(', ');
      document.getElementById('pform-github').value = p.github || '';
      document.getElementById('pform-demo').value = p.demo || '';
      document.getElementById('pform-img-url').value = p.image || '';
      document.getElementById('pform-img-preview').src = p.image || 'assets/projects/project-1.jpg';
    } else {
      titleEl.textContent = 'Create New Project';
      document.getElementById('pform-img-url').value = 'assets/projects/project-1.jpg';
      document.getElementById('pform-img-preview').src = 'assets/projects/project-1.jpg';
    }

    if (modal) modal.classList.add('active');
  },

  closeProjectModal() {
    const modal = document.getElementById('modal-project-form');
    if (modal) modal.classList.remove('active');
  },

  saveProject(e) {
    e.preventDefault();
    const idVal = document.getElementById('pform-id').value;
    const isEdit = Boolean(idVal);

    const title = document.getElementById('pform-title').value.trim();
    const category = document.getElementById('pform-category').value.trim();
    const description = document.getElementById('pform-desc').value.trim();
    const fullDescription = document.getElementById('pform-fulldesc').value.trim() || description;
    const features = document.getElementById('pform-features').value.split('\n').map(s => s.trim()).filter(Boolean);
    const technologies = document.getElementById('pform-tech').value.split(',').map(s => s.trim()).filter(Boolean);
    const github = document.getElementById('pform-github').value.trim() || '#';
    const demo = document.getElementById('pform-demo').value.trim() || '#';
    const image = document.getElementById('pform-img-url').value.trim() || 'assets/projects/project-1.jpg';

    if (!title || !category || !description) {
      ToastManager.show('Mohon lengkapi judul, kategori, dan deskripsi proyek.', 'warning');
      return;
    }

    if (isEdit) {
      const idx = this.data.projects.findIndex(p => p.id === parseInt(idVal, 10));
      if (idx !== -1) {
        this.data.projects[idx] = {
          ...this.data.projects[idx],
          title, category, description, fullDescription, features, technologies, github, demo, image
        };
        ToastManager.show(`Project "${title}" updated successfully!`, 'success');
      }
    } else {
      const newProj = {
        id: Date.now(),
        title, category, description, fullDescription, features, technologies, github, demo, image,
        createdAt: new Date().toISOString().split('T')[0]
      };
      this.data.projects.push(newProj);
      ToastManager.show(`Project "${title}" added successfully!`, 'success');
    }

    StorageEngine.save(this.data);
    this.closeProjectModal();
    this.renderProjectsTable();
    this.renderDashboardOverview();
    this.updateBadges();
  },

  duplicateProject(id) {
    const p = this.data.projects.find(x => x.id === id);
    if (!p) return;

    const clone = {
      ...JSON.parse(JSON.stringify(p)),
      id: Date.now(),
      title: `${p.title} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    this.data.projects.push(clone);
    StorageEngine.save(this.data);
    this.renderProjectsTable();
    this.renderDashboardOverview();
    this.updateBadges();
    ToastManager.show(`Project duplicated: "${clone.title}"`, 'success');
  },

  deleteProject(id) {
    const p = this.data.projects.find(x => x.id === id);
    if (!p) return;

    this.confirm(
      'Delete Project',
      `Hapus proyek "${p.title}" secara permanen dari portofolio?`,
      () => {
        this.data.projects = this.data.projects.filter(x => x.id !== id);
        StorageEngine.save(this.data);
        this.renderProjectsTable();
        this.renderDashboardOverview();
        this.updateBadges();
        ToastManager.show(`Project "${p.title}" deleted.`, 'info');
      },
      '🗑️'
    );
  },

  /* ------------------------------------------------------------------------
     5. SKILLS MANAGEMENT (CRUD)
     ------------------------------------------------------------------------ */
  renderSkillsManager() {
    const container = document.getElementById('skills-manager-container');
    if (!container) return;

    // Group skills by category
    const grouped = {};
    this.data.skills.forEach(s => {
      const cat = s.category || 'Other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(s);
    });

    container.innerHTML = Object.entries(grouped).map(([cat, list]) => `
      <div class="skill-cat-card">
        <div class="skill-cat-head">
          <span>${cat}</span>
          <small class="status-code">${list.length} skills</small>
        </div>
        ${list.map(s => `
          <div class="skill-item-row">
            <div class="skill-item-info">
              <span>${s.name}</span>
              <div class="skill-item-actions">
                <span class="text-accent">${s.level}%</span>
                <button class="action-icon-btn" onclick="AdminApp.openSkillModal(${s.id})">Edit</button>
                <button class="action-icon-btn btn-del" onclick="AdminApp.deleteSkill(${s.id})">×</button>
              </div>
            </div>
            <div class="skill-bar-mini">
              <div class="skill-bar-mini-fill" style="width: ${s.level}%;"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('');
  },

  openSkillModal(id = null) {
    const modal = document.getElementById('modal-skill-form');
    const titleEl = document.getElementById('skill-modal-title');
    const form = document.getElementById('skill-form-inner');

    form.reset();
    document.getElementById('sform-id').value = '';

    if (id) {
      const s = this.data.skills.find(x => x.id === id);
      if (!s) return;
      titleEl.textContent = 'Edit Skill: ' + s.name;
      document.getElementById('sform-id').value = s.id;
      document.getElementById('sform-name').value = s.name;
      document.getElementById('sform-category').value = s.category;
      document.getElementById('sform-level').value = s.level;
      document.getElementById('sform-level-val').textContent = `${s.level}%`;
    } else {
      titleEl.textContent = 'Add New Skill';
      document.getElementById('sform-level').value = 85;
      document.getElementById('sform-level-val').textContent = '85%';
    }

    if (modal) modal.classList.add('active');
  },

  closeSkillModal() {
    const modal = document.getElementById('modal-skill-form');
    if (modal) modal.classList.remove('active');
  },

  saveSkill(e) {
    e.preventDefault();
    const idVal = document.getElementById('sform-id').value;
    const name = document.getElementById('sform-name').value.trim();
    const category = document.getElementById('sform-category').value.trim();
    const level = parseInt(document.getElementById('sform-level').value, 10) || 50;

    if (!name || !category) {
      ToastManager.show('Nama dan kategori keahlian harus diisi.', 'warning');
      return;
    }

    if (idVal) {
      const idx = this.data.skills.findIndex(x => x.id === parseInt(idVal, 10));
      if (idx !== -1) {
        this.data.skills[idx] = { ...this.data.skills[idx], name, category, level };
        ToastManager.show(`Skill "${name}" updated!`, 'success');
      }
    } else {
      this.data.skills.push({ id: Date.now(), name, category, level });
      ToastManager.show(`Skill "${name}" added!`, 'success');
    }

    StorageEngine.save(this.data);
    this.closeSkillModal();
    this.renderSkillsManager();
    this.renderDashboardOverview();
    this.updateBadges();
  },

  deleteSkill(id) {
    const s = this.data.skills.find(x => x.id === id);
    if (!s) return;

    this.confirm('Delete Skill', `Hapus keahlian "${s.name}"?`, () => {
      this.data.skills = this.data.skills.filter(x => x.id !== id);
      StorageEngine.save(this.data);
      this.renderSkillsManager();
      this.renderDashboardOverview();
      this.updateBadges();
      ToastManager.show(`Skill "${s.name}" removed.`, 'info');
    });
  },

  /* ------------------------------------------------------------------------
     6. EXPERIENCE MANAGEMENT (CRUD)
     ------------------------------------------------------------------------ */
  renderExperienceTable() {
    const tbody = document.getElementById('admin-experience-tbody');
    if (!tbody) return;

    tbody.innerHTML = this.data.experience.map(e => `
      <tr>
        <td><strong>${e.year}</strong></td>
        <td>${e.role}</td>
        <td>${e.company}</td>
        <td><small>${(e.technologies || []).join(', ')}</small></td>
        <td>
          <div class="table-actions">
            <button class="action-icon-btn" onclick="AdminApp.openExpModal(${e.id})">Edit</button>
            <button class="action-icon-btn btn-del" onclick="AdminApp.deleteExp(${e.id})">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  openExpModal(id = null) {
    const modal = document.getElementById('modal-experience-form');
    const titleEl = document.getElementById('exp-modal-title');
    const form = document.getElementById('exp-form-inner');

    form.reset();
    document.getElementById('eform-id').value = '';

    if (id) {
      const e = this.data.experience.find(x => x.id === id);
      if (!e) return;
      titleEl.textContent = 'Edit Experience';
      document.getElementById('eform-id').value = e.id;
      document.getElementById('eform-year').value = e.year;
      document.getElementById('eform-role').value = e.role;
      document.getElementById('eform-company').value = e.company;
      document.getElementById('eform-desc').value = e.description;
      document.getElementById('eform-tech').value = (e.technologies || []).join(', ');
    } else {
      titleEl.textContent = 'Add Experience Milestone';
    }

    if (modal) modal.classList.add('active');
  },

  closeExpModal() {
    const modal = document.getElementById('modal-experience-form');
    if (modal) modal.classList.remove('active');
  },

  saveExp(e) {
    e.preventDefault();
    const idVal = document.getElementById('eform-id').value;
    const year = document.getElementById('eform-year').value.trim();
    const role = document.getElementById('eform-role').value.trim();
    const company = document.getElementById('eform-company').value.trim();
    const description = document.getElementById('eform-desc').value.trim();
    const technologies = document.getElementById('eform-tech').value.split(',').map(s => s.trim()).filter(Boolean);

    if (!year || !role || !company) {
      ToastManager.show('Mohon lengkapi tahun, peran, dan instansi.', 'warning');
      return;
    }

    if (idVal) {
      const idx = this.data.experience.findIndex(x => x.id === parseInt(idVal, 10));
      if (idx !== -1) {
        this.data.experience[idx] = { ...this.data.experience[idx], year, role, company, description, technologies };
        ToastManager.show('Experience record updated!', 'success');
      }
    } else {
      this.data.experience.push({ id: Date.now(), year, role, company, description, technologies });
      ToastManager.show('Experience milestone added!', 'success');
    }

    StorageEngine.save(this.data);
    this.closeExpModal();
    this.renderExperienceTable();
  },

  deleteExp(id) {
    this.confirm('Delete Experience', 'Hapus riwayat milestone ini?', () => {
      this.data.experience = this.data.experience.filter(x => x.id !== id);
      StorageEngine.save(this.data);
      this.renderExperienceTable();
      ToastManager.show('Experience record deleted.', 'info');
    });
  },

  /* ------------------------------------------------------------------------
     7. EDUCATION MANAGEMENT (CRUD)
     ------------------------------------------------------------------------ */
  renderEducationList() {
    const container = document.getElementById('admin-education-list');
    if (!container) return;

    container.innerHTML = this.data.education.map(edu => `
      <div style="padding:1.2rem; border-bottom:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <span class="status-code">${edu.years}</span>
          <h4 style="font-size:1.1rem; margin:0.3rem 0 0.15rem 0;">${edu.institution}</h4>
          <p class="text-accent" style="font-size:0.88rem; margin-bottom:0.5rem;">${edu.major}</p>
          <p class="help-text">${edu.description}</p>
        </div>
        <div class="table-actions">
          <button class="action-icon-btn" onclick="AdminApp.openEduModal(${edu.id})">Edit</button>
          <button class="action-icon-btn btn-del" onclick="AdminApp.deleteEdu(${edu.id})">Delete</button>
        </div>
      </div>
    `).join('');
  },

  openEduModal(id = null) {
    const modal = document.getElementById('modal-education-form');
    const form = document.getElementById('edu-form-inner');

    form.reset();
    document.getElementById('eduform-id').value = '';

    if (id) {
      const ed = this.data.education.find(x => x.id === id);
      if (!ed) return;
      document.getElementById('eduform-id').value = ed.id;
      document.getElementById('eduform-inst').value = ed.institution;
      document.getElementById('eduform-major').value = ed.major;
      document.getElementById('eduform-years').value = ed.years;
      document.getElementById('eduform-desc').value = ed.description;
      document.getElementById('eduform-courses').value = (ed.coursework || []).join(', ');
      document.getElementById('eduform-achieve').value = (ed.achievements || []).join('\n');
    }

    if (modal) modal.classList.add('active');
  },

  closeEduModal() {
    const modal = document.getElementById('modal-education-form');
    if (modal) modal.classList.remove('active');
  },

  saveEdu(e) {
    e.preventDefault();
    const idVal = document.getElementById('eduform-id').value;
    const institution = document.getElementById('eduform-inst').value.trim();
    const major = document.getElementById('eduform-major').value.trim();
    const years = document.getElementById('eduform-years').value.trim();
    const description = document.getElementById('eduform-desc').value.trim();
    const coursework = document.getElementById('eduform-courses').value.split(',').map(s => s.trim()).filter(Boolean);
    const achievements = document.getElementById('eduform-achieve').value.split('\n').map(s => s.trim()).filter(Boolean);

    if (idVal) {
      const idx = this.data.education.findIndex(x => x.id === parseInt(idVal, 10));
      if (idx !== -1) {
        this.data.education[idx] = { ...this.data.education[idx], institution, major, years, description, coursework, achievements };
        ToastManager.show('Education updated!', 'success');
      }
    } else {
      this.data.education.push({ id: Date.now(), institution, major, years, description, coursework, achievements });
      ToastManager.show('Education added!', 'success');
    }

    StorageEngine.save(this.data);
    this.closeEduModal();
    this.renderEducationList();
  },

  deleteEdu(id) {
    this.confirm('Delete Education', 'Hapus data institusi pendidikan ini?', () => {
      this.data.education = this.data.education.filter(x => x.id !== id);
      StorageEngine.save(this.data);
      this.renderEducationList();
      ToastManager.show('Education entry removed.', 'info');
    });
  },

  /* ------------------------------------------------------------------------
     8. CERTIFICATES MANAGEMENT (CRUD)
     ------------------------------------------------------------------------ */
  renderCertificatesTable() {
    const tbody = document.getElementById('admin-certificates-tbody');
    if (!tbody) return;

    tbody.innerHTML = this.data.certificates.map(c => `
      <tr>
        <td><img src="${c.image}" alt="${c.title}" class="table-thumb"></td>
        <td><strong>${c.title}</strong></td>
        <td>${c.issuer}</td>
        <td><span class="status-code">${c.year}</span></td>
        <td><small class="help-text">${c.credentialId || '-'}</small></td>
        <td>
          <div class="table-actions">
            <button class="action-icon-btn" onclick="AdminApp.openCertModal(${c.id})">Edit</button>
            <button class="action-icon-btn btn-del" onclick="AdminApp.deleteCert(${c.id})">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  openCertModal(id = null) {
    const modal = document.getElementById('modal-certificate-form');
    const form = document.getElementById('cert-form-inner');

    form.reset();
    document.getElementById('cform-id').value = '';

    if (id) {
      const c = this.data.certificates.find(x => x.id === id);
      if (!c) return;
      document.getElementById('cform-id').value = c.id;
      document.getElementById('cform-title').value = c.title;
      document.getElementById('cform-issuer').value = c.issuer;
      document.getElementById('cform-year').value = c.year;
      document.getElementById('cform-credid').value = c.credentialId || '';
      document.getElementById('cform-desc').value = c.description;
      document.getElementById('cform-img-url').value = c.image;
      document.getElementById('cform-img-preview').src = c.image;
    } else {
      document.getElementById('cform-img-url').value = 'assets/certificates/cert-1.jpg';
      document.getElementById('cform-img-preview').src = 'assets/certificates/cert-1.jpg';
    }

    if (modal) modal.classList.add('active');
  },

  closeCertModal() {
    const modal = document.getElementById('modal-certificate-form');
    if (modal) modal.classList.remove('active');
  },

  saveCert(e) {
    e.preventDefault();
    const idVal = document.getElementById('cform-id').value;
    const title = document.getElementById('cform-title').value.trim();
    const issuer = document.getElementById('cform-issuer').value.trim();
    const year = document.getElementById('cform-year').value.trim();
    const credentialId = document.getElementById('cform-credid').value.trim();
    const description = document.getElementById('cform-desc').value.trim();
    const image = document.getElementById('cform-img-url').value.trim() || 'assets/certificates/cert-1.jpg';

    if (!title || !issuer || !year) {
      ToastManager.show('Lengkapi nama sertifikat, penerbit, dan tahun.', 'warning');
      return;
    }

    if (idVal) {
      const idx = this.data.certificates.findIndex(x => x.id === parseInt(idVal, 10));
      if (idx !== -1) {
        this.data.certificates[idx] = { ...this.data.certificates[idx], title, issuer, year, credentialId, description, image };
        ToastManager.show(`Certificate "${title}" updated!`, 'success');
      }
    } else {
      this.data.certificates.push({ id: Date.now(), title, issuer, year, credentialId, description, image });
      ToastManager.show(`Certificate "${title}" added!`, 'success');
    }

    StorageEngine.save(this.data);
    this.closeCertModal();
    this.renderCertificatesTable();
    this.renderDashboardOverview();
  },

  deleteCert(id) {
    this.confirm('Delete Certificate', 'Hapus sertifikat kredensial ini?', () => {
      this.data.certificates = this.data.certificates.filter(x => x.id !== id);
      StorageEngine.save(this.data);
      this.renderCertificatesTable();
      this.renderDashboardOverview();
      ToastManager.show('Certificate removed.', 'info');
    });
  },

  /* ------------------------------------------------------------------------
     9. SERVICES MANAGEMENT (CRUD)
     ------------------------------------------------------------------------ */
  renderServicesTable() {
    const tbody = document.getElementById('admin-services-tbody');
    if (!tbody) return;

    tbody.innerHTML = this.data.services.map(s => `
      <tr>
        <td style="font-size:1.3rem;">${s.icon || '🛠️'}</td>
        <td><strong>${s.title}</strong></td>
        <td style="max-width:300px;"><small class="help-text">${s.description}</small></td>
        <td><span class="status-code">${s.status || 'Active'}</span></td>
        <td>
          <div class="table-actions">
            <button class="action-icon-btn" onclick="AdminApp.openServModal(${s.id})">Edit</button>
            <button class="action-icon-btn btn-del" onclick="AdminApp.deleteServ(${s.id})">Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  openServModal(id = null) {
    const modal = document.getElementById('modal-service-form');
    const form = document.getElementById('serv-form-inner');

    form.reset();
    document.getElementById('servform-id').value = '';

    if (id) {
      const s = this.data.services.find(x => x.id === id);
      if (!s) return;
      document.getElementById('servform-id').value = s.id;
      document.getElementById('servform-title').value = s.title;
      document.getElementById('servform-icon').value = s.icon;
      document.getElementById('servform-desc').value = s.description;
      document.getElementById('servform-features').value = (s.features || []).join('\n');
    }

    if (modal) modal.classList.add('active');
  },

  closeServModal() {
    const modal = document.getElementById('modal-service-form');
    if (modal) modal.classList.remove('active');
  },

  saveServ(e) {
    e.preventDefault();
    const idVal = document.getElementById('servform-id').value;
    const title = document.getElementById('servform-title').value.trim();
    const icon = document.getElementById('servform-icon').value.trim() || '🛠️';
    const description = document.getElementById('servform-desc').value.trim();
    const features = document.getElementById('servform-features').value.split('\n').map(s => s.trim()).filter(Boolean);

    if (!title) {
      ToastManager.show('Nama service wajib diisi.', 'warning');
      return;
    }

    if (idVal) {
      const idx = this.data.services.findIndex(x => x.id === parseInt(idVal, 10));
      if (idx !== -1) {
        this.data.services[idx] = { ...this.data.services[idx], title, icon, description, features };
        ToastManager.show(`Service "${title}" updated!`, 'success');
      }
    } else {
      this.data.services.push({ id: Date.now(), title, icon, description, features, status: 'Active' });
      ToastManager.show(`Service "${title}" added!`, 'success');
    }

    StorageEngine.save(this.data);
    this.closeServModal();
    this.renderServicesTable();
    this.renderDashboardOverview();
  },

  deleteServ(id) {
    this.confirm('Delete Service', 'Hapus layanan ini dari penawaran?', () => {
      this.data.services = this.data.services.filter(x => x.id !== id);
      StorageEngine.save(this.data);
      this.renderServicesTable();
      this.renderDashboardOverview();
      ToastManager.show('Service entry removed.', 'info');
    });
  },

  /* ------------------------------------------------------------------------
     10. SOCIAL MEDIA MANAGEMENT
     ------------------------------------------------------------------------ */
  renderSocialForm() {
    const s = this.data.social;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('soc-github', s.github);
    setVal('soc-linkedin', s.linkedin);
    setVal('soc-instagram', s.instagram);
    setVal('soc-email', s.email);
  },

  saveSocial() {
    const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value.trim() : '';
    this.data.social.github = getVal('soc-github');
    this.data.social.linkedin = getVal('soc-linkedin');
    this.data.social.instagram = getVal('soc-instagram');
    this.data.social.email = getVal('soc-email');

    // Sync profile email
    if (this.data.profile) this.data.profile.email = this.data.social.email;

    StorageEngine.save(this.data);
    ToastManager.show('Social links saved successfully!', 'success');
  },

  /* ------------------------------------------------------------------------
     11. WEBSITE SETTINGS & LIVE PREVIEW
     ------------------------------------------------------------------------ */
  renderSettingsForm() {
    const st = this.data.settings;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('set-site-title', st.siteTitle);
    setVal('set-accent-color', st.accentColor || '#00f2fe');
    const colorHex = document.getElementById('accent-hex-lbl');
    if (colorHex) colorHex.textContent = st.accentColor || '#00f2fe';

    setVal('set-theme-select', st.theme || 'dark');
    setVal('set-footer-copyright', st.footerCopyright);
    setVal('set-footer-text', st.footerText);
  },

  saveSettings() {
    const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value.trim() : '';
    this.data.settings.siteTitle = getVal('set-site-title');
    this.data.settings.accentColor = getVal('set-accent-color');
    this.data.settings.theme = getVal('set-theme-select');
    this.data.settings.footerCopyright = getVal('set-footer-copyright');
    this.data.settings.footerText = getVal('set-footer-text');

    StorageEngine.save(this.data);
    ToastManager.show('Website settings saved!', 'success');
  },

  /* ------------------------------------------------------------------------
     12. DATA MANAGEMENT (EXPORT / IMPORT / RESET)
     ------------------------------------------------------------------------ */
  exportData() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    ToastManager.show('Portfolio backup downloaded (portfolio-data.json)!', 'success');
  },

  importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (!parsed.profile || !parsed.projects || !parsed.skills) {
          throw new Error('Format skema JSON tidak sesuai dengan standar portfolio.');
        }

        this.confirm(
          'Restore Portfolio Data',
          'Apakah Anda yakin ingin menimpa database lokal dengan file JSON ini? Tindakan ini akan menggantikan data yang ada saat ini.',
          () => {
            this.data = parsed;
            StorageEngine.save(this.data);
            this.renderAll();
            ToastManager.show('Data portofolio berhasil dipulihkan dari file JSON!', 'success');
          },
          '📥'
        );
      } catch (err) {
        ToastManager.show('File JSON tidak valid: ' + (err.message || 'Error parsing file'), 'error');
      } finally {
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  }
};

/* ==========================================================================
   INITIALIZATION ON DOM LOAD
   ========================================================================== */
// Tambahkan baris ini untuk mengekspos AdminApp ke atribut onclick di HTML
window.AdminApp = AdminApp; 

document.addEventListener('DOMContentLoaded', () => {
  AdminApp.init();
});
