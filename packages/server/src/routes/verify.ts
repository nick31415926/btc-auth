import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { Router } from 'express';
const bitcoinMessage = require('bitcoinjs-message');
const jwt = require('jsonwebtoken');
import { challenges } from './challenge';

const router = Router();

router.post('/', async (req, res) => {
  const { address, signature } = req.body;
  const challenge = challenges.get(req.ip || 'unknown');

  if (!challenge) {
    return res.status(400).json({ error: 'No challenge found for IP' });
  }

  try {
    const isValid = bitcoinMessage.verify(challenge, address, signature);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Generate JWT session token
    const token = jwt.sign({ address }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Clear challenge after use
    challenges.delete(req.ip || 'unknown');

    // Respond with signed JWT
    return res.json({ token, address });
  } catch (err) {
    return res.status(500).json({ error: 'Verification failed', details: err });
  }
});

export default router;