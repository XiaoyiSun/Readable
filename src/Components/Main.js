import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteExistingPost, voteExistingPost } from '../Actions';

class Main extends Component {
  state = {
    sortQuery: 'voteScore',
  }
  _deletePost = (id) => {
    if(window.confirm('Detele the post?')) {
      this.props.dispatch(deleteExistingPost(id));
    }
  }
  _voteForPost = (option, post) => {
    this.props.dispatch(voteExistingPost(option, post));
  }
  render() {
    const { categories, posts } = this.props;
    const showingPosts = posts.sort((a, b) => b[this.state.sortQuery] - a[this.state.sortQuery]);
    return (
      <div>
        <Link to="/edit">Create/Edit</Link>
        <hr />
        <h1>Main page</h1>
        <ul>
          {categories
            .map(category => (
              <li key={category.name}><Link to={`/category/${category.name}`}>{category.name}</Link></li>
            ))
          }
        </ul>
        <hr />
        <button type="button" onClick={() => this.setState({ sortQuery: 'voteScore' })}>Sort by Vote</button>
        <button type="button" onClick={() => this.setState({ sortQuery: 'timestamp' })}>Sort by Time</button>
        {showingPosts
          .filter(post => !post.deleted)
          .map(post => (
            <div key={post.id} style={{border: '1px solid lightgray', marginTop: '5px', padding: '10px'}}>
              <Link to={`/post-detail/${post.category}/${post.id}`}>{post.title}</Link>
              <p>{post.body}</p>
              <p>Created time: {new Date(post.timestamp).toString()}</p>
              <p>Current Score: {post.voteScore}</p>
              <p>Author: {post.author}</p>
              <Link to={`/edit/${post.id}`}><button>Edit</button></Link>
              <button onClick={() => this._deletePost(post.id)}>Delete</button>
              <button onClick={() => this._voteForPost('upVote', post)}>Up Vote</button>
              <button onClick={() => this._voteForPost('downVote', post)}>Down Vote</button>
            </div>
          ))
        }
      </div>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts,
  };
}

export default connect(mapStateToProps)(Main);
