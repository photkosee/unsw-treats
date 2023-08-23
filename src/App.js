import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/HomePage';
import ChannelPage from './pages/ChannelPage';
import DmPage from './pages/DmPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';

import ProtectedRoute from './components/Layout/ProtectedRoute';

import { AuthProvider } from './AuthContext';
import './axios';

function App() {
  document.title = 'UNSW Treats';

  const [authDetails, setAuthDetails] = React.useState(
    localStorage.getItem('token')
  );

  function setAuth(token, uId) {
    localStorage.setItem('token', token);
    localStorage.setItem('uId', uId);
    setAuthDetails(token);
  }
  return (
    <AuthProvider value={authDetails}>
      <Router>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) => {
              return <LoginPage {...props} setAuth={setAuth} />;
            }}
          />
          <Route
            exact
            path="/register"
            render={(props) => {
              return <RegisterPage {...props} setAuth={setAuth} />;
            }}
          />
          <Route exact path="/forgot_password" component={ForgotPasswordPage} />
          <Route exact path="/reset_password" component={ResetPasswordPage} />
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute path="/profile/:profile" component={ProfilePage} />
          <ProtectedRoute path="/channel/:channelId" component={ChannelPage} />
          <ProtectedRoute path="/dm/:dmId" component={DmPage} />
          <ProtectedRoute path="/search/:queryStr" component={SearchPage} />
          <ProtectedRoute path="/search" component={SearchPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;