const header = document.querySelector("[data-header]");
const surveyForm = document.querySelector("#surveyForm");
const contactForm = document.querySelector("#contactForm");
const surveyMessage = document.querySelector("[data-survey-message]");
const contactMessage = document.querySelector("[data-contact-message]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
};

const saveForm = (key, form) => {
  const data = Object.fromEntries(new FormData(form).entries());
  data.createdAt = new Date().toISOString();
  localStorage.setItem(key, JSON.stringify(data));
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href")?.slice(1);
    const target = targetId ? document.getElementById(targetId) : null;

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

surveyForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  saveForm("studybuddySurvey", surveyForm);
  surveyMessage.textContent = "Спасибо! Ответ сохранен в браузере.";
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  saveForm("studybuddyContactRequest", contactForm);
  contactForm.reset();
  contactMessage.textContent = "Заявка сохранена. Спасибо за интерес к StudyBuddy!";
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
