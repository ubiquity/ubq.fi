import { logoClick } from "./logo-click";
import { note } from "./note";
window.onhashchange = function change() {
  const hash = location.hash.split("#").pop();
  if (!hash) return;

  document.body.className = "Active";
  document.body.className = [document.body.className, " ", hash].join("");
  if (hash.length) {
    note(900, { reverb: 1 / 8 });
  }
};

export let isDeactivated = false;

export function setLogoState(newState: boolean) {
  isDeactivated = newState;
}
export function getLogoState() {
  return isDeactivated;
}

// Create a new IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // If the entry (section#Partners) is in the viewport
    if (entry.isIntersecting) {
      // Hide the background element
      document.getElementById("Back")?.classList.remove("Active");
      // Stop observing the entry
    } else {
      // Show the background element
      document.getElementById("Back")?.classList.add("Active");
    }
  });
});

// Start observing an element (section#Partners)
const partners = document.getElementById("Partners");
if (!partners) throw new Error("No partners element");
observer.observe(partners);

const logo = document.getElementById("Logo")?.children[0];
logo?.addEventListener("click", async () => {
  observer.unobserve(partners);
  await logoClick();
});
// const UI = document.getElementById("UI");
// UI?.addEventListener("click", function () {
//   note(800, { reverb: 1 / 8 });
//   // note(800);
//   location.hash = "";
//   return (document.body.className = "Active");
// });
// let x = UI.children.length;
// while (x--) {
//   const a = UI.children[x];
//   if (a.children[0] && a.children[0].children[0])
//     a.children[0].children[0].addEventListener("click", function (e) {
//       e.stopPropagation();
//     });
// }

import { grid } from "./the-grid";
// if (!window.location.origin.includes("localhost") && !window.location.origin.includes("127.0.0.1")) {
const gridDynamic = document.getElementById("grid-dynamic");
if (!gridDynamic) throw new Error("No grid dynamic element");
grid(gridDynamic);
// }

// window.addEventListener("scroll", function scrollHandler() {
//   const scrollDistance = window.scrollY;
//   if (scrollDistance >= 300 * window.innerHeight) {
//     const logo = document.getElementById("Logo");
//     if (logo) {
//       logo.style.opacity = "0";
//     }
//   }
// });

import { sine } from "./sine";
sine();
