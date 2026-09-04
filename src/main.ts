import './style.css';

// ─────────────────────────────────────────────
// Mobile navigation
// ─────────────────────────────────────────────

const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('.nav-links');

toggle?.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';

  toggle.setAttribute('aria-expanded', String(!isOpen));
  navigation?.classList.toggle('is-open', !isOpen);
});

document.querySelectorAll<HTMLAnchorElement>('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle?.setAttribute('aria-expanded', 'false');
    navigation?.classList.remove('is-open');
  });
});

// ─────────────────────────────────────────────
// Footer year
// ─────────────────────────────────────────────

const year = document.querySelector<HTMLElement>('#year');

if (year) {
  year.textContent = String(new Date().getFullYear());
}

// ─────────────────────────────────────────────
// Admission enquiry form
// ─────────────────────────────────────────────

const admissionForm =
  document.querySelector<HTMLFormElement>('#admission-form');

const whatsappFormButton =
  document.querySelector<HTMLButtonElement>('#whatsapp-form');

const formStatus =
  document.querySelector<HTMLElement>('#form-status');

// School contact details
const SCHOOL_EMAIL = 'smsinghintercollege@gmail.com';
const WHATSAPP_NUMBER = '918318600789'; // Shivakant Shukla - Clerk

// ─────────────────────────────────────────────
// Create admission enquiry message
// ─────────────────────────────────────────────

const getAdmissionMessage = (form: HTMLFormElement): string => {
  const data = new FormData(form);

  return [
    'Admission Enquiry',
    '',
    `Father's name: ${data.get('fatherName') || 'Not provided'}`,
    `Mother's name: ${data.get('motherName') || 'Not provided'}`,
    `Student's name: ${data.get('studentName') || 'Not provided'}`,
    `Grade of interest: ${data.get('grade') || 'Not provided'}`,
    `Additional note: ${data.get('note') || 'None'}`,
  ].join('\n');
};

// ─────────────────────────────────────────────
// Email / Gmail enquiry
// ─────────────────────────────────────────────

admissionForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  // Check required fields
  if (!admissionForm.reportValidity()) {
    return;
  }

  const body = getAdmissionMessage(admissionForm);

  const subject = encodeURIComponent('Admission Enquiry');
  const encodedBody = encodeURIComponent(body);

  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(SCHOOL_EMAIL)}` +
    `&su=${subject}` +
    `&body=${encodedBody}`;

  // Open Gmail compose
  window.location.href = gmailUrl;

  if (formStatus) {
    formStatus.textContent =
      'Opening Gmail with your enquiry. Please review and send the message.';
  }
});

// ─────────────────────────────────────────────
// WhatsApp enquiry
// ─────────────────────────────────────────────

whatsappFormButton?.addEventListener('click', () => {
  if (!admissionForm) {
    return;
  }

  // Check required fields
  if (!admissionForm.reportValidity()) {
    return;
  }

  const message = [
    getAdmissionMessage(admissionForm),
    '',
    'Please help me with the admission process.',
  ].join('\n');

  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}` +
    `?text=${encodeURIComponent(message)}`;

  // Open WhatsApp
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

  if (formStatus) {
    formStatus.textContent =
      'Opening WhatsApp with your enquiry for the School Office.';
  }
});