import { logoClick } from "./logo-click";
import { note } from "./note";

window.onhashchange = function change() {
  const hash = location.hash.split("#").pop();

  document.body.className = "Active";
  document.body.className = [document.body.className, " ", hash].join("");
  if (hash.length) {
    note(900, { reverb: 1 / 8 });
  }
};

export let logo_state = false;

export function setLogoState(newState: boolean) {
  logo_state = newState;
}
export function getLogoState() {
  return logo_state;
}
const Logo = document.getElementById("Logo");
Logo?.addEventListener("click", logoClick);
const UI = document.getElementById("UI");
UI?.addEventListener("click", function () {
  note(800, { reverb: 1 / 8 });
  // note(800);
  location.hash = "";
  return (document.body.className = "Active");
});
let x = UI.children.length;
while (x--) {
  const a = UI.children[x];
  if (a.children[0] && a.children[0].children[0])
    a.children[0].children[0].addEventListener("click", function (e) {
      e.stopPropagation();
    });
}

import { grid } from "./the-grid";
grid(document.getElementById("grid-dynamic"));