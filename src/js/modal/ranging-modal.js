import svg from '../../svg/symbol-defs.svg';

//функции для создания графической шкалы рейтинга (звездной шкалы) на основе предоставленного значения рейтинга.
export function measureRating(position, rating) {
  if (position <= rating) {
    return 'rate-item-active';
  }
  return 'rate-item';
}

export function ratingScale(rating) {
  return `<ul class='rate-list'>
             <li class=${measureRating(1, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${svg}#star'></use>
              </svg>
            </li>
            <li class=${measureRating(2, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${svg}#star'></use>
              </svg>
            </li>
            <li class=${measureRating(3, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${svg}#star'></use>
              </svg>
            </li>
            <li class=${measureRating(4, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${svg}#star'></use>
              </svg>
            </li>
            <li class=${measureRating(5, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${svg}#star'></use>
              </svg>
            </li>
          </ul>`;
}
