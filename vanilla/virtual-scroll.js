const LIST_HEIGHT = 300;
const ITEM_HEIGHT = 20;

const listContainer = document.getElementById('list-container');
listContainer.style.height = `${LIST_HEIGHT}px`;
listContainer.style.overflow = 'scroll';

const largeArr = [...Array(1000000)].map((_, index) => index + 1);

// rendering only upto `838861` in Chrome (renders all 1M in Safari)
const renderList = (allData, firstItemIndex, renderCount = 20) => {
  const renderItems = allData.slice(
    firstItemIndex,
    firstItemIndex + renderCount
  );
  const elemArr = [];

  const firstDummyItem = document.createElement('div');
  firstDummyItem.style.height = `${firstItemIndex * ITEM_HEIGHT}px`;
  elemArr.push(firstDummyItem);

  renderItems.forEach((item) => {
    const listItem = document.createElement('div');
    listItem.style.height = `${ITEM_HEIGHT}px`;
    listItem.innerText = item;

    elemArr.push(listItem);
  });

  const lastDummyItem = document.createElement('div');
  lastDummyItem.style.height = `${
    (allData.length - firstItemIndex) * ITEM_HEIGHT
  }px`;
  elemArr.push(lastDummyItem);

  listContainer.append(...elemArr);
};

const clearList = (elem) => {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
};

const addScrollListener = (elem) => {
  let firstRenderedItem = 0;

  renderList(largeArr, firstRenderedItem);

  // TODO: throttle event
  elem.addEventListener('scroll', () => {
    firstRenderedItem = Math.ceil(elem.scrollTop / ITEM_HEIGHT);
    clearList(elem);
    renderList(largeArr, firstRenderedItem);
  });
};

addScrollListener(listContainer);
