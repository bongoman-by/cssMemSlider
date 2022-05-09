const carouselElem = document.querySelector(".carousel");
let width = window.getComputedStyle(
  carouselElem.querySelector(".carousel-inner")
).width;
const slides = carouselElem.querySelectorAll(".carousel-item");
const slidesField = carouselElem.querySelector(".carousel-slides");
slidesField.style.width = 100 * slides.length + "%";
const dots = carouselElem.querySelectorAll(".carousel-indicators li");
const description = carouselElem.querySelector("h1");
let slideIndex = 0;

function Carousel() {
  slides.forEach((slide) => {
    slide.style.width = width;
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", getSlide);
    dot.addEventListener("mousedown", (e) => {
      document.body.style.setProperty(
        "--xy",
        e.clientX + "px " + e.clientY + "px"
      );
      document.body.classList.add("mouse-press");
    });
    dot.addEventListener("mouseup", (e) =>
      document.body.classList.remove("mouse-press")
    );
  });

  description.addEventListener("mousemove", (e) => {
    document.body.style.setProperty(
      "--xy",
      e.clientX + "px " + e.clientY + "px"
    );
    document.body.classList.add("mouse-press");
  });
  description.addEventListener("mouseout", (e) =>
    document.body.classList.remove("mouse-press")
  );

  carouselElem.addEventListener("mousemove", (e) => {
    if (e.target === description) {
      return;
    }
    document.body.style.setProperty(
      "--xy",
      e.clientX + "px " + e.clientY + "px"
    );
    document.body.classList.add("mouse-move");
  });
  carouselElem.addEventListener("mouseout", (e) =>
    document.body.classList.remove("mouse-move")
  );
  carouselElem.addEventListener("mousedown", (e) =>
    document.body.classList.remove("mouse-move")
  );
  carouselElem.addEventListener("mouseup", (e) => {
    if (e.target === description) {
      return;
    }
    document.body.classList.add("mouse-move");
  });
}

function getSlide(e) {
  const slideTo = e.target.getAttribute("data-slide-to");
  description.textContent = e.target.getAttribute("data-description");

  slideIndex = +slideTo;
  offset = +width.replace(/\D/g, "") * slideTo;

  slidesField.style.transform = `translateX(-${offset}px)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");
}

window.addEventListener("DOMContentLoaded", () => {
  Carousel();
});

window.addEventListener("resize", () => {
  width = window.getComputedStyle(
    carouselElem.querySelector(".carousel-inner")
  ).width;
  offset = +width.replace(/\D/g, "") * slideIndex;
  slidesField.style.transform = `translateX(-${offset}px)`;
  Carousel();
});
