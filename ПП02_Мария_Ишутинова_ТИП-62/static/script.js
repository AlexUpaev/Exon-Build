// Фильтрация таблиц по текстовому вводу
function filterTable(filterValue) {
  const table = document.getElementById('requestsTable');
  const rows = table.getElementsByTagName('tr');
  const filter = filterValue.toLowerCase();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? '' : 'none';
  }
}

// Имитация кнопок "Одобрить" / "Отклонить"
function approveRequest(btn) {
  const row = btn.closest('tr');
  row.cells[4].textContent = 'Одобрено';
  row.style.backgroundColor = '#d4f4dd';
}

function rejectRequest(btn) {
  const row = btn.closest('tr');
  row.cells[4].textContent = 'Отклонено';
  row.style.backgroundColor = '#f8d7da';
}

// Всплытие элементов (при появлении)
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.section');
  section.classList.add('show');
});

// Анимация текста на главной странице
window.addEventListener('DOMContentLoaded', () => {
  const typedText = document.getElementById('typedText');
  const texts = [
    "Экосистема управления строительством",
    "Контроль всех процессов в одном месте",
    "Инновации для вашей стройки",
    "Умный подход к каждому проекту"
  ];
  let i = 0, j = 0, currentText = '', isDeleting = false;

  function type() {
    if (i < texts.length) {
      if (!isDeleting && j <= texts[i].length) {
        currentText = texts[i].substring(0, j++);
      } else if (isDeleting && j >= 0) {
        currentText = texts[i].substring(0, j--);
      }
      typedText.innerHTML = currentText;

      if (j === texts[i].length) isDeleting = true;
      if (isDeleting && j === 0) {
        isDeleting = false;
        i++;
        if (i === texts.length) i = 0;
      }
    }
    setTimeout(type, isDeleting ? 50 : 150);
  }
  type();
});
// Фильтрация таблиц по текстовому вводу
function filterTable(filterValue) {
  const table = document.getElementById('requestsTable');
  const rows = table.getElementsByTagName('tr');
  const filter = filterValue.toLowerCase();

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? '' : 'none';
  }
}

// Имитация кнопок "Одобрить" / "Отклонить"
function approveRequest(btn) {
  const row = btn.closest('tr');
  row.cells[4].textContent = 'Одобрено';
  row.cells[4].className = 'status-approved';
  row.style.backgroundColor = '#e8f5e9';
}

function rejectRequest(btn) {
  const row = btn.closest('tr');
  row.cells[4].textContent = 'Отклонено';
  row.cells[4].className = 'status-rejected';
  row.style.backgroundColor = '#ffebee';
}

// Всплытие элементов (при появлении)
document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.section');
  section.classList.add('show');
  
  // Инициализация нового функционала
  initStatusColors();
  initNotifications();
  initCharts();
});

// Анимация текста на главной странице
window.addEventListener('DOMContentLoaded', () => {
  const typedText = document.getElementById('typedText');
  if (typedText) {
    const texts = [
      "Экосистема управления строительством",
      "Контроль всех процессов в одном месте",
      "Инновации для вашей стройки",
      "Умный подход к каждому проекту"
    ];
    let i = 0, j = 0, currentText = '', isDeleting = false;

    function type() {
      if (i < texts.length) {
        if (!isDeleting && j <= texts[i].length) {
          currentText = texts[i].substring(0, j++);
        } else if (isDeleting && j >= 0) {
          currentText = texts[i].substring(0, j--);
        }
        typedText.innerHTML = currentText;

        if (j === texts[i].length) isDeleting = true;
        if (isDeleting && j === 0) {
          isDeleting = false;
          i++;
          if (i === texts.length) i = 0;
        }
      }
      setTimeout(type, isDeleting ? 50 : 150);
    }
    type();
  }
});


function initStatusColors() {
  const statusCells = document.querySelectorAll('td:nth-child(5)');
  statusCells.forEach(cell => {
    if (cell.textContent.includes('Ожидает')) {
      cell.className = 'status-pending';
    } else if (cell.textContent.includes('Одобрено')) {
      cell.className = 'status-approved';
    } else if (cell.textContent.includes('Отклонено')) {
      cell.className = 'status-rejected';
    }
  });
}

function initNotifications() {
  const navLinks = document.querySelectorAll('.nav-links li');
  navLinks.forEach(link => {
    if (link.querySelector('a[href="profile.html"]')) {
      const badge = document.createElement('span');
      badge.className = 'notification-badge';
      badge.textContent = '3';
      link.appendChild(badge);
    }
  });
}

