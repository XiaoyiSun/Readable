import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAllCategories, fetchAllPosts } from '../Actions';

class Category extends Component {
  state = {
    sortQuery: 'voteScore',
  }
  componentDidMount() {
    this.props.dispatch(fetchAllCategories());
    this.props.dispatch(fetchAllPosts());
  }
  render() {
    const { categories, posts, match } = this.props;
    const showingPosts = posts.sort((a, b) => b[this.state.sortQuery] - a[this.state.sortQuery]);
    return (
      <div>
        <h1>Category: {match.params.id}</h1>
        <ul>
          {categories.map(category => (
            <li key={category.name}><Link to={`/category/${category.name}`}>{category.name}</Link></li>
          ))}
        </ul>
        <hr />
        <button type="button" onClick={() => this.setState({ sortQuery: 'voteScore' })}>Sort by Vote</button>
        <button type="button" onClick={() => this.setState({ sortQuery: 'timestamp' })}>Sort by Time</button>
        <ul>
          {showingPosts
            .filter(post => post.category === `${match.params.id}`)
            .filter(post => !post.deleted)
            .map(post => (
              <li key={post.id}><Link to={`/post-detail/${post.category}/${post.id}`}>{post.title}</Link></li>
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

export default connect(mapStateToProps)(Category);
