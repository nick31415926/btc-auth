import { DecodedJWT } from '@btc-auth/sdk';
import { getSession, btcAuthLogin, isSessionValid } from '../../../packages/sdk/src/index';
import { isUnisatAvailable } from '../../../packages/sdk/src/wallet';

const root = document.getElementById('app')!;
root.innerHTML = `
  <h1>BTC Auth Demo</h1>
  <div id="status">Checking login status...</div>
  <button id="loginBtn">Login with Bitcoin</button>
  <button id="logoutBtn" style="display: none;">Logout</button>
`;

const status = document.getElementById('status')!;
const loginBtn = document.getElementById('loginBtn')!;
const logoutBtn = document.getElementById('logoutBtn')!;

if (!isUnisatAvailable()) {
  status.innerHTML = 'Unisat Wallet not detected. <a href="https://unisat.io" target="_blank">Install it here</a> to log in.';
  (loginBtn as HTMLButtonElement).disabled = true;
  loginBtn.style.opacity = '0.5';
}

function updateUI(session: any) {
  if (session) {
    status.textContent = `Logged in as: ${session.address}`;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
  } else {
    status.textContent = 'Not logged in';
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
  }
}

let existingSession: DecodedJWT | null = null;
if (isSessionValid()) {
  existingSession = getSession();
} else {
  localStorage.removeItem('btcAuthToken');
}
updateUI(existingSession);

if (existingSession && (existingSession as DecodedJWT).exp) {
  const interval = setInterval(() => {
    const now = Math.floor(Date.now() / 1000);
    const remaining = (existingSession as DecodedJWT).exp - now;

    if (remaining <= 0) {
      clearInterval(interval);
      localStorage.removeItem('btcAuthToken');
      updateUI(null);
      return;
    }

    if (remaining <= 300) {
      status.innerHTML = `Session expires in ${Math.floor(remaining / 60)}m ${remaining % 60}s. <button id="logoutNow">Logout now</button>`;
      const logoutNowBtn = document.getElementById('logoutNow');
      if (logoutNowBtn) {
        logoutNowBtn.onclick = () => {
          clearInterval(interval);
          localStorage.removeItem('btcAuthToken');
          updateUI(null);
        };
      }
    }
  }, 1000);
}

loginBtn.addEventListener('click', async () => {
  try {
    const result = await btcAuthLogin('http://localhost:3000');
    updateUI(result.decoded);
  } catch (err) {
    console.error(err);
    status.textContent = 'Login failed';
  }
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('btcAuthToken');
  updateUI(null);
});