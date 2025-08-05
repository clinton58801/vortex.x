export async function verifyUserPlan(email) {
  // 👇 FAKE lookup logic for testing
  if (email.includes('pro')) return 'Pro';
  if (email.includes('premium')) return 'Premium';
  return 'Free';
}
