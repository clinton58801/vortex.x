const plans = {
  Free: {
    name: 'Free',
    maxChats: 10,
    exportEnabled: false,
    historyEnabled: false,
  },
  Pro: {
    name: 'Pro',
    maxChats: 500,
    exportEnabled: true,
    historyEnabled: true,
  },
  Premium: {
    name: 'Premium',
    maxChats: Infinity,
    exportEnabled: true,
    historyEnabled: true,
  },
};

export function getPlanFeatures(planName) {
  return plans[planName] || plans.Free;
}

export function isExportAllowed(planName) {
  return plans[planName]?.exportEnabled;
}

export function isHistoryEnabled(planName) {
  return plans[planName]?.historyEnabled;
}
