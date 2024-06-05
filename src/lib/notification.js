import { toasts, ToastContainer } from "svelte-toasts";

/**
 * @param {import("svelte-toasts/types/common").ToastType} type
 * @param {import("svelte-toasts/types/common").Placement} position
 * @param {number | undefined} autoClose
 * @param {{message: string}} options
 */
function showNotification(type, position, autoClose, options) {
  toasts.add({
    description: options.message || "message",
    duration: autoClose || 3000,
    placement: position || "top-right",
    type: type || "info",
    theme: "dark",
  });
}

export { ToastContainer, showNotification, toasts };