function initCharts() {
  if (document.getElementById('statsChart')) {
    // Имитация графика с использованием Canvas API
    const canvas = document.getElementById('statsChart');
    const ctx = canvas.getContext('2d');
    
    // Простая реализация столбчатой диаграммы
    const data = [30, 45, 60, 35, 70];
    const labels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май'];
    const colors = ['#7c4dff', '#b388ff', '#651fff', '#4b2e83', '#9c64ff'];
    
    ctx.fillStyle = '#f5f7fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = 50;
    const startX = 50;
    
    data.forEach((value, index) => {
      const x = startX + (barWidth + 20) * index;
      const y = canvas.height - 30 - value * 3;
      const height = value * 3;
      
      ctx.fillStyle = colors[index];
      ctx.fillRect(x, y, barWidth, height);
      
      ctx.fillStyle = '#4b2e83';
      ctx.font = '12px Arial';
      ctx.fillText(labels[index], x + 15, canvas.height - 10);
      
      ctx.fillText(value, x + 15, y - 5);
    });
  }
}

// Обработка формы заявки
if (document.getElementById('projectForm')) {
  document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    this.reset();
  });
}

// Обработка форм авторизации
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Вход выполнен успешно! Перенаправляем в личный кабинет...');
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 1000);
  });
}

if (document.getElementById('registerForm')) {
  document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Регистрация прошла успешно! Теперь вы можете войти в систему.');
    this.reset();
  });
}
// Улучшенная анимация счетчиков
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  const el = document.getElementById(element);
  
  if (!el) return;

  const animate = () => {
    current += increment;
    if (current < target) {
      el.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(animate);
    } else {
      el.textContent = target.toLocaleString();
    }
  };
  
  animate();
}

// Инициализация всех счетчиков
function initCounters() {
  if (document.getElementById('clientsCounter')) {
    // Задержка для лучшего UX (чтобы анимация началась после загрузки страницы)
    setTimeout(() => {
      animateCounter('clientsCounter', 200, 1500);
      animateCounter('projectsCounter', 485, 2000);
      animateCounter('yearsCounter', 7, 1000);
      animateCounter('teamCounter', 24, 1200);
    }, 500);
  }
}

