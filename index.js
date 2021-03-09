import { App } from "./App";

const render = () => {
  const root = document.getElementById("root");
  Fugaz.init(root, App);
};

Fugaz.load(render);
