"use strict";

/////////////////////////////////////////
// Mobile Navigation
const headerEl = document.querySelector(".header");
const navOpenEl = document.querySelector(".open-mobile-nav");
const navCloseEl = document.querySelector(".close-mobile-nav");

navOpenEl.addEventListener("click", function () {
  headerEl.classList.add("nav-open");
});

navCloseEl.addEventListener("click", function () {
  headerEl.classList.remove("nav-open");
});

/////////////////////////////////////////
// Sticky Navigation
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (!ent.isIntersecting) {
      document.body.classList.add("stick");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("stick");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-90px",
  }
);

obs.observe(sectionHeroEl);

/////////////////////////////////////////
// Fixing Flexbox In Safari
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

/////////////////////////////////////////
// Updating year
const year = document.querySelector(".year");
const currentYear = new Date().getFullYear();
year.textContent = currentYear;

/////////////////////////////////////////
// Select all necessary elements
const track = document.querySelector(".carousel-track");
const nextBtn = document.querySelector(".carousel-forward");
const prevBtn = document.querySelector(".carousel-backward");
const images = document.querySelectorAll(".carousel-img");
const totalImages = images.length;

// Initial setup
let currentIndex = 0;

// Initialize the carousel
function initCarousel() {
  // Set initial width and spacing
  calculateAndApplySizes();

  // Position all images initially
  positionImages();

  // Set up event listeners for navigation buttons
  nextBtn.addEventListener("click", handleNextClick);
  prevBtn.addEventListener("click", handlePrevClick);

  // Handle window resize
  window.addEventListener("resize", () => {
    calculateAndApplySizes();
    positionImages();
  });
}

// Calculate and apply sizes based on container width and screen size
function calculateAndApplySizes() {
  const containerWidth = track.parentElement.offsetWidth;
  const windowWidth = window.innerWidth;
  console.log(windowWidth);

  // Adjust image width and spacing based on screen size
  let imageWidth, spacing, centerScale;

  if (windowWidth <= 640) {
    // Mobile
    imageWidth = containerWidth * 0.45;
    spacing = containerWidth * 0.1;
    centerScale = 1.2;
  } else if (windowWidth <= 1024) {
    // Tablet
    imageWidth = containerWidth * 0.23;
    spacing = containerWidth * 0.05;
    centerScale = 1.2;
  } else {
    // Desktop
    imageWidth = containerWidth * 0.23;
    spacing = containerWidth * 0.04;
    centerScale = 1.2;
  }

  // Store these values as data attributes for use in positioning
  track.dataset.imageWidth = imageWidth;
  track.dataset.spacing = spacing;
  track.dataset.centerScale = centerScale;

  // Apply width to images
  images.forEach((img) => {
    img.style.width = `${imageWidth}px`;
  });
}

// Position all images based on the current index
function positionImages() {
  const containerWidth = track.parentElement.offsetWidth;
  const imageWidth = parseFloat(track.dataset.imageWidth);
  const spacing = parseFloat(track.dataset.spacing);
  const centerScale = parseFloat(track.dataset.centerScale);
  const totalWidth = imageWidth + spacing;

  images.forEach((img, index) => {
    // Calculate the relative position from current index
    let position = index - currentIndex;

    // Handle wrap-around for infinite scrolling effect
    if (position < -(totalImages / 2)) position += totalImages;
    if (position > totalImages / 2) position -= totalImages;

    // Calculate offset to center the active image
    const centerOffset = (containerWidth - imageWidth) / 2;

    // Position each image with spacing
    const xPos = position * totalWidth + centerOffset;
    img.style.transform = `translateX(${xPos}px)`;

    // Apply special styling to the center image
    if (position === 0) {
      // Center image is larger
      img.classList.add("active");
      img.style.transform = `translateX(${xPos}px) scale(${centerScale})`;
      img.style.zIndex = "5";

      // Tailwind classes for active image
      img.classList.add("opacity-100");
      img.classList.remove("opacity-70");
    } else {
      img.classList.remove("active");
      img.style.zIndex = "1";

      // Tailwind classes for non-active images
      img.classList.add("opacity-70");
      img.classList.remove("opacity-100");
    }
  });
}

// Handle next button click
function handleNextClick() {
  currentIndex = (currentIndex + 1) % totalImages;
  updateCarousel();
}

// Handle previous button click
function handlePrevClick() {
  currentIndex = (currentIndex - 1 + totalImages) % totalImages;
  updateCarousel();
}

// Update the carousel display
function updateCarousel() {
  positionImages();
}

// Initialize the carousel when the page loads
document.addEventListener("DOMContentLoaded", initCarousel);
