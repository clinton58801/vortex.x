import axios from 'axios';

export async function cancelSubscription(subscriptionId, token) {
  try {
    const response = await axios.post('/api/cancel-subscription', { subscriptionId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Cancellation failed:', error);
    throw error;
  }
}
