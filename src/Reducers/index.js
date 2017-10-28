import { combineReducers } from 'redux';
import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_COMMENTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
} from '../Actions';

function categories(state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES: {
      return [
        ...action.payload.categories,
      ];
    }
    default: {
      return state;
    }
  }
}

function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS: {
      return [
        ...action.payload.posts,
      ];
    }
    case ADD_POST: {
      return [
        ...state,
        action.payload.post,
      ];
    }
    case EDIT_POST: {
      return state
        .filter(post => post.id !== action.payload.post.id)
        .concat(action.payload.post);
    }
    case DELETE_POST: {
      return state.filter(post => post.id !== action.payload.id);
    }
    case VOTE_POST: {
      let updatedScore;
      if (action.payload.option === 'upVote') {
        updatedScore = action.payload.post.voteScore + 1;
      } else if (action.payload.option === 'downVote') {
        updatedScore = action.payload.post.voteScore - 1;
      }
      const updatedPost = {
        ...action.payload.post,
        voteScore: updatedScore,
      };
      return state
        .filter(post => post.id !== action.payload.post.id)
        .concat(updatedPost);
    }
    default: {
      return state;
    }
  }
}

function comments(state = [], action) {
  switch (action.type) {
    case RECEIVE_COMMENTS: {
      return [
        ...action.payload.comments,
      ];
    }
    case ADD_COMMENT: {
      return [
        ...state,
        ...action.payload.comment,
      ];
    }
    case EDIT_COMMENT: {
      return state
        .filter(comment => comment.id !== action.payload.comment.id)
        .concat(action.payload.comment);
    }
    case DELETE_COMMENT: {
      return state.filter(comment => comment.id !== action.payload.id);
    }
    case VOTE_COMMENT: {
      let updatedScore;
      if (action.payload.option === 'upVote') {
        updatedScore = action.payload.comment.voteScore + 1;
      } else if (action.payload.option === 'downVote') {
        updatedScore = action.payload.comment.voteScore - 1;
      }
      const updatedComment = {
        ...action.payload.comment,
        voteScore: updatedScore,
      };
      return state
        .filter(comment => comment.id !== action.payload.comment.id)
        .concat(updatedComment);
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({ categories, posts, comments });
