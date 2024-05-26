<script>
  import PollDetails from "./PollDetails.svelte";
  import PollStore from "../store/pollstore";
  import { fade, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Button from "../shared/Button.svelte";
  import Loader from "./Loader.svelte";
  import Veil from "./Veil.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  import { getPolls } from "../services/pollService";

  const dispatcher = createEventDispatcher();

  export let forceLoad = false;
  let loading = false;

  onMount(() => {
    if (forceLoad) {
      loading = true;
      PollStore.update(async () => {
        const { polls, success, message } = await getPolls();

        if (success) {
          return polls;
        } else {
          console.error(message);
        }
      });
      loading = false;
    }
  });
</script>

<div class="all">
  {#if !loading}
    <div class="poll-list">
      {#each $PollStore as poll (poll.id)}
        <div in:fade out:scale|local animate:flip={{ duration: 500 }}>
          <PollDetails {poll} />
        </div>
      {:else}
        <div class="empty">
          <div class="info">
            <h3>No Poll(s) at the moment</h3>
            <Button
              color="tertiary"
              flat
              smSize
              on:click={() => dispatcher("addNewClick")}>Add New Poll</Button
            >
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
<Veil {loading}>
  <Loader />
</Veil>

<style>
  .all {
    min-height: 250px;
  }

  .poll-list {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .info {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 540px) {
    .poll-list {
      grid-template-columns: 1fr;
    }
  }

  .empty {
    text-align: center;
    width: 100%;
    min-height: 60svh;

    display: grid;
    place-content: center;
  }
</style>
