import express from 'express';
import dotenv from 'dotenv';
import challengeRoute from './routes/challenge';
import verifyRoute from './routes/verify';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Route registrations
app.use('/api/challenge', challengeRoute);
app.use('/api/verify', verifyRoute);

app.listen(port, () => {
  console.log(`BTC Auth server listening on port ${port}`);
});
