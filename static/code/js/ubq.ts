import { logoClick } from "./logo-click";
import { note } from "./note";
import { sine } from "./sine";
import { grid } from "./the-grid";

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

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const backElement = document.getElementById("Back");
    if (entry.isIntersecting) {
      backElement?.classList.remove("Active");
    } else {
      backElement?.classList.add("Active");
    }
  });
});

const partners = document.getElementById("Partners");
if (!partners) throw new Error("No partners element");
observer.observe(partners);

const logo = document.getElementById("Logo")?.children[0];
logo?.addEventListener("click", async () => {
  observer.unobserve(partners);
  await logoClick();
});

const gridDynamic = document.getElementById("grid-dynamic");
if (!gridDynamic) throw new Error("No grid dynamic element");
grid(gridDynamic);

sine();

async function fetchTotalRewards() {
  const response = await fetch("https://raw.githubusercontent.com/ubiquity/devpool-directory/development/total-rewards.txt");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

fetchTotalRewards()
  .then((totalRewards) => {
    const totalRewardsElement = document.getElementById("fetch-total-rewards-target");
    if (!totalRewardsElement) throw new Error("No total rewards element");
    totalRewardsElement.innerText = `$${totalRewards} USD in task rewards now.`;
  })
  .catch((error) => {
    console.error("Error fetching total rewards:", error);
  });
