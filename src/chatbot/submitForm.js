const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL';

export async function postToAppsScript(payload, url = APPS_SCRIPT_URL) {
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // silent fail - never show errors to visitor
  }
}

export { APPS_SCRIPT_URL };
