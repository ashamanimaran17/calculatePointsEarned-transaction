npm init
npm install webpack --save-dev
npx webpack init
  -@webpack-cli/generators:yes
  -JS solutions:ES6
  -webpack-dev-server:yes
  -simplify the creation of HTML files:yes
  -PWA support: no
  -CSS solutions:SASS
  -CSS styles along with SASS in your project:yes
  -PostCSS in your project?:yes
  -Do you want to extract CSS for every file?:no
  -install prettier:yes

npm install react react-dom
add <div id="root"></div> in index.html
add 
import React from "react";
import ReactDOM from "react-dom";
function App(){
    return(
        <div>Hello I'm react</div>
    )
}
ReactDOM.render(<App/>, document.getElementById("root"));
in index.js
npm run-script serve
- Support for the experimental syntax 'jsx' isn't currently enabled
-Add @babel/preset-react (https://git.io/JfeDR) to the 'presets' section of your Babel config to enable transformation

npm install @babel/preset-react --save
{
    "plugins": ["@babel/syntax-dynamic-import"],
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false
            }
        ],
        "@babel/preset-react"
    ]
}
add CSS in public folder
import styles from "./../public/css/globalStyles.css"
className={styles.testCSS}
Cannot read property 'testCSS' of undefined  - you can rename file as globalStyles.module.css and 
use :local/:global prefix in your css file to get this working
or
add classnames package
npm install classnames --save
import classNames from "classnames";
const cx = classNames.bind(styles);
className={cx("testCSS")}
- want to add MaterialUI
npm install @material-ui/core --save
npm install typeface-roboto --save
npm install @material-ui/icons --save
npm install @material-ui/lab --save
devtool: 'source-map' in webpack to get source code for debugging
//adding router
npm install react-router-dom --save