import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllCategories, fetchAllPosts } from '../Actions';

class Main extends Component {
  state = {
    sortQuery: 'voteScore',
  }
  componentDidMount() {
    this.props.dispatch(fetchAllCategories());
    this.props.dispatch(fetchAllPosts());
  }
  _sortPostsByTime = () => {
    const reorderedPosts = this.state.posts.sort((a, b) => b.voteScore - a.voteScore);
    this.setState({
      posts: reorderedPosts,
    });
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
        <ul>
          {showingPosts
            .filter(post => !post.deleted)
            .map(post => (
              <li key={post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></li>
            ))
          }
        </ul>
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
