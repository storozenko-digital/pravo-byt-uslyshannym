const button = document.querySelector('.menu-button');
const links = document.querySelector('.nav-links');
if (button && links) button.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  button.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.footer-bottom').forEach((footer) => {
  const separator = document.createTextNode(' · ');
  const policy = document.createElement('a');
  policy.href = 'privacy.html';
  policy.textContent = 'Политика обработки персональных данных';
  footer.append(separator, policy);
});

const form = document.querySelector('[data-contact-form]');
if (form) form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get('name') || '';
  const topic = data.get('topic') || '';
  const message = data.get('message') || '';
  const channel = data.get('channel') || 'email';
  const text = `Здравствуйте, Ксения!\n\nМеня зовут: ${name}\nВопрос: ${topic}\n\n${message}`;

  if (channel === 'telegram') {
    window.location.href = `https://t.me/Xenia82?text=${encodeURIComponent(text)}`;
    return;
  }

  if (channel === 'max') {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      // Пользователь сможет скопировать сообщение из заполненной формы.
    }
    window.location.href = 'https://max.ru/u/f9LHodD0cOLm9j3LwNsvFzSZX2rLVyxBKHuDx0W_b3CyRGK45SBJr393ts4';
    return;
  }

  const subject = `Юридическая консультация: ${topic}`;
  window.location.href = `mailto:8207@list.ru?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
});
