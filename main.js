// Основной обработчик интерактивности: мобильное меню, модал галереи, контактная форма, год в футере
document.addEventListener('DOMContentLoaded', function(){
  // год в футере (обновляет все элементы)
  const years = document.querySelectorAll('#year, #year2, #year3, #year4, #year5');
  const y = new Date().getFullYear();
  years.forEach(el => { if (el) el.textContent = y; });

  // мобильное меню
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav){
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Галерея — модал
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      modalImg.src = item.src;
      modalImg.alt = item.alt || '';
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
    });
    // keyboard access
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal();});
  function closeModal(){ if (modal){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); modalImg.src=''; }}

  // Простая валидация формы контактов
  const form = document.getElementById('contact-form');
  const formMsg = document.getElementById('form-msg');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();
      if (!name || !email || !message){
        formMsg.textContent = 'Пожалуйста, заполните все поля.';
        formMsg.style.color = 'crimson';
        return;
      }
      // очень простая проверка email
      if (!/^\S+@\S+\.\S+$/.test(email)){
        formMsg.textContent = 'Введите корректный email.';
        formMsg.style.color = 'crimson';
        return;
      }
      // Здесь можно отправить форму на сервер (fetch)
      formMsg.textContent = 'Сообщение отправлено. Спасибо!';
      formMsg.style.color = 'green';
      form.reset();
    });
  }
});
