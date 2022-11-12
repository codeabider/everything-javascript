// TODO: separate rendering and business logic into modules/ files
import { copyDeep } from '../utils/copyDeep.js';

const FAKE_URL = 'http://localhost:3000/cards';
const IMG_BASE_URL =
  'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill';

const restaurantsListElem = document.getElementById('restaurant-list');
const errorElem = document.getElementById('error');
const loaderElem = document.getElementById('loader');
const searchInputElem = document.getElementById('search-input');
const sortActionsElem = document.getElementById('sort-actions');
const filterActionsElem = document.getElementById('filter-actions');
const clearFiltersElem = document.getElementById('clear');

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const fetchRestaurants = async () => {
  const restaurants = await fetchData(FAKE_URL);
  setFetchedData(restaurants);

  try {
    renderCards(restaurants, restaurantsListElem);
  } catch (err) {
    renderErrorSection(err, errorElem);
  } finally {
    hideLoader(loaderElem);
  }
};

const hideLoader = (loaderElem) => {
  loaderElem.classList.add('hidden');
};

const setFetchedData = (data) => {
  window.data = copyDeep(data);
};

const getFetchedData = () => copyDeep(window.data);

/* TODO:
    1. implement virtual scrolling
    2. (skeleton?) loader
    3. error handling
    4. card states for unservicable
    5. add go to top
    6. add fav
    7. click to show menu/ add items to cart
    8. implement cart
    9. implement filter & sort criterion
*/

const clearDOM = (elem) => {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
};

const renderCards = (cardsData, containerElem) => {
  const cardElems = cardsData.map((card) => {
    const {
      address,
      avgRating,
      cloudinaryImageId,
      costForTwoString,
      cuisines,
      name,
      sla,
      totalRatings,
    } = card.data.data;

    const cardElem = document.createElement('div');
    cardElem.className = 'card';

    const cardTitle = document.createElement('h4');
    cardTitle.className = 'card__title';
    cardTitle.innerText = name;

    const cardDescription = document.createElement('p');
    cardDescription.className = 'card__desc';
    cardDescription.innerText = address;

    const cardImg = document.createElement('img');
    cardImg.className = 'card__img';
    cardImg.src = `${IMG_BASE_URL}/${cloudinaryImageId}`;

    const infoSection = document.createElement('div');
    infoSection.className = 'card__info';

    const eta = document.createElement('span');
    eta.innerText = `Delivery in: ${sla.maxDeliveryTime} mins`;

    const costForTwo = document.createElement('span');
    costForTwo.innerText = costForTwoString;

    infoSection.append(
      getAvgRatingElement(avgRating, totalRatings),
      eta,
      costForTwo
    );

    cardElem.append(
      cardTitle,
      cardDescription,
      cardImg,
      getCuisinesElement(cuisines),
      infoSection
    );

    return cardElem;
  });

  containerElem.append(...cardElems);
};

const getCuisinesElement = (cuisines) => {
  const cuisinesElem = document.createElement('p');
  cuisinesElem.className = 'card__cuisines';
  cuisinesElem.innerText = cuisines.join(' | ');

  return cuisinesElem;
};

const getAvgRatingElement = (avgRating, totalRatings) => {
  const avgRatingFloat = parseFloat(avgRating);
  let ratingClass;
  const ratingElem = document.createElement('p');
  ratingElem.className = 'card__rating';
  ratingElem.innerText = isNaN(avgRatingFloat)
    ? 'N/A'
    : `${avgRatingFloat} (${totalRatings} reviews)`;

  switch (true) {
    case avgRatingFloat >= 4.5:
      ratingClass = 'green';
      break;
    case avgRatingFloat >= 4 && avgRatingFloat < 4.5:
      ratingClass = 'light-green';
      break;
    case avgRatingFloat >= 3.5 && avgRatingFloat < 4:
      ratingClass = 'yellow';
      break;
    case avgRatingFloat >= 3 && avgRatingFloat < 3.5:
      ratingClass = 'orange';
      break;
    case avgRatingFloat <= 3:
      ratingClass = 'red';
      break;
    default:
      ratingClass = 'unavailable';
      break;
  }

  ratingElem.classList.add(ratingClass);

  return ratingElem;
};

const renderErrorSection = (err, errorContainerElem) => {
  errorContainerElem.innerText = err;
};

// TODO: throttle input keystrokes
searchInputElem.addEventListener('keyup', (e) => {
  const originalData = getFetchedData();

  if (e.target.value) {
    clearFilters();
    const filteredData = originalData.filter((item) => {
      const { name, cuisines } = item.data.data;
      const regex = new RegExp(e.target.value, 'ig');

      return name.match(regex) || cuisines.join('#').match(regex);
    });

    clearDOM(restaurantsListElem);
    renderCards(filteredData, restaurantsListElem);
  } else {
    clearDOM(restaurantsListElem);
    renderCards(originalData, restaurantsListElem);
  }
});

// TODO: cumulative filter/ sort
filterActionsElem.addEventListener('click', (e) => {
  const originalData = getFetchedData();

  if (e.target.nodeName === 'BUTTON') {
    const filterActive = e.target.classList.contains('active');

    const filteredData = originalData.filter((item) => {
      return filterActive || item.data.data.veg;
    });

    if (filterActive) {
      e.target.classList.remove('active');
    } else {
      e.target.classList.add('active');
    }

    clearDOM(restaurantsListElem);
    renderCards(filteredData, restaurantsListElem);
  }
});

sortActionsElem.addEventListener('click', (e) => {
  const originalData = getFetchedData();

  if (e.target.nodeName === 'BUTTON') {
    const sortAction = e.target.innerText.toLowerCase();
    // const sortingOrder = e.target.classList.contains('asc') ? 'asc' : 'desc';
    const isInAscendingOrder = e.target.classList.contains('asc');

    const sortMap = {
      ratings: 'avgRating',
      'delivery time': 'deliveryTime',
      'price for two': 'costForTwo',
    };

    const sortedData = originalData.sort((a, b) =>
      compare(sortMap[sortAction], a.data.data, b.data.data, isInAscendingOrder)
    );

    e.target.classList.add(isInAscendingOrder ? 'desc' : 'asc');
    e.target.classList.remove(!isInAscendingOrder ? 'desc' : 'asc');

    clearDOM(restaurantsListElem);
    renderCards(sortedData, restaurantsListElem);
  }
});

const clearFilters = () => {
  sortActionsElem.querySelectorAll('button').forEach((buttonElem) => {
    buttonElem.classList.remove('asc');
    buttonElem.classList.remove('desc');
  });
  filterActionsElem.querySelectorAll('button').forEach((buttonElem) => {
    buttonElem.classList.remove('active');
  });

  const originalData = getFetchedData();
  clearDOM(restaurantsListElem);
  renderCards(originalData, restaurantsListElem);
};

clearFiltersElem.addEventListener('click', clearFilters);

const compare = (compareBy, val1, val2, descending = true) => {
  if (val1[compareBy] < val2[compareBy]) return descending ? 1 : -1;
  if (val1[compareBy] > val2[compareBy]) return descending ? -1 : 1;
  return 0;
};

// init
fetchRestaurants();
