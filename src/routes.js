import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';

import Login from './pages/login';
import Home from './pages/home';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(AuthContext);

    if (loading){
      return <h1>Carregando...</h1>
    }
    
    if (isPrivate && !authenticated) {
      return <Redirect to="/login" />
    }

    return <Route {...rest} />;
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <CustomRoute exact path="/login" component={Login} />
        <CustomRoute isPrivate exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}