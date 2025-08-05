import { verifyUserPlan } from './PlanVerifier.js';

...

<button
  onClick={async () => {
    if (!email) return alert('Enter your email');
    const verifiedPlan = await verifyUserPlan(email);
    onSignup({ name: email.split('@')[0], plan: verifiedPlan });
  }}
>
  Sign Up
</button>
