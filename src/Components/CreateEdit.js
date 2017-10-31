import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import uuid4 from 'uuid';
import { postNewPost, editExistingPost } from '../Actions';

class CreateEdit extends Component {
  state = {
    id: '',
    timestamp: '',
    title: '',
    body: '',
    author: '',
    category: 'react',
    voteScore: 1,
    deleted: false,
    fireRedirect: false,
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      fetch(`http://localhost:5001/posts/${this.props.match.params.id}`, { headers: { 'Authorization': 'whatever-you-want' } })
        .then(result => result.json())
        .then((post) => {
          this.setState({
            id: post.id,
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category,
            voteScore: post.voteScore,
            deleted: post.deleted,
          });
        });
    } else {
      this.setState({ id: uuid4() });
    }
  }
  _createOrEdit = () => {
    const {fireRedirect, ...post} = this.state;
    if (!this.props.match.params.id) {
      this.props.dispatch(postNewPost(post));
    } else {
      this.props.dispatch(editExistingPost(post));
    }
    this.setState({ fireRedirect: true });
  }
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ timestamp: Date.now() }, () => this._createOrEdit());
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Post Title:
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Post Body:
            <textarea
              name="body"
              value={this.state.body}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleInputChange}
              readOnly={this.props.match.params.id}
            />
          </label>
          {this.props.categories && <label>
            Categories:
            <select
              name="category"
              value={this.state.category}
              onChange={this.handleInputChange}
            >
              {this.props.categories.map((category) => (
                <option value={category.name} key={category.name}>{category.name}</option>
              ))}
            </select>
          </label>}
          <input type="submit" value="Submit" />
        </form>
        {this.state.fireRedirect && <Redirect to="/" />}
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

export default connect(mapStateToProps)(CreateEdit);
