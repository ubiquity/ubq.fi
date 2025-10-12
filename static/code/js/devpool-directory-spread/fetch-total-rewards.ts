import { clearCache, fetchContentsJSON, getCachedJSON } from "./github-contents";

const SUMMARY_PATH = "summary.json";
const STATISTICS_PATH = "statistics.json";

export async function fetchTotalRewards() {
  const qs = new URLSearchParams(location.search);
  const shouldForceRefresh = qs.has("devpoolRefresh") || qs.has("devpoolFresh");
  const shouldClearCache = qs.has("devpoolClearCache");

  if (shouldClearCache) {
    clearCache(SUMMARY_PATH);
    clearCache(STATISTICS_PATH);
  }

  // Optimize by checking summary first; if unchanged, reuse cached statistics.
  const cachedStats = getCachedJSON<TotalRewards>(STATISTICS_PATH);
  let shouldRefetchStats = true;

  try {
    const summaryResult = await fetchContentsJSON(SUMMARY_PATH, {
      bypassEtag: shouldForceRefresh,
    });
    if (!shouldForceRefresh && summaryResult.notModified && cachedStats) {
      shouldRefetchStats = false;
    }
  } catch (_e) {
    // If summary fetch fails, fall back to cached stats if present.
    if (cachedStats) return cachedStats;
  }

  if (!shouldRefetchStats && cachedStats) {
    return cachedStats;
  }

  const statsResult = await fetchContentsJSON<TotalRewards>(STATISTICS_PATH, {
    bypassEtag: shouldForceRefresh,
  });
  if (!statsResult.json) throw new Error("Empty statistics payload");
  return statsResult.json;
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
  lifetime: {
    rewardsCompletedUSD: number;
    tasksCompletedPriced: number;
    tasksCompletedAll: number;
  };
}
