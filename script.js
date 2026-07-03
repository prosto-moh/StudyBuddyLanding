const header = document.querySelector("[data-header]");
const surveyForm = document.querySelector("#surveyForm");
const contactForm = document.querySelector("#contactForm");
const surveyMessage = document.querySelector("[data-survey-message]");
const contactMessage = document.querySelector("[data-contact-message]");

const trackEvent = (eventName, parameters = {}) => {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, parameters);
};

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

    if (link.dataset.scrollTarget === "idea") {
      trackEvent("try_free_click", {
        target_section: targetId,
      });
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll('a[href*="t.me/prosto_m0h"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackEvent("telegram_click", {
      link_url: link.href,
      link_text: link.textContent.trim(),
    });
  });
});

surveyForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  saveForm("studybuddySurvey", surveyForm);
  const data = Object.fromEntries(new FormData(surveyForm).entries());
  trackEvent("survey_submit", {
    use_service: data.useService,
    subscription_price: data.price,
  });
  surveyMessage.textContent = "Спасибо! Ответ сохранен в браузере.";
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  saveForm("studybuddyContactRequest", contactForm);
  trackEvent("contact_submit", {
    form_name: "early_access",
  });
  contactForm.reset();
  contactMessage.textContent = "Заявка сохранена. Спасибо за интерес к StudyBuddy!";
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
