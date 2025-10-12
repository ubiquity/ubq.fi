import { fetchTotalRewards } from "./fetch-total-rewards";

export function devPoolSpread() {
  fetchTotalRewards()
    .then((totalRewards) => {
      const totalRewardsElement = document.getElementById("fetch-total-rewards-target");
      if (!totalRewardsElement) throw new Error("No total rewards element");
      const fmt = new Intl.NumberFormat("en-US");
      function n(v: number) {
        return fmt.format(v);
      }
      function usd(v: number) {
        return `$${n(v)}`;
      }
      const grandRewards = totalRewards.rewards.total + (totalRewards.lifetime?.rewardsCompletedUSD ?? 0);
      const completedAll = totalRewards.lifetime?.tasksCompletedAll ?? totalRewards.lifetime?.tasksCompletedPriced ?? 0;
      const grandTasks = totalRewards.tasks.total + completedAll;
      const htmlBuffer = [
        `<h3>${n(grandRewards)} USD in rewards across ${n(grandTasks)} projects</h3>`,
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
              <td>${usd(totalRewards.rewards.notAssigned)}</td>
              <td>${usd(totalRewards.rewards.assigned)}</td>
              <td>${usd(totalRewards.lifetime?.rewardsCompletedUSD ?? 0)}</td>
            </tr>
            <tr>
              <td>Tasks</td>
              <td>${n(totalRewards.tasks.notAssigned)}</td>
              <td>${n(totalRewards.tasks.assigned)}</td>
              <td>${n(completedAll)}</td>
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
const _x = 1;
