import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from '../src/Components/Main';
import Category from '../src/Components/Category';
import CreateEdit from '../src/Components/CreateEdit';
import PostDetail from '../src/Components/PostDetail';
import CreateEditComment from '../src/Components/CreateEditComment';
import { fetchAllCategories, fetchAllPosts } from './Actions';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchAllCategories());
    this.props.dispatch(fetchAllPosts());
  }
  render() {
    return (
      <div className="app">
        <Link to="/">Home</Link>
        <hr />
        <Route
          exact
          path="/"
          render={() => <Main />}
        />
        <Route
          exact
          path="/category/:id"
          render={({ match }) => <Category match={match} />}
        />
        <Route
          exact
          path="/post-detail/:category/:id"
          render={({ match }) => <PostDetail match={match} />}
        />
        <Route
          exact
          path="/edit/:id?"
          render={({ match }) => <CreateEdit match={match} />}
        />
        <Route
          exact
          path="/editComment/:parentId/:id?"
          render={({ match }) => <CreateEditComment match={match} />}
        />
      </div>
    );
  }
}

export default withRouter(connect()(App));