// Добавляем в DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initCounters();
});
// Админ-панель - инициализация графиков и данных
function initAdminPanel() {
  if (!document.querySelector('.admin-dashboard')) return;

  // Анимация счетчиков
  animateCounter('totalRequests', 142, 1000);
  animateCounter('approvedRequests', 98, 1200);
  animateCounter('rejectedRequests', 21, 800);
  animateCounter('totalBudget', 356, 1500);

  // График заявок по месяцам
  const requestsCtx = document.getElementById('requestsChart').getContext('2d');
  new Chart(requestsCtx, {
    type: 'bar',
    data: {
      labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
      datasets: [{
        label: 'Заявки',
        data: [12, 19, 15, 24, 18, 22],
        backgroundColor: '#b388ff',
        borderColor: '#7c4dff',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Круговая диаграмма статусов
  const statusCtx = document.getElementById('statusChart').getContext('2d');
  new Chart(statusCtx, {
    type: 'doughnut',
    data: {
      labels: ['Одобрено', 'Ожидание', 'Отклонено'],
      datasets: [{
        data: [98, 23, 21],
        backgroundColor: [
          '#4caf50',
          '#ff9800',
          '#f44336'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });

  // Загрузка данных в таблицу
  loadRequestsTable();
}

// Загрузка данных в таблицу заявок
function loadRequestsTable() {
  const requests = [
    { id: 201, company: 'СтройГарант', budget: '3 200 000 ₽', term: '90 дней', status: 'approved' },
    { id: 202, company: 'АрхПроект', budget: '1 800 000 ₽', term: '60 дней', status: 'pending' },
    { id: 203, company: 'ТехноСтрой', budget: '4 700 000 ₽', term: '120 дней', status: 'rejected' },
    { id: 204, company: 'ДомСервис', budget: '2 500 000 ₽', term: '75 дней', status: 'approved' },
    { id: 205, company: 'СтройИнвест', budget: '5 100 000 ₽', term: '110 дней', status: 'pending' }
  ];

  const tbody = document.querySelector('#requestsTable tbody');
  tbody.innerHTML = '';

  requests.forEach(request => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${request.id}</td>
      <td>${request.company}</td>
      <td>${request.budget}</td>
      <td>${request.term}</td>
      <td><span class="status-badge ${request.status}">${getStatusText(request.status)}</span></td>
      <td>
        <button class="action-btn approve" onclick="approveRequest(this)">✓</button>
        <button class="action-btn reject" onclick="rejectRequest(this)">✕</button>
        <button class="action-btn details" onclick="showDetails(${request.id})">⋮</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function getStatusText(status) {
  const statusMap = {
    approved: 'Одобрено',
    pending: 'Ожидание',
    rejected: 'Отклонено'
  };
  return statusMap[status] || status;
}

// Добавьте в DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initAdminPanel();
});
// Глобальная переменная для хранения всех заявок
let allRequests = [];

// Функция фильтрации заявок
function filterRequests() {
  const statusFilter = document.getElementById('statusFilter').value;
  const searchText = document.getElementById('searchInput').value.toLowerCase();
  
  const filtered = allRequests.filter(request => {
    // Фильтр по статусу
    const statusMatch = statusFilter === 'all' || request.status === statusFilter;
    
    // Фильтр по поисковому запросу
    const searchMatch = 
      request.id.toString().includes(searchText) ||
      request.company.toLowerCase().includes(searchText) ||
      request.budget.toLowerCase().includes(searchText) ||
      request.term.toLowerCase().includes(searchText);
    
    return statusMatch && searchMatch;
  });
  
  renderRequestsTable(filtered);
}

// Функция отрисовки таблицы
function renderRequestsTable(requests) {
  const tbody = document.querySelector('#requestsTable tbody');
  tbody.innerHTML = '';

  requests.forEach(request => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${request.id}</td>
      <td>${request.company}</td>
      <td>${request.budget}</td>
      <td>${request.term}</td>
      <td><span class="status-badge ${request.status}">${getStatusText(request.status)}</span></td>
      <td>
        <button class="action-btn approve" onclick="approveRequest(this)">✓</button>
        <button class="action-btn reject" onclick="rejectRequest(this)">✕</button>
        <button class="action-btn details" onclick="showDetails(${request.id})">⋮</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Обновляем информацию о количестве
  document.getElementById('shownItems').textContent = `1-${requests.length}`;
  document.getElementById('totalItems').textContent = requests.length;
}

// Обновленная функция загрузки данных
function loadRequestsTable() {
  allRequests = [
    { id: 201, company: 'СтройГарант', budget: '3 200 000 ₽', term: '90 дней', status: 'approved' },
    { id: 202, company: 'АрхПроект', budget: '1 800 000 ₽', term: '60 дней', status: 'pending' },
    { id: 203, company: 'ТехноСтрой', budget: '4 700 000 ₽', term: '120 дней', status: 'rejected' },
    { id: 204, company: 'ДомСервис', budget: '2 500 000 ₽', term: '75 дней', status: 'approved' },
    { id: 205, company: 'СтройИнвест', budget: '5 100 000 ₽', term: '110 дней', status: 'pending' }
  ];
  
  // Первоначальная отрисовка
  filterRequests();
}

// Обновленные функции для работы со статусами
function approveRequest(btn) {
  const row = btn.closest('tr');
  const statusBadge = row.querySelector('.status-badge');
  statusBadge.className = 'status-badge approved';
  statusBadge.textContent = 'Одобрено';
  
  // Обновляем данные в allRequests
  const requestId = parseInt(row.cells[0].textContent);
  const request = allRequests.find(r => r.id === requestId);
  if (request) request.status = 'approved';
}

function rejectRequest(btn) {
  const row = btn.closest('tr');
  const statusBadge = row.querySelector('.status-badge');
  statusBadge.className = 'status-badge rejected';
  statusBadge.textContent = 'Отклонено';
  
  // Обновляем данные в allRequests
  const requestId = parseInt(row.cells[0].textContent);
  const request = allRequests.find(r => r.id === requestId);
  if (request) request.status = 'rejected';
}

// Добавьте в DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initAdminPanel();
  loadRequestsTable(); // Инициализация данных
});
// Параллакс эффект для героя
function initParallax() {
  const hero = document.querySelector('.hero-section');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollValue = window.scrollY;
      hero.style.backgroundPositionY = scrollValue * 0.5 + 'px';
    });
  }
}

// Анимации при скролле
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(reveal => observer.observe(reveal));
}

// Модальное окно
function initModal() {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <div class="modal-body"></div>
    </div>
  `;
  document.body.appendChild(modal);

  window.showModal = (content) => {
    modal.querySelector('.modal-body').innerHTML = content;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  modal.querySelector('.close-modal').onclick = () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  };
}

// Темная тема
function initDarkMode() {
  const darkModeToggle = document.createElement('button');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '🌙';
  darkModeToggle.onclick = toggleDarkMode;
  document.body.appendChild(darkModeToggle);

  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
  }
}

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  document.querySelector('.dark-mode-toggle').innerHTML = isDark ? '☀️' : '🌙';
}

// Инициализация всего при загрузке
document.addEventListener('DOMContentLoaded', () => {
  initParallax();
  initScrollAnimations();
  initModal();
  initDarkMode();
  
  // Добавляем текущий год в футер
  document.querySelector('footer p').innerHTML += ` &copy; ${new Date().getFullYear()}`;
});
function initNotifications() {
  const navLinks = document.querySelectorAll('.nav-links li');
  navLinks.forEach(link => {
    if (link.querySelector('a[href="profile.html"]')) {
      const badge = document.createElement('span');
      badge.className = 'notification-badge pulse';
      badge.textContent = '3';
      link.appendChild(badge);
    }
  });
}
