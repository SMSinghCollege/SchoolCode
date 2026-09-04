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
const whatsappFormButton = document.querySelector<HTMLButtonElement>('#whatsapp-form');
const formStatus = document.querySelector<HTMLElement>('#form-status');

const getAdmissionMessage = (form: HTMLFormElement) => {
  const data = new FormData(form);
  return [
    'Admission Enquiry', '',
    `Father's name: ${data.get('fatherName')}`,
    `Mother's name: ${data.get('motherName')}`,
    `Student's name: ${data.get('studentName')}`,
    `Grade of interest: ${data.get('grade')}`,
    `Additional note: ${data.get('note') || 'None'}`,
  ].join('\n');
};

admissionForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const body = getAdmissionMessage(admissionForm);
  const subject = encodeURIComponent('Admission Enquiry');
  const encodedBody = encodeURIComponent(body);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=smsinghintercollege@gmail.com&su=${subject}&body=${encodedBody}`;
  window.open(gmailUrl, '_blank', 'noopener,noreferrer');
  if (formStatus) formStatus.textContent = 'Opening Gmail with your enquiry. You may review and send it there.';
});

whatsappFormButton?.addEventListener('click', () => {
  if (!admissionForm?.reportValidity()) return;
  const message = encodeURIComponent(`${getAdmissionMessage(admissionForm)}\n\nPlease help me with the admission process.`);
  window.open(`https://wa.me/918009575756?text=${message}`, '_blank', 'noopener,noreferrer');
  if (formStatus) formStatus.textContent = 'Opening WhatsApp with your enquiry for the Manager.';
});
