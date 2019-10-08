import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
let cards = [
  { id: 1, color: "red" },
  { id: 2, color: "green" },
  { id: 3, color: "blue" },
  { id: 4, color: "yellow" },
  { id: 5, color: "red" },
  { id: 6, color: "green" },
  { id: 7, color: "blue" },
  { id: 8, color: "yellow" }
];
const itemRenderFn = (item: any) => <div>{item.color}</div>;

ReactDOM.render(
  <div style={{ marginTop: "100px" }}>
    <App
      removalAnimationClassName={"transformThis"}
      items={cards}
      itemRenderFn={itemRenderFn}
      stackCount={4}
    ></App>
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
