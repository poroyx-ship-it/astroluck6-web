"use strict";

const toggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".site-nav");

function closeNavigation() {
  if (!toggle || !navigation) return;
  toggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
}

if (toggle && navigation) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("open", !isOpen);
  });
  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNavigation();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });
}

const stars = document.getElementById("stars");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (stars) {
  // A fixed seed keeps the composition stable across visits and screenshots.
  let seed = 90617;
  const next = () => {
    seed = (seed * 48271) % 2147483647;
    return seed / 2147483647;
  };
  for (let index = 0; index < 58; index += 1) {
    const star = document.createElement("i");
    const size = next() > 0.9 ? 2.5 : 1.25;
    star.className = "star";
    star.style.left = `${next() * 100}%`;
    star.style.top = `${next() * 100}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.setProperty("--d", `${3.2 + next() * 5}s`);
    star.style.animationDelay = `${next() * 5}s`;
    stars.appendChild(star);
  }
}

const reveals = document.querySelectorAll(".reveal");
if (reveals.length > 0) {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    reveals.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      observer.observe(element);
    });
  }
}

const header = document.getElementById("siteHeader");
const progress = document.getElementById("scrollProgress");
if (header || progress) {
  let scrollFrame = null;
  const updateScrollUi = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 28);
    if (progress) {
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${maximum > 0 ? (window.scrollY / maximum) * 100 : 0}%`;
    }
    scrollFrame = null;
  };
  window.addEventListener("scroll", () => {
    if (scrollFrame === null) scrollFrame = window.requestAnimationFrame(updateScrollUi);
  }, { passive: true });
  updateScrollUi();
}

const stage = document.getElementById("heroStage");
const phone = document.getElementById("phoneMockup");
if (
  stage &&
  phone &&
  !reduceMotion &&
  window.matchMedia("(pointer: fine) and (min-width: 701px)").matches
) {
  stage.addEventListener("pointermove", (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    phone.style.transform = `rotate(-2.3deg) rotateY(${x * 4}deg) rotateX(${-y * 3}deg) translate(${x * 4}px, ${y * 3}px)`;
  });
  stage.addEventListener("pointerleave", () => {
    phone.style.transform = "rotate(-2.3deg)";
  });
}
