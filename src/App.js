import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED} from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userAction';
import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#4fc3f7',
      dark: '#000084',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#e6ee9c',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    useNextVariants: true,
  }

});

const token = localStorage.FBIdToken;
if(token){
  const decodeToken = jwtDecode(token);
  if(decodeToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type : SET_AUTHENTICATED})
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme = {theme}>
        <Provider store = {store}>
        <Router>
        <Navbar />
         <div className="container">
          <Switch>
            <Route exact path = "/" component={home} />
            <AuthRoute exact path = "/login" component={login} />
            <AuthRoute exact path = "/signup" component={signup} />
          </Switch>
         </div>
        </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
