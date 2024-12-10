<script>
  import Button from "../shared/Button.svelte";
  import { tweened } from "svelte/motion";
  import {
    deletePollById,
    vote,
    toggleStatusById,
  } from "../services/pollService";
  import { cn, showNotification } from "../lib";
  import { Share2 } from "lucide-svelte";
  import ShareLink from "./ShareLink.svelte";

  export let poll;
  export let disableShare = false;
  export let isExample = false;

  $: totalVotes = poll?.totalVotes;
  let loading = false;

  $: percententals = poll
    ? poll.answers?.map((/** @type {{ votes: number; }} */ e) => {
        let p = Math.floor((100 / totalVotes) * e.votes) || 0;
        return p;
      })
    : [0, 0, 0, 0, 0];

  let tweenes = tweened([0, 0, 0, 0, 0]);
  $: tweenes.set(percententals);

  /**
   * @param {any} option
   * @param {any} id
   */
  async function handleVote(option, id) {
    if (!poll.isActive) {
      showNotification("error", "top-right", undefined, {
        message: "Poll is not active",
      });
      return;
    }
    if (poll.user.option == option) return;

    const pollId = id;

    loading = true;

    // Optimistic update
    poll.totalVotes = !poll.user.option ? poll.totalVotes + 1 : poll.totalVotes;
    poll.answers = poll.answers.map((/** @type {{ answer: any; votes: number; }} */ e) => {
      if (e.answer === option) {
        return { ...e, votes: e.votes + 1 };
      } else if (e.answer === poll.user.option) {
        return {
          ...e,
          votes: e.votes - 1,
        };
      } else {
        return e;
      }
    });
    
    poll.user.option = option;

    const {
      poll: data,
      message,
      success,
    } = await vote({ id: pollId, answer: option }, { example: isExample });

    if (success) {
      poll = data;
    } else if(message !== 'canceled')
      showNotification("error", "top-right", undefined, { message: message });

    loading = false;
  }

  /**
   * @param {any} id
   */
  async function handleDelete(id) {
    loading = true;
    const { message, success } = await deletePollById(id);

    showNotification(success ? "success" : "error", "top-right", undefined, {
      message: message,
    });

    loading = false;
  }

  async function handleStatusToggle(id) {
    loading = true;
    const { message, success } = await toggleStatusById(id);

    showNotification(success ? "success" : "error", "top-right", undefined, {
      message: message,
    });

    loading = false;
  }

  let colors = ["a", "b", "c", "a", "b"];

  $: openShare = false;

  function toggleShare() {
    openShare = !openShare;
  }
</script>

{#if !disableShare && poll && poll.isActive}
  <ShareLink open={openShare} {poll} />
{/if}

<div class="poll">
  {#if poll}
    {#if !disableShare && poll.isActive}
      <div class="share absolute top-5 right-5">
        <button on:click={toggleShare}><Share2 /></button>
      </div>
    {/if}
    <div class="flex flex-col gap-1">
      <h3 class="title">{poll?.question}</h3>
      <p>Total votes: {poll?.totalVotes}</p>
      {#if !poll.isActive}
        <div class="text-red-600 flex items-center gap-1">
          <div class="w-2 h-2 rounded-full bg-red-500"></div>
          Deactivated
        </div>
      {/if}
    </div>
    {#each poll?.answers as option, index}
      <button
        class="answer overflow-hidden"
        on:keydown
        on:click={() => {
          handleVote(option.answer, poll?.id);
        }}
      >
        <div
          class={cn(
            "percent",
            `percent-${colors[index]}`,
            poll?.user?.option === option?.answer && "opt"
          )}
          style="width: {$tweenes[index]}%"
        ></div>
        <span class="ab">{option.answer} ({option.votes})</span>
      </button>
    {/each}
    {#if poll.isAdmin}
      <div class="delete flex items-center gap-2 justify-center">
        <Button
          flat
          on:click={() => handleStatusToggle(poll?.id)}
          borderd
          color={poll.isActive ? "primary" : "secondary"}
        >
          {#if poll.isActive}
            Deactivate
          {:else}
            Activate
          {/if}
        </Button>
        <Button flat on:click={() => handleDelete(poll?.id)}>Delete</Button>
      </div>
    {/if}
  {:else}
    <div class="emptyy">
      <h3>Error getting poll data</h3>
      <p>
        Poll may have ended or deleted by owner, request for the right poll url
        if the poll you are looking for exist.
      </p>
    </div>
  {/if}
</div>

<style>
  .poll {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    border-radius: 6px;
    background-color: #ffffffdc;
    position: relative;
    max-width: 450px;
    width: calc(280px + 10vmax);
    min-width: 280px;
    overflow: hidden;
  }

  @media (max-width: 450px) {
    .poll {
      width: 320px;
    }
  }

  .loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #0000004c;
    z-index: 900;
  }

  h3 {
    color: #555;
  }

  p {
    font-style: 14px;
    color: #aaa;
  }

  .answer {
    background-color: #fafafa;
    cursor: pointer;
    margin: 10px auto;
    width: 100%;
    position: relative;
    user-select: none;
  }

  .answer:hover {
    opacity: 0.6;
  }

  span {
    display: inline-block;
    padding: 10px 20px;
  }

  .percent {
    height: 100%;
    position: absolute;
    border-left: 4px solid grey;
  }

  .percent-a {
    background-color: var(--primary-a);
  }

  .percent-a.opt {
    border-left-color: var(--primary);
  }

  .percent-b {
    background-color: var(--secondary-a);
  }

  .percent-b.opt {
    border-left-color: var(--secondary);
  }

  .percent-c {
    background-color: var(--tertiary-a);
  }

  .percent-c.opt {
    border-left-color: var(--tertiary);
  }

  .delete {
    margin-top: 10px;
    text-align: center;
  }

  .emptyy {
    border-left: 4px solid red;
    padding-left: 10px;
  }

  .emptyy p {
    padding-top: 5px;
  }
</style>
