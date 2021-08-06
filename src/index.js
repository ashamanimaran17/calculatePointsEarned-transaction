import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import styles from "./../public/css/globalStyles.scss"
import classNames from "classnames";
import { Typography } from "@material-ui/core";
const cx = classNames.bind(styles);
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {AppBar, Toolbar, Button, } from '@material-ui/core';
import {RewardsTable} from "./../src/components/customerRewards/rewardsTable.jsx";
import {About} from "./../src/components/about/about.jsx";
function App(){
    return(
        <Router>
        <AppBar position="static" color="primary">
        <Toolbar>
        <Button  to="/" component={Link} className={cx("appBarButton")}>Rewards table</Button>
        <Button  to="/about" component={Link} className={cx("appBarButton")}>About</Button>
        </Toolbar>
        </AppBar>
        <Switch>
              <Route exact path='/' component={RewardsTable} />
              <Route path='/about' component={About} />
          </Switch>
      </Router>
    )
}
ReactDOM.render(<App/>, document.getElementById("root"));