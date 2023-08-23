const upScrollBtnEl = document.querySelector(".upscroll-btn");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  scrollY > 300 ? scrollBtnOn(upScrollBtnEl) : scrollBtnOff(upScrollBtnEl);
});

function onScrollGalleryStart() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

function scrollBtnOff(upScrollBtnEl) {
  upScrollBtnEl.classList.add("visually-hidden");
}
function scrollBtnOn(upScrollBtnEl) {
  upScrollBtnEl.classList.remove("visually-hidden");
}

upScrollBtnEl.addEventListener("click", onScrollGalleryStart);
