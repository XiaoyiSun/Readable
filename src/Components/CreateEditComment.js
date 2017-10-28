import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import uuid4 from 'uuid';
import { postNewComment, editExistingComment } from '../Actions';

class CreateEditComment extends Component {
  state = {
    id: '',
    parentId: '',
    timestamp: '',
    body: '',
    author: '',
    voteScore: 0,
    deleted: false,
    parentDeleted: false,
    fireRedirect: false,
  }
  componentDidMount() {
    const { id, parentId } = this.props.match.params;
    if (id) {
      const comment = this.props.comments.find(comment => comment.id === id);
      this.setState({
        id: comment.id,
        parentId: comment.parentId,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author,
        voteScore: comment.voteScore,
        deleted: comment.deleted,
        parentDeleted: comment.parentDeleted,
      });
    } else {
      this.setState({ id: uuid4(), parentId });
    }
  }
  _createOrEdit = () => {
    const {fireRedirect, ...comment} = this.state;
    if (!this.props.match.params.id) {
      this.props.dispatch(postNewComment(comment));
    } else {
      this.props.dispatch(editExistingComment(comment));
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
            Comment Body:
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
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.fireRedirect && <Redirect to={`/post/${this.props.match.params.parentId}`} />}
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments,
  };
}

export default connect(mapStateToProps)(CreateEditComment);
