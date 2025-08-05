export function getFeaturesForPlan(plan) {
  switch (plan) {
    case 'Free':
      return ['Basic AI Agent', 'Limited History'];
    case 'Pro':
      return ['Advanced AI Agent', 'Chat History', 'Export Options'];
    case 'Premium':
      return ['All Pro Features', 'Custom Agents', 'Unlimited Use', 'Priority Support'];
    default:
      return [];
  }
}
