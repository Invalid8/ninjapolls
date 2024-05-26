async function hashFunction(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

// Function to generate a fingerprint
export async function generateFingerprint() {
  // Collect browser information
  const userAgent = navigator.userAgent;
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const platform = navigator.platform;

  // Combine browser information into a string
  const fingerprintData = userAgent + screenWidth + screenHeight + platform;

  // Hash the fingerprint data to generate a unique identifier
  const hash = await hashFunction(fingerprintData);

  return hash;
}

// Function to store or retrieve the fingerprint
export async function getFingerprint() {
  let fingerprint = localStorage.getItem("fingerprint");
  if (!fingerprint) {
    fingerprint = await generateFingerprint();
    localStorage.setItem("fingerprint", fingerprint);
  }
  return fingerprint;
}
