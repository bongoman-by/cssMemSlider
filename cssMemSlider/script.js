const carouselElem = document.querySelector(".carousel");
let width = window.getComputedStyle(
  carouselElem.querySelector(".carousel-inner")
).width;
let slideIndex = 0;
const slides = carouselElem.querySelectorAll(".carousel-item");
const slidesField = carouselElem.querySelector(".carousel-slides");
slidesField.style.width = 100 * slides.length + "%";
const dots = carouselElem.querySelectorAll(".carousel-indicators li");
const radios = carouselElem.querySelectorAll(".radio");
const h2Elem = carouselElem.querySelector("h2");

function carousel() {
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

    dot.addEventListener("touchstart", (e) => {
      document.body.style.setProperty(
        "--xy",
        e.changedTouches[0].clientX + "px " + e.changedTouches[0].clientY + "px"
      );
      document.body.classList.add("mouse-press");
      document.body.classList.remove("mouse-move");
    });

    dot.addEventListener("mouseup", (e) =>
      document.body.classList.remove("mouse-press")
    );

    dot.addEventListener("touchend", (e) => {
      document.body.classList.remove("mouse-press");
      if (e.target.children[0]) {
        e.target.children[0].classList.remove("hover");
      }
    });

    dot.addEventListener("touchcancel", (e) => {
      document.body.classList.remove("mouse-press");
      if (e.target.children[0]) {
        e.target.children[0].classList.remove("hover");
      }
    });

    dot.addEventListener("mousemove", (e) => {
      if (e.target.children[0]) {
        e.target.children[0].classList.add("hover");
      }
    });

    dot.addEventListener("touchmove", (e) => {
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
    document.body.classList.remove("mouse-move");
    document.body.classList.add("mouse-press");
  });

  h2Elem.addEventListener("touchmove", (e) => {
    document.body.style.setProperty(
      "--xy",
      e.changedTouches[0].clientX + "px " + e.changedTouches[0].clientY + "px"
    );
    document.body.classList.remove("mouse-move");
    document.body.classList.add("mouse-press");
  });

  h2Elem.addEventListener("mouseout", (e) =>
    document.body.classList.remove("mouse-press")
  );

  h2Elem.addEventListener("touchcancel", (e) =>
    document.body.classList.remove("mouse-press")
  );

  h2Elem.addEventListener("touchend", (e) =>
    document.body.classList.remove("mouse-press")
  );

  carouselElem.addEventListener("mousemove", (e) => {
    if (e.target.nodeName === "SPAN") {
      return;
    }

    document.body.style.setProperty(
      "--xy",
      e.clientX + "px " + e.clientY + "px"
    );
    document.body.classList.add("mouse-move");
  });

  carouselElem.addEventListener("touchmove", (e) => {
    if (e.target.nodeName === "SPAN") {
      return;
    }
    document.body.style.setProperty(
      "--xy",
      e.changedTouches[0].clientX + "px " + e.changedTouches[0].clientY + "px"
    );
    document.body.classList.add("mouse-move");
  });

  carouselElem.addEventListener("mouseout", (e) =>
    document.body.classList.remove("mouse-move")
  );

  carouselElem.addEventListener("touchcancel", (e) =>
    document.body.classList.remove("mouse-move")
  );

  carouselElem.addEventListener("touchend", (e) =>
    document.body.classList.remove("mouse-move")
  );

  carouselElem.addEventListener("mousedown", (e) =>
    document.body.classList.remove("mouse-move")
  );

  carouselElem.addEventListener("touchstart", (e) =>
    document.body.classList.remove("mouse-move")
  );

  carouselElem.addEventListener("mouseup", (e) => {
    if (e.target.nodeName === "SPAN") {
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
  carousel();
});

window.addEventListener("resize", () => {
  width = window.getComputedStyle(
    carouselElem.querySelector(".carousel-inner")
  ).width;
  offset = +width.replace(/\D/g, "") * slideIndex;
  slidesField.style.transform = `translateX(-${offset}px)`;
  carousel();
});
