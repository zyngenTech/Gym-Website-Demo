(function () {
  "use strict";

  const cfg = window.SITE_CONFIG;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), cfg);
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  /* ---------- Responsive images ---------- */
  // Unsplash resizes on the fly via ?w=, so build a srcset and let the browser pick
  // the smallest file that fills the slot. Other image hosts are used as-is.
  const isUnsplash = (url) => /^https:\/\/images\.unsplash\.com\//.test(url);
  const resized = (url, w) => {
    const u = new URL(url);
    u.searchParams.set("w", w);
    return u.href;
  };
  const srcset = (url, widths) => (isUnsplash(url) ? widths.map((w) => `${resized(url, w)} ${w}w`).join(", ") : "");
  const img = (url, widths, sizes, alt, w, h) => {
    const set = srcset(url, widths);
    const src = isUnsplash(url) ? resized(url, widths[Math.floor(widths.length / 2)]) : url;
    return `<img src="${esc(src)}"${set ? ` srcset="${esc(set)}" sizes="${sizes}"` : ""} alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async">`;
  };
  const SOCIAL_LABELS = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" };

  /* ---------- Icons (inline SVG, stroke = currentColor) ---------- */
  const svg = (paths) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  const ICONS = {
    dumbbell: svg('<path d="M6.5 6.5v11M17.5 6.5v11M3 9v6M21 9v6M6.5 12h11"/>'),
    flame: svg('<path d="M12 22c4 0 7-3 7-7 0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-2 2-5 5-5 8 0 4 3 7 7 7z"/>'),
    glove: svg('<path d="M7 11V7a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4v6a5 5 0 0 1-5 5H9a2 2 0 0 1-2-2v-1"/><path d="M7 11H5.5a2.5 2.5 0 0 0 0 5H7M7 21h9"/>'),
    lotus: svg('<path d="M12 20c-4 0-8-2-9-6 3 0 6 1 9 4 3-3 6-4 9-4-1 4-5 6-9 6z"/><path d="M12 18c-2-2-3-5-3-8 1-3 2-5 3-6 1 1 2 3 3 6 0 3-1 6-3 8z"/>'),
    check: svg('<path d="M20 6 9 17l-5-5"/>'),
    pin: svg('<path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>'),
    phone: svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
    mail: svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>'),
    clock: svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    instagram: svg('<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/>'),
    facebook: svg('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'),
    tiktok: svg('<path d="M16 3a5 5 0 0 0 5 5v4a9 9 0 0 1-5-1.5V16a6 6 0 1 1-6-6v4a2 2 0 1 0 2 2V3z"/>'),
    quote: svg('<path d="M3 21c3 0 7-1 7-8V5H3v8h4c0 4-2 5-4 5zM14 21c3 0 7-1 7-8V5h-7v8h4c0 4-2 5-4 5z"/>'),
  };

  /* ---------- Brand + simple text bindings ---------- */
  function applyBindings() {
    if (cfg.brand.accent) document.documentElement.style.setProperty("--accent", cfg.brand.accent);
    document.title = `${cfg.brand.name} ${cfg.brand.suffix} | ${cfg.brand.tagline}`;

    $$("[data-bind]").forEach((el) => {
      const v = get(el.dataset.bind);
      if (v != null) el.textContent = v;
    });
    $$("[data-bind-html]").forEach((el) => {
      const v = get(el.dataset.bindHtml);
      if (v != null) el.innerHTML = v; // trusted, owner-authored config
    });
    $$("[data-icon]").forEach((el) => (el.innerHTML = ICONS[el.dataset.icon] || ""));

    $("#year").textContent = new Date().getFullYear();
    const hero = $("#hero-img");
    if (cfg.hero.image && cfg.hero.image !== hero.dataset.src) {
      hero.srcset = srcset(cfg.hero.image, [640, 960, 1280, 1600, 2000]);
      hero.src = isUnsplash(cfg.hero.image) ? resized(cfg.hero.image, 1600) : cfg.hero.image;
    }
  }

  /* ---------- Section renderers ---------- */
  /* ---------- Structured data (Google rich results for a local gym) ---------- */
  function renderStructuredData() {
    const c = cfg.contact;
    const data = {
      "@context": "https://schema.org",
      "@type": "ExerciseGym",
      name: `${cfg.brand.name} ${cfg.brand.suffix}`,
      description: cfg.hero.subtitle,
      image: isUnsplash(cfg.hero.image) ? resized(cfg.hero.image, 1200) : cfg.hero.image,
      telephone: c.phone,
      email: c.email,
      address: c.address,
      priceRange: `${cfg.pricing.currency}${Math.min(...cfg.pricing.plans.map((p) => p.annual))}-${cfg.pricing.currency}${Math.max(
        ...cfg.pricing.plans.map((p) => p.monthly)
      )}/mo`,
    };
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
  }

  function renderHeroStats() {
    $("#hero-stats").innerHTML = cfg.hero.stats
      .map((s) => `<li><strong>${esc(s.value)}</strong><span>${esc(s.label)}</span></li>`)
      .join("");
  }

  function renderPrograms() {
    $("#programs-grid").innerHTML = cfg.programs
      .map(
        (p, i) => `
        <article class="program reveal" style="--delay:${i * 80}ms">
          <div class="program__media">${img(p.image, [400, 600, 800, 1000], "(min-width: 1240px) 290px, (min-width: 600px) 50vw, 100vw", p.imageAlt || p.title, 600, 840)}</div>
          <div class="program__body">
            <span class="program__icon">${ICONS[p.icon] || ""}</span>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.text)}</p>
          </div>
        </article>`
      )
      .join("");
  }

  function renderPricing(annual) {
    const { currency, plans } = cfg.pricing;
    $("#pricing-grid").innerHTML = plans
      .map((p, i) => {
        const price = annual ? p.annual : p.monthly;
        const billed = annual ? `Billed ${currency}${p.annual * 12} yearly` : "Billed monthly";
        return `
        <article class="plan reveal${p.featured ? " plan--featured" : ""}" style="--delay:${i * 80}ms">
          ${p.badge ? `<span class="plan__badge">${esc(p.badge)}</span>` : ""}
          <h3 class="plan__name">${esc(p.name)}</h3>
          <p class="plan__desc">${esc(p.description)}</p>
          <p class="plan__price"><span class="plan__currency">${esc(currency)}</span><span class="plan__amount">${price}</span><span class="plan__period">/mo</span></p>
          <p class="plan__billed">${billed}</p>
          <ul class="plan__features">
            ${p.features.map((f) => `<li>${ICONS.check}<span>${esc(f)}</span></li>`).join("")}
          </ul>
          <a href="#trial" class="btn ${p.featured ? "btn--primary" : "btn--outline"} btn--block" data-plan="${esc(p.name)}">${esc(p.cta)}</a>
        </article>`;
      })
      .join("");
  }

  function initPricingToggle() {
    const sw = $("#billing-switch");
    $("#annual-note").textContent = cfg.pricing.annualNote;
    const set = (annual) => {
      sw.setAttribute("aria-checked", String(annual));
      $("#label-monthly").classList.toggle("is-active", !annual);
      $("#label-annual").classList.toggle("is-active", annual);
      renderPricing(annual);
      $$("#pricing-grid .reveal").forEach((el) => el.classList.add("is-visible"));
    };
    sw.addEventListener("click", () => set(sw.getAttribute("aria-checked") !== "true"));
    $("#label-monthly").addEventListener("click", () => set(false));
    $("#label-annual").addEventListener("click", () => set(true));
    renderPricing(false);
    $("#label-monthly").classList.add("is-active");
  }

  function renderTrainers() {
    $("#trainers-grid").innerHTML = cfg.trainers
      .map(
        (t, i) => `
        <article class="trainer reveal" style="--delay:${i * 80}ms">
          <div class="trainer__media">
            ${img(t.image, [360, 540, 720], "(min-width: 1240px) 290px, (min-width: 560px) 50vw, 100vw", `Portrait of ${t.name}`, 540, 675)}
            <a class="trainer__social" href="${esc(t.instagram)}" aria-label="${esc(t.name)} on Instagram">${ICONS.instagram}</a>
          </div>
          <div class="trainer__body">
            <h3>${esc(t.name)}</h3>
            <p class="trainer__role">${esc(t.role)}</p>
            <p class="trainer__bio">${esc(t.bio)}</p>
          </div>
        </article>`
      )
      .join("");
  }

  function renderTestimonials() {
    $("#testimonials-grid").innerHTML = cfg.testimonials
      .map(
        (t, i) => `
        <figure class="testimonial reveal" style="--delay:${i * 80}ms">
          <span class="testimonial__icon">${ICONS.quote}</span>
          <div class="testimonial__stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
          <blockquote>${esc(t.quote)}</blockquote>
          <figcaption><strong>${esc(t.name)}</strong><span>${esc(t.detail)}</span></figcaption>
        </figure>`
      )
      .join("");
  }

  /* ---------- Schedule (day tabs) ---------- */
  function initSchedule() {
    const days = Object.keys(cfg.schedule);
    const tabs = $("#schedule-tabs");
    const panel = $("#schedule-panel");
    const todayIdx = (new Date().getDay() + 6) % 7; // Mon = 0
    const today = days[todayIdx] || days[0];

    tabs.innerHTML = days
      .map(
        (d) =>
          `<button role="tab" id="tab-${d}" aria-controls="schedule-panel" aria-selected="false" tabindex="-1" data-day="${d}">${d}${
            d === today ? '<span class="schedule__today">Today</span>' : ""
          }</button>`
      )
      .join("");

    const endTime = (t, mins) => {
      const [h, m] = t.split(":").map(Number);
      const total = h * 60 + m + mins;
      return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
    };

    const calm = matchMedia("(prefers-reduced-motion: reduce)");
    const select = (day, focus, animate = true) => {
      $$("[role=tab]", tabs).forEach((b) => {
        const on = b.dataset.day === day;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        if (on && focus) b.focus();
      });
      panel.setAttribute("aria-labelledby", `tab-${day}`);
      const classes = cfg.schedule[day] || [];
      panel.innerHTML = classes.length
        ? `<ul class="classes">${classes
            .map(
              (c) => `
            <li class="class-row">
              <span class="class-row__time">${ICONS.clock}${esc(c.time)}<small>– ${endTime(c.time, c.duration)}</small></span>
              <span class="class-row__name">${esc(c.name)}</span>
              <span class="class-row__coach">with ${esc(c.coach)}</span>
              <a href="#trial" class="btn btn--outline btn--sm">Book</a>
            </li>`
            )
            .join("")}</ul>`
        : `<p class="classes__empty">No classes scheduled. Open gym all day.</p>`;
      if (animate && !calm.matches && panel.animate) {
        panel.animate(
          [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }],
          { duration: 450, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
        );
      }
    };

    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest("[role=tab]");
      if (btn) select(btn.dataset.day);
    });
    tabs.addEventListener("keydown", (e) => {
      const idx = days.indexOf(document.activeElement.dataset.day);
      if (idx < 0) return;
      let next = null;
      if (e.key === "ArrowRight") next = (idx + 1) % days.length;
      if (e.key === "ArrowLeft") next = (idx - 1 + days.length) % days.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = days.length - 1;
      if (next !== null) {
        e.preventDefault();
        select(days[next], true);
      }
    });
    select(today, false, false);
  }

  /* ---------- Contact ---------- */
  function renderContact() {
    const c = cfg.contact;
    $("#contact-phone").href = `tel:${c.phone.replace(/[^\d+]/g, "")}`;
    $("#contact-email").href = `mailto:${c.email}`;
    $("#hours").innerHTML = c.hours.map((h) => `<div><dt>${esc(h.days)}</dt><dd>${esc(h.time)}</dd></div>`).join("");
    $("#map").src = `https://maps.google.com/maps?q=${encodeURIComponent(c.mapQuery || c.address)}&z=15&output=embed`;
    $("#social").innerHTML = Object.entries(c.social)
      .map(([k, url]) => `<a href="${esc(url)}" aria-label="${esc(SOCIAL_LABELS[k] || k)}">${ICONS[k] || ""}</a>`)
      .join("");
  }

  /* ---------- Nav: sticky state, mobile menu, active link ---------- */
  function initNav() {
    const nav = $("#nav");
    const toggle = $("#nav-toggle");
    const menu = $("#nav-menu");

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
    requestAnimationFrame(onScroll); // after first layout, so reading scrollY doesn't force a reflow
    window.addEventListener("scroll", onScroll, { passive: true });

    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("no-scroll", open);
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    menu.addEventListener("click", (e) => e.target.closest("a") && setOpen(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
    window.matchMedia("(min-width: 900px)").addEventListener("change", (e) => e.matches && setOpen(false));

    const links = $$(".nav__links a");
    const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ---------- Trial form (native constraint validation) ---------- */
  function initForm() {
    const form = $("#trial-form");
    const date = $("#f-date");
    const goal = $("#f-goal");
    const todayISO = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    date.min = todayISO;

    // Picking a plan pre-fills the goal hint in the success message.
    let chosenPlan = "";
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-plan]");
      if (a) chosenPlan = a.dataset.plan;
    });

    const messageFor = (input) => {
      const v = input.validity;
      if (v.valueMissing) return input.type === "checkbox" ? "Please tick this box to continue." : "This field is required.";
      if (v.typeMismatch && input.type === "email") return "Enter a valid email address.";
      if (v.patternMismatch && input.type === "tel") return "Enter a valid phone number.";
      if (v.tooShort) return `Please enter at least ${input.minLength} characters.`;
      if (v.rangeUnderflow) return "Choose today or a later date.";
      return input.validationMessage;
    };

    const showError = (input) => {
      const field = input.closest(".field");
      const err = field && $(".field__error", field);
      const ok = input.checkValidity();
      input.setAttribute("aria-invalid", String(!ok));
      if (field) field.classList.toggle("has-error", !ok);
      if (err) err.textContent = ok ? "" : messageFor(input);
      if (!field) input.closest(".consent")?.classList.toggle("has-error", !ok);
      return ok;
    };

    const inputs = $$("input, select", form);
    inputs.forEach((input) => {
      input.addEventListener("blur", () => input.dataset.touched && showError(input));
      input.addEventListener("input", () => {
        input.dataset.touched = "1";
        if (input.getAttribute("aria-invalid") === "true") showError(input);
      });
      input.addEventListener("change", () => {
        input.dataset.touched = "1";
        showError(input);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const results = inputs.map((i) => {
        i.dataset.touched = "1";
        return showError(i);
      });
      const firstBad = inputs[results.indexOf(false)];
      if (firstBad) {
        firstBad.focus();
        return;
      }
      // Demo only: no backend. Swap this block for a fetch() to your form service.
      const name = $("#f-name").value.trim().split(" ")[0];
      $("#form-success-text").textContent = `Thanks ${name}! We'll call you within 24 hours to book your first session${
        chosenPlan ? ` and talk through the ${chosenPlan} plan` : ""
      }.`;
      const success = $("#form-success");
      success.hidden = false;
      form.classList.add("is-submitted");
      form.reset();
      inputs.forEach((i) => {
        delete i.dataset.touched;
        i.removeAttribute("aria-invalid");
      });
      goal.selectedIndex = 0;
      success.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  /* ---------- Boot ---------- */
  applyBindings();
  renderStructuredData();
  renderHeroStats();
  renderPrograms();
  initPricingToggle();
  renderTrainers();
  renderTestimonials();
  initSchedule();
  renderContact();
  initNav();
  initForm();
  initReveal();
})();
