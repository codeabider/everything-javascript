// TODO: render from state, retain state on refresh

const listElem = document.getElementById('list');

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
  }
});

const getElementAfterDragged = (elemList, mousePosY) => {
  return [...elemList].reduce(
    (nextElemObj, currentElem) => {
      const draggedElemRect = currentElem.getBoundingClientRect();
      const draggedElemMidPosY = draggedElemRect.height / 2;
      const offset = mousePosY - draggedElemRect.top - draggedElemMidPosY;

      console.log({ draggedElemRect, mousePosY, offset });

      if (offset < 0 && offset > nextElemObj.offset) {
        return { offset, nextElem: currentElem };
      }
      return nextElemObj;
      //   return null;
    },
    { offset: Number.NEGATIVE_INFINITY, nextElem: null }
  );
};
