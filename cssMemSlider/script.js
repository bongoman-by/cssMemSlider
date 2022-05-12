const carouselElem = document.querySelector(".carousel");
let width = window.getComputedStyle(
  carouselElem.querySelector(".carousel-inner")
).width;
const slides = carouselElem.querySelectorAll(".carousel-item");
const slidesField = carouselElem.querySelector(".carousel-slides");
slidesField.style.width = 100 * slides.length + "%";
const dots = carouselElem.querySelectorAll(".carousel-indicators li");
const radios = carouselElem.querySelectorAll(".radio");
const h2Elem = carouselElem.querySelector("h2");
const spanElem = carouselElem.querySelector("span");
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
    dot.addEventListener("mouseup", (e) =>
      document.body.classList.remove("mouse-press")
    );
    dot.addEventListener("mousemove", (e) => {
      if (e.target.children[0]) {
        e.target.children[0].classList.add("hover");
      }
    });
    dot.addEventListener("mouseout", (e) => {
      if (e.target.children[0]) {
        e.target.children[0].classList.remove("hover");
      }
    });
  });

  h2Elem.addEventListener("mousemove", (e) => {
    document.body.style.setProperty(
      "--xy",
      e.clientX + "px " + e.clientY + "px"
    );
    document.body.classList.add("mouse-press");
  });
  h2Elem.addEventListener("mouseout", (e) =>
    document.body.classList.remove("mouse-press")
  );

  carouselElem.addEventListener("mousemove", (e) => {
    if (e.target === h2Elem) {
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
    if (e.target === h2Elem) {
      return;
    }
    document.body.classList.add("mouse-move");
  });
}

function getSlide(e) {
  let slideTo = "";
  if (e.target.children[0]) {
    slideTo = e.target.children[0].getAttribute("data-slide-to");
    h2Elem.innerHTML = `<span>${e.target.children[0].getAttribute(
      "data-description"
    )}</span>`;
  } else {
    slideTo = e.target.getAttribute("data-slide-to");
    h2Elem.innerHTML = `<span>${e.target.getAttribute(
      "data-description"
    )}</span>`;
  }

  slideIndex = +slideTo;
  offset = +width.replace(/\D/g, "") * slideTo;

  slidesField.style.transform = `translateX(-${offset}px)`;
  radios.forEach((radio) => radio.classList.remove("active"));
  if (e.target.children[0]) {
    e.target.children[0].classList.add("active");
  } else {
    e.target.classList.add("active");
  }
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
