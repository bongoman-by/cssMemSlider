const carouselElem = document.querySelector(".carousel");
const width = window.getComputedStyle(
  carouselElem.querySelector(".carousel-inner")
).width;
const slides = carouselElem.querySelectorAll(".carousel-item");
const slidesField = carouselElem.querySelector(".carousel-slides");
slidesField.style.width = 100 * slides.length + "%";
const dots = carouselElem.querySelectorAll(".carousel-indicators li");
const description = carouselElem.querySelector("h1");

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
}

function getSlide(e) {
  const slideTo = e.target.getAttribute("data-slide-to");

  slideIndex = slideTo;
  offset = +width.replace(/\D/g, "") * slideTo;

  slidesField.style.transform = `translateX(-${offset}px)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[slideIndex].classList.add("active");
}

window.addEventListener("DOMContentLoaded", () => {
  Carousel();
});
