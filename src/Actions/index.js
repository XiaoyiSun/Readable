import Axios from 'axios';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

export async function fetchPostAndComments() {
  const result = await fetch('http://localhost:5001/posts', { headers: { 'Authorization': 'whatever-you-want' } });
  const posts = await result.json();
  // console.log(posts);
  const validPosts = posts.filter(post => !post.deleted);
  const commentPromises = validPosts.map(post => getNumberOfComments(post.id));
  return Promise.all(commentPromises);
}

export async function getNumberOfComments(postId) {
  const result = await fetch(`http://localhost:5001/posts/${postId}/comments`, { headers: { 'Authorization': 'whatever-you-want' } });
  const comments = await result.json();
  return {
    count: comments.length,
    id: postId,
  };
}

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  payload: {
    categories,
  },
});

export const fetchAllCategories = () => (dispatch) => {
  fetch('http://localhost:5001/categories', { headers: { 'Authorization': 'whatever-you-want' } })
    .then(result => result.json())
    .then(data => data.categories)
    .then((categories) => {
      dispatch(receiveCategories(categories));
    });
};

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  payload: {
    posts,
  },
});

export const fetchAllPosts = () => (dispatch) => {
  fetch('http://localhost:5001/posts', { headers: { 'Authorization': 'whatever-you-want' } })
    .then(result => result.json())
    .then((posts) => {
      dispatch(receivePosts(posts));
    });
};

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  payload: {
    comments,
  },
});

export const fetchPostComments = postId => (dispatch) => {
  fetch(`http://localhost:5001/posts/${postId}/comments`, { headers: { 'Authorization': 'whatever-you-want' } })
    .then(result => result.json())
    .then((comments) => {
      dispatch(receiveComments(comments));
    });
};

export const addPost = post => ({
  type: ADD_POST,
  payload: {
    post,
  },
});

export const postNewPost = post => dispatch => Axios
  .post('http://localhost:5001/posts', post, { headers: { 'Authorization': 'whatever-you-want' } })
  .then(dispatch(addPost(post)));

export const editPost = post => ({
  type: EDIT_POST,
  payload: {
    post,
  },
});

export const editExistingPost = post => (dispatch) => {
  const { title, body, id } = post;
  Axios
    .put(`http://localhost:5001/posts/${id}`, { title, body }, { headers: { 'Authorization': 'whatever-you-want' } })
    .then(dispatch(editPost(post)));
};

export const deletePost = id => ({
  type: DELETE_POST,
  payload: {
    id,
  },
});

export const deleteExistingPost = id => dispatch => Axios
  .delete(`http://localhost:5001/posts/${id}`, { headers: { 'Authorization': 'whatever-you-want' } })
  .then(dispatch(deletePost(id)));

export const votePost = (option, post) => ({
  type: VOTE_POST,
  payload: {
    option,
    post,
  },
});

export const voteExistingPost = (option, post) => (dispatch) => {
  Axios
    .post(`http://localhost:5001/posts/${post.id}`, { option }, { headers: { 'Authorization': 'whatever-you-want' } })
    .then(dispatch(votePost(option, post)));
};

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: {
    comment,
  },
});

export const postNewComment = comment => dispatch => Axios
  .post('http://localhost:5001/comments', comment, { headers: { 'Authorization': 'whatever-you-want' } })
  .then(dispatch(addComment(comment)));

export const editComment = comment => ({
  type: EDIT_COMMENT,
  payload: {
    comment,
  },
});

export const editExistingComment = comment => (dispatch) => {
  const { body, timestamp, id } = comment;
  Axios.put(`http://localhost:5001/comments/${id}`, { body, timestamp }, { headers: { 'Authorization': 'whatever-you-want' } }).then(dispatch(editComment(comment)));
};

export const deleteComment = id => ({
  type: DELETE_COMMENT,
  payload: {
    id,
  },
});

export const deleteExistingComment = id => dispatch => Axios
  .delete(`http://localhost:5001/comments/${id}`, { headers: { 'Authorization': 'whatever-you-want' } })
  .then(dispatch(deleteComment(id)));

export const voteComment = (option, comment) => ({
  type: VOTE_COMMENT,
  payload: {
    option,
    comment,
  },
});

export const voteExistingComment = (option, comment) => (dispatch) => {
  Axios
    .post(`http://localhost:5001/comments/${comment.id}`, { option }, { headers: { 'Authorization': 'whatever-you-want' } })
    .then(dispatch(votePost(option, comment)));
};
