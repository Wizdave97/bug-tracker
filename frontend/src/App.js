import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from './store/reducer';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});


class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </ThemeProvider>
    );
  }
}

const mapDispatchToProps=dispatch=>({
  
})

const mapStateToProps=state=>({
  isAuthenticated:state.token!==null
})
export default connect(mapStateToProps,mapDispatchToProps)(App);