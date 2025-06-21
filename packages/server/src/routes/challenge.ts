import { Router } from 'express';
import crypto from 'crypto';

const router = Router();

// In-memory challenge store (temporary — replace with Redis or DB later)
const challenges = new Map<string, string>();

router.get('/', (req, res) => {
  const nonce = crypto.randomBytes(32).toString('hex');
  challenges.set(req.ip || 'unknown', nonce);
  res.send(nonce);
});

// Export challenges map so it can be accessed from verify.ts
export { router as default, challenges };