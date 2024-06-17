export async function fetchTotalRewards() {
  const response = await fetch("https://raw.githubusercontent.com/ubiquity/devpool-directory/development/total-rewards.json");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return (await response.json()) as TotalRewards;
}

interface TotalRewards {
  rewards: {
    notAssigned: number;
    assigned: number;
    completed: number;
    total: number;
  };
  tasks: {
    notAssigned: number;
    assigned: number;
    completed: number;
    total: number;
  };
}
