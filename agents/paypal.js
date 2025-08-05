import axios from 'axios';

export async function createSubscription(planId, token) {
  try {
    const response = await axios.post('/api/subscribe', { planId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Subscription failed:', error);
    throw error;
  }
}
