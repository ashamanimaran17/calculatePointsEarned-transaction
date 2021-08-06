import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import styles from "./../public/css/globalStyles.css"
import classNames from "classnames";
import { Typography } from "@material-ui/core";
const cx = classNames.bind(styles);
function App(){
    return(
        <div className={cx("testCSS")}><Typography h4>Hello I'm react</Typography></div>
    )
}
ReactDOM.render(<App/>, document.getElementById("root"));