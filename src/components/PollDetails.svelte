<script>
  import Button from "../shared/Button.svelte";
  import { tweened } from "svelte/motion";
  import { deletePollById, vote } from "../services/pollService";

  export let poll;
  export let forView = true;
  export let disabled = false;

  $: totalVotes = poll?.totalVotes;
  let loading = false;

  $: percententals = poll
    ? poll.answers?.map((e) => {
        let p = Math.floor((100 / totalVotes) * e.votes) || 0;
        return p;
      })
    : [0, 0, 0, 0, 0];

  let tweenes = tweened([0, 0, 0, 0, 0]);
  $: tweenes.set(percententals);

  async function handleVote(option, id) {
    loading = true;
    const { poll: data, message, success } = await vote({ id, answer: option });

    if (success) {
      poll = data;
    } else alert(message);

    loading = false;
  }

  async function handleDelete(id) {
    loading = true;
    const { message } = await deletePollById(id);

    window.alert(message);

    loading = false;
  }

  let colors = ["a", "b", "c", "a", "b"];
</script>

<div class="poll">
  {#if poll}
    {#if loading || poll.hasVoted}
      <div class="loading"></div>
    {/if}
    <h3 class="title">{poll?.question}</h3>
    <p>Total votes: {poll?.totalVotes}</p>
    {#each poll?.answers as option, index}
      <div
        class="answer"
        on:click={() => {
          if (!disabled) handleVote(option.answer, poll?.id);
          else {
            poll.answers = poll?.answers.map((e) => {
              if (e.answer === option.answer) {
                e.value += 1;
                console.log("log", e);
              } else e.value -= 1;

              return e;
            });
          }
        }}
        on:keypress
      >
        <div
          class="percent percent-{colors[index]}"
          style="width: {$tweenes[index]}%"
        ></div>
        <span class="ab">{option.answer} ({option.votes})</span>
      </div>
    {/each}
    {#if !forView}
      <div class="delete">
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
    margin-bottom: 20px;
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
  }

  .percent-a {
    border-left: 4px solid var(--primary);
    background-color: var(--primary-a);
  }

  .percent-b {
    border-left: 4px solid var(--secondary);
    background-color: var(--secondary-a);
  }

  .percent-c {
    border-left: 4px solid var(--tertiary);
    background-color: var(--tertiary-a);
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
