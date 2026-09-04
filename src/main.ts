import './style.css';

const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('.nav-links');

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  navigation?.classList.toggle('is-open', !open);
});

document.querySelectorAll<HTMLAnchorElement>('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle?.setAttribute('aria-expanded', 'false');
    navigation?.classList.remove('is-open');
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const admissionForm = document.querySelector<HTMLFormElement>('#admission-form');
admissionForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(admissionForm);
  const body = [
    'Admission Enquiry', '',
    `Father's name: ${data.get('fatherName')}`,
    `Mother's name: ${data.get('motherName')}`,
    `Student's name: ${data.get('studentName')}`,
    `Grade of interest: ${data.get('grade')}`,
    `Additional note: ${data.get('note') || 'None'}`,
  ].join('\n');
  window.location.href = `mailto:smsinghintercollege@gmail.com?subject=${encodeURIComponent('Admission Enquiry')}&body=${encodeURIComponent(body)}`;
});
