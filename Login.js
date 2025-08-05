import { verifyUserPlan } from './PlanVerifier.js';

...

<button
  onClick={async () => {
    const email = prompt('Enter your email address to log in');
    if (!email) return;
    const verifiedPlan = await verifyUserPlan(email);
    onLogin({ name: email.split('@')[0], plan: verifiedPlan });
  }}
>
  Login as Demo
</button>
