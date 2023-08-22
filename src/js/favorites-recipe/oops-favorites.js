function oopsMarkup() {
  const sectionFavEl = document.querySelector('.favorites');

  const markup = `<div class="fav-oops-wrap visually-hidden">
                    <svg aria-label="oops-toque" class="fav-card-toque icon" viewBox="0 0 38 32">
                        <path
                        fill="#9bb537"
                        style="fill: var(--color1, #9bb537)"
                        d="M7.172 12.69h23.172v17.655h-23.172v-17.655z"
                        ></path>
                        <path
                        fill="#9bb537"
                        style="fill: var(--color1, #9bb537)"
                        d="M16.552 11.586c0 4.571-3.705 8.276-8.276 8.276s-8.276-3.705-8.276-8.276c0-4.571 3.705-8.276 8.276-8.276s8.276 3.705 8.276 8.276z"
                        ></path>
                        <path
                        fill="#9bb537"
                        style="fill: var(--color1, #9bb537)"
                        d="M27.034 8.276c0 4.571-3.705 8.276-8.276 8.276s-8.276-3.705-8.276-8.276c0-4.571 3.705-8.276 8.276-8.276s8.276 3.705 8.276 8.276z"
                        ></path>
                        <path
                        fill="#9bb537"
                        style="fill: var(--color1, #9bb537)"
                        d="M37.517 11.586c0 4.571-3.705 8.276-8.276 8.276s-8.276-3.705-8.276-8.276c0-4.571 3.705-8.276 8.276-8.276s8.276 3.705 8.276 8.276z"
                        ></path>
                        <path
                        fill="#9bb537"
                        style="fill: var(--color1, #9bb537)"
                        d="M7.172 29.241h23.172v2.081c0 0.374-0.324 0.678-0.724 0.678h-21.724c-0.4 0-0.724-0.303-0.724-0.678v-2.081z"
                        ></path>
                        <path
                        fill="#f8f8f8"
                        style="fill: var(--color2, #f8f8f8)"
                        d="M14.345 10.463c0-0.598 0.371-1.084 0.828-1.084s0.828 0.485 0.828 1.084v5.005c0 0.598-0.371 1.084-0.828 1.084s-0.828-0.485-0.828-1.084v-5.005z"
                        ></path>
                        <path
                        fill="#f8f8f8"
                        style="fill: var(--color2, #f8f8f8)"
                        d="M17.103 10.463c0-0.598 0.618-1.084 1.379-1.084s1.379 0.485 1.379 1.084v5.005c0 0.598-0.618 1.084-1.379 1.084s-1.379-0.485-1.379-1.084v-5.005z"
                        ></path>
                        <path
                        fill="#f8f8f8"
                        style="fill: var(--color2, #f8f8f8)"
                        d="M20.966 10.463c0-0.598 0.494-1.084 1.103-1.084s1.103 0.485 1.103 1.084v5.005c0 0.598-0.494 1.084-1.103 1.084s-1.103-0.485-1.103-1.084v-5.005z"
                        ></path>
                        <path
                        fill="#050505"
                        style="fill: var(--color3, #050505)"
                        d="M28.264 3.367c0.321-0.038 0.647-0.057 0.977-0.057 3.603 0 6.668 2.302 7.805 5.516-0.303 0.033-0.612 0.050-0.924 0.050-3.626 0-6.711-2.299-7.858-5.51z"
                        ></path>
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
