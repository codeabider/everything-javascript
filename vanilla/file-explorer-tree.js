const data = [
  {
    isFile: false,
    title: 'root',
    id: '1',
    content: [
      {
        isFile: true,
        title: 'file1.txt',
        id: '2',
        content: []
      },
      {
        isFile: true,
        title: 'file2.txt',
        id: '3',
        content: []
      },
      {
        isFile: false,
        title: 'src',
        id: '4',
        content: [
          {
            isFile: true,
            title: 'file1.txt',
            id: '5',
            content: []
          },
          {
            isFile: false,
            title: 'components',
            id: '6',
            content: [
              {
                isFile: true,
                title: 'home.txt',
                id: '7',
                content: []
              }
            ]
          }
        ]
      },
      {
        isFile: false,
        title: 'public',
        id: '8',
        content: [
          {
            isFile: true,
            title: 'file1.txt',
            id: '9',
            content: []
          }
        ]
      }
    ]
  }
];

const clearDOM = (elem) => {
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
};

const render = (elem, data) => {
  //   console.log(elem, data);
  const dir = data.map(({ isFile, title, id, content }) => {
    const titleElem = document.createElement('p');
    titleElem.className = isFile ? 'file' : 'folder';
    titleElem.innerText = title;
    titleElem.id = id;

    if (!isFile) {
      const addFolderBtn = document.createElement('button');
      addFolderBtn.className = 'button';
      addFolderBtn.innerText = '+folder';
      const addFileBtn = document.createElement('button');
      addFileBtn.className = 'button';
      addFileBtn.innerText = '+file';

      titleElem.append(addFileBtn, addFolderBtn);
    }

    elem.append(titleElem);

    if (!isFile) {
      const wrapper = document.createElement('div');
      wrapper.className = 'folder-wrapper';

      elem.append(wrapper);

      return render(wrapper, content);
    }

    return elem;
  });

  return dir;
};

const container = document.getElementById('container');
render(container, data);

const addItem = (targetElemID, text) => {
  const updatedData = traverseTree(
    targetElemID,
    data,
    'dummy',
    text === '+file'
  );
  console.log('sdfsd', updatedData);

  clearDOM(container);
  render(container, updatedData);
};

// TODO: update immutably
const traverseTree = (targetElemID, tree, title, isFile) => {
  tree.forEach((node) => {
    console.log('', { tree, targetElemID });
    if (node.id == targetElemID && !node.isFile) {
      console.log('found', { tree, targetElemID });
      const newNode = {
        id: new Date().getTime(),
        isFile,
        title,
        content: []
      };
      node.content = [...node.content, newNode];
    }

    if (node.content) {
      traverseTree(targetElemID, node.content, title, isFile);
    }
  });

  return tree;
};

container.addEventListener('click', (e) => {
  if (e.target.className === 'folder') {
    e.target.nextSibling.classList.toggle('expanded');
  }

  if (e.target.className === 'button') {
    // console.log(e.target);
    const targetElemID = e.target.parentElement.id;
    addItem(targetElemID, e.target.innerText);
  }
});
