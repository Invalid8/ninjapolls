import { writable } from "svelte/store";
import { io } from "socket.io-client";
import { getPolls } from "../services/pollService";

const PollStore = writable([]);

const socket = io(process.env.SOCKET_URL); // Adjust the URL to your backend

socket.on("pollUpdated", ({ poll, id }) => {
  // Update the store when a poll is updated
  PollStore.update((polls) => {
    const index = polls.findIndex((p) => p.id === id);
    if (index !== -1) {
      polls[index] = poll;
    } else {
      polls = [poll, ...polls];
    }
    return polls;
  });
});

socket.on("updateFully", (polls) => {
  // Update the store when a poll is updated
  PollStore.update(() => {
    return polls;
  });
});

export const fetchPolls = async () => {
  const { success, message, polls } = await getPolls();

  if (success) PollStore.set(polls);
  else console.error(message);
};

fetchPolls();

export default PollStore;
