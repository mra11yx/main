const slider = document.querySelector(".pizza-slider");
const thumb = slider.querySelector(".thumb");

function getVal() {
  return {
    curr: slider.getAttribute("aria-valuenow"),
    fraction: slider.getAttribute("aria-valuenow") /
      slider.getAttribute("aria-valuemax")
  };
}

function calculatePos() {
  const sliderWidth = slider.getBoundingClientRect().width;
  const thumbWidth = thumb.getBoundingClientRect().width;
  thumb.style.left =
    parseFloat(sliderWidth * getVal().fraction - thumbWidth / 2) + "px";
}

function incDec(el, valueToSet) {
  let now = parseInt(el.ariaValueNow);
  let min = parseInt(el.ariaValueMin);
  let max = parseInt(el.ariaValueMax);
  console.log("now: " + now + "\nmin: " + min + "\nmax: " + max);
  console.log("less than or equal to max? ", now <= max);

  console.log("greater than or equal to min? ", now >= min);
  if (valueToSet >= min && valueToSet <= max) {
    console.log("Between required values");
    el.ariaValueNow = valueToSet;
  }
  let pluralVersion;
  if (valueToSet === 1) {
    pluralVersion = el.dataset.thing;
  } else {
    pluralVersion = el.dataset.thing + "s";
  }
  el.ariaValueText = el.ariaValueNow + " " + pluralVersion;

  el.querySelector(".thumb").innerText = el.ariaValueNow;
  calculatePos();
}
/* 
slider.addEventListener("keydown", function(evt) {
  document.getElementById("action").innerText = evt.type;
  switch (evt.key) {
    case "ArrowDown":
      evt.preventDefault();
      incDec(evt.target, "decrement");
      break;
    case "ArrowUp":
      evt.preventDefault();
      incDec(evt.target, "increment");
      break;
  }
}); */

slider.addEventListener("accessiblefocus", function (evt) {
  document.getElementById("focused").innerText =
    "Element with role: " + evt.target.role;
  document.getElementById("action").innerText = evt.type;
});

  slider.addEventListener("accessibleincrement", function (evt) {
    document.getElementById("action").innerText = evt.type;
    incDec(slider, parseInt(slider.ariaValueNow) + 1);
  });

  slider.addEventListener("accessibledecrement", function (evt) {
    document.getElementById("action").innerText = evt.type;
    incDec(slider, parseInt(slider.ariaValueNow) - 1);
  });