<script>
  import { onMount } from "svelte";
  import { PollDetails, Veil, Loader } from "../components";
  import { Button } from "../shared";
  import { Plus } from "lucide-svelte";
  import { navigate } from "svelte-routing";
  import { getPollById } from "../services/pollService";

  export let id;
  let poll;
  let loading = true;

  onMount(async () => {
    loading = true;
    const { success, message, poll: data } = await getPollById(id);
    if (success) poll = data;
    else {
      window.alert(message);
    }

    loading = false;
  });
</script>

{#if !loading}
  <div class="polling">
    <div class="other">
      <Button smSize on:click={() => navigate("/poll")}>
        <span class="flexy w-fit ic font-bold">
          <span>Create Poll</span>
          <Plus />
        </span>
      </Button>
    </div>

    <PollDetails {poll} />
    <div class="flexy col">
      <p>
        If problem persist with the poll contact <a
          target="_blank"
          href="mailto:b.fadamitan2019@gmail.com">@Dalgoridim</a
        >
      </p>
    </div>
  </div>
{/if}
<Veil {loading}>
  <Loader />
</Veil>

<style>
  .polling {
    display: flex;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: fit-content;
    margin: 0 auto;
    padding: 20px;
  }

  .flexy {
    display: flex;
    gap: 5px;
  }

  .font-bold {
    font-weight: bold;
  }

  .col {
    flex-direction: column;
  }

  .ic {
    align-items: center;
  }

  .w-fit {
    width: fit-content;
  }

  .other {
    display: flex;
    justify-content: end;
    width: 100%;
  }
</style>
