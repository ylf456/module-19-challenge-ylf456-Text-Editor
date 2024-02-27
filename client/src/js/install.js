const butInstall = document.getElementById("buttonInstall");
// Logic for installing the PWA
// browser and service worker will determine if the APP can be install
// if the app can be installed, it will store an installation function to the window.deferredPrompt
window.addEventListener("beforeinstallprompt", (event) => {
  console.log('before install')
  // Store the triggered events
  window.deferredPrompt = event;
  // Remove the hidden class from the button.
  butInstall.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt; // retrieves the stored prompt event from window.deferredPrompt.
  // If there is a prompt event available,
  // it calls the prompt() method on it to show the installation prompt to the user.
  if (!promptEvent) {
    // if there is no promptEvent then return
    return;
  }
  // Show prompt
  promptEvent.prompt(); // prompt user , and if true, start installation process
  // Reset the deferred prompt variable, it can only be used once.
  // (clear the install event from window.deferredPrompt variable)
  console.log("successfully installed")
  window.deferredPrompt = null;
  butInstall.classList.toggle("hidden", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("already installed")
  // Clear prompt (clear the install event from window.deferredPrompt variable)
  window.deferredPrompt = null;
});
