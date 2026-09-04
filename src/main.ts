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
// Admission enquiry
// ─────────────────────────────────────────────

const admissionForm =
  document.querySelector<HTMLFormElement>('#admission-form');

const whatsappFormButton =
  document.querySelector<HTMLButtonElement>('#whatsapp-form');

const formStatus =
  document.querySelector<HTMLElement>('#form-status');

// School contact details
const SCHOOL_EMAIL = 'smsinghintercollege@gmail.com';

// Shivakant Shukla — Clerk / School Office
const WHATSAPP_NUMBER = '918318600789';

// ─────────────────────────────────────────────
// Get form data
// ─────────────────────────────────────────────

const getFormData = (form: HTMLFormElement) => {
  const data = new FormData(form);

  return {
    fatherName: String(data.get('fatherName') || 'Not provided'),
    motherName: String(data.get('motherName') || 'Not provided'),
    studentName: String(data.get('studentName') || 'Not provided'),
    grade: String(data.get('grade') || 'Not provided'),
    note: String(data.get('note') || 'None'),
  };
};

// ─────────────────────────────────────────────
// Gmail message
// ─────────────────────────────────────────────

const getEmailMessage = (form: HTMLFormElement): string => {
  const data = getFormData(form);

  return [
    'Admission Enquiry',
    '',
    `Father's Name: ${data.fatherName}`,
    `Mother's Name: ${data.motherName}`,
    `Student's Name: ${data.studentName}`,
    `Grade of Interest: ${data.grade}`,
    '',
    'Additional Note:',
    data.note,
    '',
    'Please help me with the admission process.',
    '',
    'Thank you.',
  ].join('\n');
};

// ─────────────────────────────────────────────
// WhatsApp message
// ─────────────────────────────────────────────

const getWhatsAppMessage = (form: HTMLFormElement): string => {
  const data = getFormData(form);

  return [
    '*ADMISSION ENQUIRY*',
    '',
    `*Father's Name:* ${data.fatherName}`,
    `*Mother's Name:* ${data.motherName}`,
    `*Student's Name:* ${data.studentName}`,
    `*Grade of Interest:* ${data.grade}`,
    '',
    `*Additional Note:*`,
    data.note,
    '',
    'Please help me with the admission process.',
    '',
    'Thank you.',
  ].join('\n');
};

// ─────────────────────────────────────────────
// Send enquiry through Gmail
// ─────────────────────────────────────────────

admissionForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!admissionForm.reportValidity()) {
    return;
  }

  const subject = encodeURIComponent('Admission Enquiry');
  const body = encodeURIComponent(getEmailMessage(admissionForm));

  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(SCHOOL_EMAIL)}` +
    `&su=${subject}` +
    `&body=${body}`;

  window.location.href = gmailUrl;

  if (formStatus) {
    formStatus.textContent =
      'Opening Gmail with your enquiry. Please review and send the message.';
  }
});

// ─────────────────────────────────────────────
// Send enquiry through WhatsApp
// ─────────────────────────────────────────────

whatsappFormButton?.addEventListener('click', () => {
  if (!admissionForm) {
    return;
  }

  if (!admissionForm.reportValidity()) {
    return;
  }

  const message = encodeURIComponent(
    getWhatsAppMessage(admissionForm)
  );

  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(
    whatsappUrl,
    '_blank',
    'noopener,noreferrer'
  );

  if (formStatus) {
    formStatus.textContent =
      'Opening WhatsApp with your enquiry for the School Office.';
  }
});