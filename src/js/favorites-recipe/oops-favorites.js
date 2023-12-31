function oopsMarkup() {
  const sectionFavEl = document.querySelector('.favorites');

  const markup = `<div class="fav-oops-wrap visually-hidden">
                    <svg aria-label="oops-toque" class="fav-card-toque icon" viewBox="0 0 37 32">                    
                      <path fill="#9bb537" style="fill: var(--color1, #9bb537)" d="M7.325 12.723h23.133v17.735h-23.133v-17.735z"></path>
                      <path fill="#9bb537" style="fill: var(--color1, #9bb537)" d="M16.578 11.373c0 4.578-3.711 8.289-8.289 8.289s-8.289-3.711-8.289-8.289c0-4.578 3.711-8.289 8.289-8.289s8.289 3.711 8.289 8.289z"></path>
                      <path fill="#9bb537" style="fill: var(--color1, #9bb537)" d="M26.988 8.289c0 4.578-3.711 8.289-8.289 8.289s-8.289-3.711-8.289-8.289c0-4.578 3.711-8.289 8.289-8.289s8.289 3.711 8.289 8.289z"></path>
                      <path fill="#9bb537" style="fill: var(--color1, #9bb537)" d="M37.398 11.373c0 4.578-3.711 8.289-8.289 8.289s-8.289-3.711-8.289-8.289c0-4.578 3.711-8.289 8.289-8.289s8.289 3.711 8.289 8.289z"></path>
                      <path fill="#fff" style="fill: var(--color2, #fff)" d="M7.325 29.301h23.133v2.036c0 0.366-0.324 0.663-0.723 0.663h-21.687c-0.399 0-0.723-0.297-0.723-0.663v-2.036z"></path>
                      <path fill="#fff" style="fill: var(--color2, #fff)" d="M14.265 10.36c0-0.611 0.432-1.107 0.964-1.107s0.964 0.495 0.964 1.107v5.112c0 0.611-0.432 1.107-0.964 1.107s-0.964-0.495-0.964-1.107v-5.112z"></path>
                      <path fill="#fff" style="fill: var(--color2, #fff)" d="M17.349 10.36c0-0.611 0.604-1.107 1.349-1.107s1.349 0.495 1.349 1.107v5.112c0 0.611-0.604 1.107-1.349 1.107s-1.349-0.495-1.349-1.107v-5.112z"></path>
                      <path fill="#fff" style="fill: var(--color2, #fff)" d="M21.205 10.36c0-0.611 0.432-1.107 0.964-1.107s0.964 0.495 0.964 1.107v5.112c0 0.611-0.432 1.107-0.964 1.107s-0.964-0.495-0.964-1.107v-5.112z"></path>
                      <path fill="#050505" style="fill: var(--color3, #050505)" d="M28.184 3.131c0.289-0.030 0.581-0.045 0.878-0.045 3.714 0 6.861 2.413 7.938 5.746-0.289 0.030-0.581 0.045-0.878 0.045-3.714 0-6.861-2.413-7.938-5.746z"></path>
                    </svg>
                    <p class="fav-oops-text">
                        It appears that you haven't added any recipes to your favorites yet. To get
                        started, you can add recipes that you like to your favorites for easier
                        access in the future.
                    </p>
                  </div>`;
  sectionFavEl.insertAdjacentHTML('beforeend', markup);
  const oopsWrapEl = document.querySelector('.fav-oops-wrap');
  return oopsWrapEl;
}

export const oopsDivEl = oopsMarkup();
