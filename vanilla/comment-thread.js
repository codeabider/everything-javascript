const commentsData = [
  {
    userName: 'John Doe',
    date: '9/21/2022, 4:09:24 PM',
    text: 'some comment 00',
    editing: false,
    likesCount: 0,
    replies: [
      {
        userName: 'Jane Doe',
        date: '9/21/2022, 4:19:00 PM',
        text: 'reply to the comment 1',
        editing: false,
        likesCount: 10,
      },
    ],
  },
  {
    userName: 'John Doe',
    date: '9/23/2022, 3:00:00 PM',
    text: 'another comment 01',
    editing: false,
    likesCount: 3,
  },
  {
    userName: 'John Doe',
    date: '10/03/2022, 1:00:24 PM',
    text: 'some comment 02',
    editing: false,
    likesCount: 1,
    replies: [
      {
        userName: 'Jane Doe',
        date: '9/21/2022, 4:09:24 PM',
        text: 'reply to the comment 2',
        editing: false,
        likesCount: 999,
      },
      {
        userName: 'Jane Doe',
        date: '9/21/2022, 4:09:24 PM',
        text: 'reply to the comment 3',
        editing: false,
        likesCount: 8,
      },
    ],
  },
];

const emptyRenderedElement = (selector) => {
  const elem = document.querySelector(selector);

  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
};

const renderComments = (commentsData, parentIndex, selector = '#comments') => {
  const commentsElem = document.querySelector(selector);
  const allComments = [];

  commentsData.forEach((commentItem, index) => {
    const itemPosition =
      parentIndex != null ? `${parentIndex}-${index}` : `${index}`;
    const commentClass = `comment-${itemPosition}`;
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.classList.add(commentClass);

    const user = document.createElement('h4');
    user.classList.add('user');
    user.innerText = commentItem.userName;

    const date = document.createElement('p');
    date.classList.add('date');
    date.innerText = commentItem.date;

    const likes = document.createElement('h5');
    likes.classList.add('likes');
    likes.innerText = `Likes: ${commentItem.likesCount}`;

    const replyButton = document.createElement('button');
    replyButton.classList.add('reply-button');
    replyButton.setAttribute('data-index', itemPosition);
    replyButton.innerText = 'Reply';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.setAttribute('data-index', itemPosition);
    deleteButton.innerText = 'Delete';

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.setAttribute('data-index', itemPosition);
    likeButton.innerText = 'Like';

    newComment.append(user, date, likes);

    if (commentItem.editing) {
      const replyTextArea = document.createElement('textArea');
      replyTextArea.classList.add('reply-text-area');

      const addCommentButton = document.createElement('button');
      addCommentButton.classList.add('edit-confirmation-button');
      addCommentButton.setAttribute('data-index', itemPosition);
      addCommentButton.innerText = 'Confirm';

      newComment.append(replyTextArea, addCommentButton);
    } else {
      const text = document.createElement('p');
      text.classList.add('text');
      text.innerText = commentItem.text;

      const editButton = document.createElement('button');
      editButton.classList.add('edit-button');
      editButton.setAttribute('data-index', itemPosition);
      editButton.innerText = 'Edit';

      newComment.append(text, editButton);
    }

    newComment.append(replyButton, deleteButton, likeButton);

    commentsElem.appendChild(newComment);

    if (commentItem.replies && commentItem.replies.length) {
      renderComments(commentItem.replies, itemPosition, `.${commentClass}`);
    }
  });
};

const rerenderComments = () => {
  // TODO: not re-render entire DOM
  emptyRenderedElement('#comments');
  renderComments(commentsData);
};

const getCurrentCommentObj = (positionData) => {
  // TODO: update immutably
  let currentComment = null;
  const positionIndex = positionData.split('-');
  positionIndex.forEach((idx) => {
    currentComment = currentComment
      ? currentComment.replies[idx]
      : commentsData[idx];
  });

  return currentComment;
};

const showEditReplyBox = (positionData) => {
  const currentComment = getCurrentCommentObj(positionData);

  currentComment.editing = true;

  rerenderComments();
};

const editReply = (positionData) => {
  const currentComment = getCurrentCommentObj(positionData);

  const textAreaElem = document.querySelector(
    `.comment-${positionData} .reply-text-area`
  );
  currentComment.text = textAreaElem.value;
  currentComment.editing = false;

  rerenderComments();
};

const addReply = (positionData) => {
  const currentComment = getCurrentCommentObj(positionData);
  const newComment = {
    userName: 'Janis Doe',
    date: new Date(Date.now()).toLocaleString(),
    text: '',
    editing: true,
    likesCount: 0,
  };

  if (currentComment.replies && currentComment.replies.length) {
    currentComment.replies.push(newComment);
  } else {
    currentComment.replies = [newComment];
  }

  rerenderComments();
};

const deleteReply = (positionData) => {
  const positionIndexArr = positionData.split('-');
  const indexToRemove = positionIndexArr.pop();

  let currentComment = null;
  if (positionIndexArr.length) {
    positionIndexArr.forEach((idx) => {
      currentComment = currentComment
        ? currentComment.replies[idx]
        : commentsData[idx];
    });

    currentComment.replies.splice(indexToRemove, 1);
  } else {
    commentsData.splice(indexToRemove, 1);
  }

  rerenderComments();
};

const incrementLikeCount = (positionData) => {
  const currentComment = getCurrentCommentObj(positionData);

  currentComment.likesCount = currentComment.likesCount + 1;

  rerenderComments();
};

// using bubbling to avoid multiple event handlers
document.querySelector('#comments').addEventListener('click', (event) => {
  if (
    event.target.classList &&
    event.target.classList.contains('reply-button')
  ) {
    addReply(event.target.dataset.index);
  }

  if (
    event.target.classList &&
    event.target.classList.contains('edit-button')
  ) {
    showEditReplyBox(event.target.dataset.index);
  }

  if (
    event.target.classList &&
    event.target.classList.contains('delete-button')
  ) {
    deleteReply(event.target.dataset.index);
  }

  if (
    event.target.classList &&
    event.target.classList.contains('edit-confirmation-button')
  ) {
    editReply(event.target.dataset.index);
  }

  if (
    event.target.classList &&
    event.target.classList.contains('like-button')
  ) {
    incrementLikeCount(event.target.dataset.index);
  }
});

// TODO: persist state in localStorage
renderComments(commentsData);
