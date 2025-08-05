let usage = {};

export function trackUsage(user) {
  const today = new Date().toISOString().split('T')[0];

  if (!usage[user.name]) {
    usage[user.name] = { [today]: 1 };
  } else {
    if (!usage[user.name][today]) {
      usage[user.name][today] = 1;
    } else {
      usage[user.name][today]++;
    }
  }
}

export function getUsageCount(user) {
  const today = new Date().toISOString().split('T')[0];
  return usage[user.name]?.[today] || 0;
}

export function resetUsage(user) {
  const today = new Date().toISOString().split('T')[0];
  if (usage[user.name]) usage[user.name][today] = 0;
}
