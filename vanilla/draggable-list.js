// TODO: resolve the bug with list order on refresh

const TO_DO = 'to-do';
const COMPLETED = 'completed';

const listElem = document.getElementById('list');
const toDoListContainer = document.getElementById(TO_DO);
const completedListContainer = document.getElementById(COMPLETED);

const localItems = [
  {
    id: '1',
    title: 'item 1',
    status: TO_DO,
  },
  {
    id: '2',
    title: 'item 2',
    status: TO_DO,
  },
  {
    id: '3',
    title: 'item 3',
    status: TO_DO,
  },
  {
    id: '4',
    title: 'item 4',
    status: TO_DO,
  },
  {
    id: '5',
    title: 'item 5',
    status: COMPLETED,
  },
  {
    id: '6',
    title: 'item 6',
    status: COMPLETED,
  },
];
let allItems = localItems;

listElem.addEventListener('dragstart', (e) => {
  if (e.target.dataset.draggable === '') {
    e.target.classList.add('dragging');
  }
});

listElem.addEventListener('dragend', (e) => {
  if (e.target.dataset.draggable === '') {
    e.target.classList.remove('dragging');
  }
});

listElem.addEventListener('dragover', (e) => {
  if (e.target.dataset.droppable === '') {
    e.preventDefault();
    const draggedElem = document.querySelector('.dragging');
    const draggableElemsInDropTarget = e.target.querySelectorAll(
      '.item:not(.dragging)'
    );
    const nextElemObj = getElementAfterDragged(
      draggableElemsInDropTarget,
      e.clientY
    );

    if (nextElemObj && nextElemObj.nextElem) {
      e.target.insertBefore(draggedElem, nextElemObj.nextElem);
    } else {
      e.target.appendChild(draggedElem);
    }

    updateDataArr(
      draggedElem.dataset.id,
      nextElemObj.nextElem.dataset.id,
      e.target.id
    );
  }
});

const updateDataArr = (draggingID, draggedBeforeID, targetID) => {
  if (draggingID && draggedBeforeID) {
    const draggedBeforeItemIndex = allItems.findIndex(
      (item) => item.id === draggedBeforeID
    );
    const draggingItemIndex = allItems.findIndex(
      (item) => item.id === draggingID
    );
    const draggingItem = allItems.find((item) => item.id === draggingID);
    //if (draggingItem.status !== targetID) {
    draggingItem.status = targetID;
    const copy = JSON.parse(JSON.stringify(allItems));
    copy.splice(draggingItemIndex, 1);
    copy.splice(draggedBeforeItemIndex, 0, draggingItem);

    console.log({ copy });
    setInLocalStorage('items', copy);
    //}
  }
};

const clear = (elem) => {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
};

const renderList = (items, elem) => {
  const listItemElems = [];

  items.forEach((item, index) => {
    const listItemElem = document.createElement('div');
    listItemElem.innerText = item.title;
    listItemElem.className = 'item';
    listItemElem.setAttribute('draggable', true);
    listItemElem.dataset.draggable = '';
    listItemElem.dataset.id = item.id;

    listItemElems.push(listItemElem);
  });

  elem.append(...listItemElems);
};

const getItemsGroup = (items) => {
  return items.reduce(
    (accumulated, current, index) => {
      if (current.status === TO_DO) {
        accumulated[0].push(current);
      } else if (current.status === COMPLETED) {
        accumulated[1].push(current);
      }

      return accumulated;
    },
    [[], []]
  );
};

const setInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const getElementAfterDragged = (elemList, mousePosY) => {
  return [...elemList].reduce(
    (nextElemObj, currentElem) => {
      const draggedElemRect = currentElem.getBoundingClientRect();
      const draggedElemMidPosY = draggedElemRect.height / 2;
      const offset = mousePosY - draggedElemRect.top - draggedElemMidPosY;

      if (offset < 0 && offset > nextElemObj.offset) {
        return { offset, nextElem: currentElem };
      }
      return nextElemObj;
    },
    { offset: Number.NEGATIVE_INFINITY, nextElem: null }
  );
};

const storedItems = getFromLocalStorage('items');
const [itemsToDo, itemsComplete] = storedItems
  ? getItemsGroup(storedItems)
  : getItemsGroup(localItems);
allItems = storedItems || localItems;
renderList(itemsToDo, toDoListContainer);
renderList(itemsComplete, completedListContainer);
