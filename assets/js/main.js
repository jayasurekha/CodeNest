/* =============================================
   CODENEST – Main JavaScript
   ============================================= */

// ---------- MODAL SYSTEM ----------
function openModal(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
  document.body.style.overflow = '';
}
function switchModal(from, to) {
  closeModal(from);
  setTimeout(() => openModal(to), 200);
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

// Escape key closes modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id));
  }
});

// ---------- HAMBURGER MENU ----------
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (links) links.classList.toggle('open');
}

// ---------- TOAST NOTIFICATION ----------
function showToast(message, type = 'success') {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ---------- AUTH HANDLERS ----------
function handleLogin(e) {
  e.preventDefault();
  showToast('Logged in successfully! Welcome back.', 'success');
  closeModal('loginModal');
}
function handleSignup(e) {
  e.preventDefault();
  showToast('Account created! Welcome to CodeNest 🎉', 'success');
  closeModal('signupModal');
}

// ---------- COUNTDOWN TIMERS ----------
function startCountdowns() {
  document.querySelectorAll('.countdown').forEach(el => {
    let hours = parseInt(el.dataset.hours) || 0;
    let totalSeconds = hours * 3600;

    function update() {
      if (totalSeconds <= 0) { el.textContent = 'Live Now!'; return; }
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
      totalSeconds--;
    }
    update();
    setInterval(update, 1000);
  });
}

// ---------- FILTER BUTTONS ----------
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const group = this.closest('.filter-bar') || this.closest('.filter-group');
      if (group) {
        group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      }
      this.classList.add('active');

      const filter = this.dataset.filter;
      if (!filter) return;

      const cards = document.querySelectorAll('[data-difficulty], [data-category], [data-status]');
      cards.forEach(card => {
        const matches =
          filter === 'all' ||
          card.dataset.difficulty === filter ||
          card.dataset.category === filter ||
          card.dataset.status === filter;
        card.style.display = matches ? '' : 'none';
      });
    });
  });
}

// ---------- SEARCH ----------
function initSearch() {
  const searchInput = document.querySelector('.search-bar input');
  if (!searchInput) return;
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.challenge-card, .contest-card, .lb-row');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

// ---------- CODE RUNNER (Simulated) ----------
function runCode() {
  const editor = document.getElementById('code-editor');
  const output = document.getElementById('code-output');
  const lang = document.getElementById('lang-select')?.value || 'python';
  if (!editor || !output) return;

  output.innerHTML = '<span style="color:#facc15">Running...</span>';

  const code = editor.value.trim();

  setTimeout(() => {
    if (!code) {
      output.innerHTML = '<span style="color:#f87171">Error: No code to execute.</span>';
      return;
    }

    const mockOutputs = {
      python: `Hello, World!\n[Program finished with exit code 0]\nRuntime: 14ms | Memory: 3.8MB`,
      javascript: `Hello, World!\n[Program finished with exit code 0]\nRuntime: 8ms | Memory: 2.4MB`,
      java: `Hello, World!\n[Program finished with exit code 0]\nRuntime: 23ms | Memory: 12.1MB`,
      cpp: `Hello, World!\n[Program finished with exit code 0]\nRuntime: 4ms | Memory: 1.2MB`,
      go: `Hello, World!\n[Program finished with exit code 0]\nRuntime: 6ms | Memory: 2.0MB`,
      rust: `Hello, World!\n[Program finished with exit code 0]\nRuntime: 3ms | Memory: 0.8MB`,
    };

    const result = mockOutputs[lang] || `Output from ${lang}:\n[Program finished]\nRuntime: 10ms`;
    output.innerHTML = `<span style="color:#4ade80">${result}</span>`;
    showToast('Code executed successfully!', 'success');
  }, 1200);
}

function clearCode() {
  const editor = document.getElementById('code-editor');
  const output = document.getElementById('code-output');
  if (editor) editor.value = '';
  if (output) output.innerHTML = '<span style="color:#6b7280">Output will appear here...</span>';
}

function submitCode() {
  const editor = document.getElementById('code-editor');
  if (!editor || !editor.value.trim()) {
    showToast('Please write some code first!', 'error');
    return;
  }
  showToast('Submitted! Evaluating against test cases...', 'success');
  setTimeout(() => {
    showToast('✔ 10/10 test cases passed! +50 XP earned.', 'success');
  }, 2000);
}

// ---------- ACTIVE NAV LINK ----------
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === page) link.classList.add('active');
  });
}

// ---------- ANIMATE ON SCROLL ----------
function initScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .contest-card, .challenge-card, .coder-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ---------- TABS (for practice page) ----------
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const tabGroup = this.closest('.tabs');
      if (!tabGroup) return;
      tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const target = this.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = content.id === target ? '' : 'none';
      });
    });
  });
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  startCountdowns();
  initFilters();
  initSearch();
  initScrollAnimation();
  initTabs();
});

// ---------- LOAD SAMPLE CODE ----------
function loadSample() {
  const langEl = document.getElementById('lang-select');
  const lang = langEl ? langEl.value : 'python';
  const samples = {
    python:     'def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a, end=" ")\n        a, b = b, a + b\n\nfibonacci(10)',
    javascript: 'function fibonacci(n) {\n  let a = 0, b = 1;\n  for (let i = 0; i < n; i++) {\n    process.stdout.write(a + " ");\n    [a, b] = [b, a + b];\n  }\n}\nfibonacci(10);',
    java:       'public class Main {\n  public static void main(String[] args) {\n    int a = 0, b = 1;\n    for (int i = 0; i < 10; i++) {\n      System.out.print(a + " ");\n      int c = a + b; a = b; b = c;\n    }\n  }\n}',
    cpp:        '#include <iostream>\nusing namespace std;\nint main() {\n  int a = 0, b = 1;\n  for (int i = 0; i < 10; i++) {\n    cout << a << " ";\n    int c = a + b; a = b; b = c;\n  }\n  return 0;\n}',
    go:         'package main\nimport "fmt"\nfunc main() {\n  a, b := 0, 1\n  for i := 0; i < 10; i++ {\n    fmt.Print(a, " ")\n    a, b = b, a+b\n  }\n}',
    rust:       'fn main() {\n  let (mut a, mut b) = (0u64, 1u64);\n  for _ in 0..10 {\n    print!("{} ", a);\n    let c = a + b;\n    a = b; b = c;\n  }\n}',
    kotlin:     'fun main() {\n  var a = 0; var b = 1\n  repeat(10) {\n    print("$a ")\n    val c = a + b; a = b; b = c\n  }\n}',
    swift:      'var a = 0, b = 1\nfor _ in 0..<10 {\n  print(a, terminator: " ")\n  let c = a + b; a = b; b = c\n}',
  };
  const editor = document.getElementById('code-editor');
  if (editor) {
    editor.value = samples[lang] || `// Hello, ${lang}!\nprint("Hello from CodeNest!")`;
    showToast(`Loaded ${lang} sample code.`, 'success');
  }
}
