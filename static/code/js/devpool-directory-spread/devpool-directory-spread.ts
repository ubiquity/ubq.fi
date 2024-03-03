import { fetchTotalRewards } from "./fetch-total-rewards";

export function devPoolSpread() {
  document.addEventListener("DOMContentLoaded", () => {
    const iframe = document.querySelector("#DevPool iframe") as HTMLIFrameElement;
    if (!iframe) throw new Error("No iframe element");
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!iframe) throw new Error("No iframe element");
        iframe.src = "https://work.ubq.fi/";
        observer.disconnect();
      }
    }, {});
    observer.observe(iframe);
  });

  fetchTotalRewards()
    .then((totalRewards) => {
      const totalRewardsElement = document.getElementById("fetch-total-rewards-target");
      if (!totalRewardsElement) throw new Error("No total rewards element");
      totalRewardsElement.innerText = `$${totalRewards} USD in task rewards now.`;
    })
    .catch((error) => {
      console.error("Error fetching total rewards:", error);
    });
}
