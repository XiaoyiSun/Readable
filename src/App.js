import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from '../src/Components/Main';
import Category from '../src/Components/Category';
import CreateEdit from '../src/Components/CreateEdit';
import PostDetail from '../src/Components/PostDetail';
import CreateEditComment from '../src/Components/CreateEditComment';

const App = () => (
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
      path="/post/:id"
      render={({ match }) => <PostDetail match={match} />}
    />
    <Route
      path="/edit/:id?"
      render={({ match }) => <CreateEdit match={match} />}
    />
    <Route
      path="/editComment/:parentId/:id?"
      render={({ match }) => <CreateEditComment match={match} />}
    />
  </div>
);

export default withRouter(connect()(App));
