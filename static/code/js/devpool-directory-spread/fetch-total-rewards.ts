export async function fetchTotalRewards() {
  const response = await fetch("https://raw.githubusercontent.com/ubiquity/devpool-directory/development/total-rewards.txt");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}
