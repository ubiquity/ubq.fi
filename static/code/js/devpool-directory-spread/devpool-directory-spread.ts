import { fetchTotalRewards } from "./fetch-total-rewards";

export function devPoolSpread() {
  fetchTotalRewards()
    .then((totalRewards) => {
      const totalRewardsElement = document.getElementById("fetch-total-rewards-target");
      if (!totalRewardsElement) throw new Error("No total rewards element");
      const htmlBuffer = [
        `<h3>${totalRewards.rewards.total} USD in rewards across ${totalRewards.tasks.total} projects</h3>`,
        `
        <table id="analytics">
          <thead>
            <tr>
              <th></th>
              <th>Available</th>
              <th>Ongoing</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rewards</td>
              <td>$${totalRewards.rewards.notAssigned}</td>
              <td>$${totalRewards.rewards.assigned}</td>
              <td>$${totalRewards.rewards.completed}</td>
            </tr>
            <tr>
              <td>Tasks</td>
              <td>${totalRewards.tasks.notAssigned}</td>
              <td>${totalRewards.tasks.assigned}</td>
              <td>${totalRewards.tasks.completed}</td>
            </tr>
          </tbody>
        </table>
      `,
      ].join("\n");
      totalRewardsElement.innerHTML = htmlBuffer;
    })
    .catch((error) => {
      console.error("Error fetching total rewards:", error);
    });
}
