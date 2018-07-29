const publicVapidKey =
  'BF0XbUuuf1coR3-uy6SyXlpTTJ-Kk30q3b7m9D9MDTWObEj04KI2pwgrqPURG2WguD9IAfY9zhSmr5vYrBlVhuc';

if ('serviceWorker' in navigator) {
  send().catch(err => console.error(err));
}

async function send() {
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  });
  console.log(register);
  console.log('Service Worker Registered');

  console.log('Registering Push');
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log(subscription);
  console.log('Push registered');

  console.log('sending push notification');
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log('Push sent');
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
