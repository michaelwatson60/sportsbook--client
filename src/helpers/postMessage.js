export function sendMessage(key, value) {
  window.parent.postMessage({ [key]: value }, '*');
}
