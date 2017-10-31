import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  fetchPostComments,
  deleteExistingPost,
  deleteExistingComment,
  voteExistingPost,
  voteExistingComment,
} from '../Actions';

class PostDetail extends Component {
  state = {
    fireRedirect: false,
  }
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(fetchPostComments(match.params.id));
  }
  _deletePost = () => {
    if(window.confirm('Detele the post?')) {
      this.props.dispatch(deleteExistingPost(this.props.match.params.id));
      this.setState({ fireRedirect: true });
    }
  }
  _deleteComment = (id) => {
    if(window.confirm('Detele the comment?')) {
      this.props.dispatch(deleteExistingComment(id));
    }
  }
  _voteForPost = (option, post) => {
    this.props.dispatch(voteExistingPost(option, post));
  }
  _voteForComment = (option, comment) => {
    this.props.dispatch(voteExistingComment(option, comment));
    window.location.reload();
  }
  render() {
    const { posts, comments, match } = this.props;
    if (!posts.find(post => post.id === `${match.params.id}`)) {
      return (
        <div>
          <p>404</p>
          <p>There is no post with the id.</p>
          <Link to='/'><button>Back to Home</button></Link>
        </div>
      );
    } else if (posts.find(post => post.id === `${match.params.id}`).deleted) {
      return (
        <div>
          <p>404</p>
          <p>The post was deleted.</p>
          <Link to='/'><button>Back to Home</button></Link>
        </div>
      );
    }
    return (
      <div>
        {posts
          .filter(post => post.id === `${match.params.id}`)
          .map(post => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>id: {post.id}</p>
              <p>Timestamp: {new Date(post.timestamp).toString()}</p>
              <p>Body: {post.body}</p>
              <p>Author: {post.author}</p>
              <p>category: {post.category}</p>
              <p>Vote: {post.voteScore}</p>
              <p>deleted: {post.deleted.toString()}</p>
              <Link to={`/edit/${post.id}`}><button>Edit</button></Link>
              <button onClick={this._deletePost}>Delete</button>
              <button onClick={() => this._voteForPost('upVote', post)}>Up Vote</button>
              <button onClick={() => this._voteForPost('downVote', post)}>Down Vote</button>
              <hr />
            </div>
          ))
        }
        <p>Total {comments.length} comments</p>
        <Link to={`/editComment/${match.params.id}`}><button>Add a new comment</button></Link>
        {comments
          .filter(comment => !comment.deleted)
          .sort((a, b) => b.voteScore - a.voteScore)
          .map(comment => (
            <div key={comment.id}>
              <hr />
              <h2>comment</h2>
              <p>id: {comment.id}</p>
              <p>Timestamp: {new Date(comment.timestamp).toString()}</p>
              <p>Body: {comment.body}</p>
              <p>Author: {comment.author}</p>
              <p>category: {comment.category}</p>
              <p>Vote: {comment.voteScore}</p>
              <p>deleted: {comment.deleted.toString()}</p>
              <p>deleted: {comment.parentDeleted.toString()}</p>
              <Link to={`/editComment/${match.params.id}/${comment.id}`}><button>Edit</button></Link>
              <button onClick={() => this._deleteComment(comment.id)}>Delete</button>
              <button onClick={() => this._voteForComment('upVote', comment)}>Up Vote</button>
              <button onClick={() => this._voteForComment('downVote', comment)}>Down Vote</button>
            </div>
          ))
        }
        {this.state.fireRedirect && <Redirect to="/" />}
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    comments,
  };
}

export default connect(mapStateToProps)(PostDetail);
