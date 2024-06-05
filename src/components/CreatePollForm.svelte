<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../shared/Button.svelte";
  import { createPoll } from "../services/pollService";
  import Loader from "./Loader.svelte";
  import Veil from "./Veil.svelte";
  import { Trash } from "lucide-svelte";
  import { showNotification } from "../lib";

  const dispatcher = createEventDispatcher();

  let loading = false;

  $: options_pack = [
    {
      id: "356432",
      value: "",
      error: "",
      inp: false,
    },
    {
      id: "8754547",
      value: "",
      error: "",
      inp: false,
    },
  ];

  const question = {
    inp: false,
    error: "",
    value: "",
  };

  $: {
    if (question.inp)
      if (question.value.trim().length < 5) {
        question.error = "Question must be at least 5 characters long";
      } else {
        question.error = "";
      }
  }

  const arrayNumAlpha = [
    {
      num: 1,
      letter: "a",
    },
    {
      num: 2,
      letter: "b",
    },
    {
      num: 3,
      letter: "c",
    },
    {
      num: 4,
      letter: "d",
    },
    {
      num: 5,
      letter: "e",
    },
  ];

  function handleAddOption() {
    const op = {
      id: Date.now(),
      value: "",
      error: "",
      inp: false,
    };

    // @ts-ignore
    options_pack = [...options_pack, op];
  }

  /**
   * @param {string} id
   */
  function deleteOption(id) {
    options_pack = options_pack.filter((e) => e.id !== id);
  }

  const handleSubmit = async () => {
    const isValid = options_pack.every((e) => !e.error) && !question.error;

    const body = {
      question: question.value,
      options: options_pack.map((a) => {
        let p = a.value;
        return p;
      }),
    };

    if (isValid) {
      loading = true;

      const { success, message, poll } = await createPoll(body);

      if (success) {
        dispatcher("addPoll", true);
      }

      showNotification(success ? "success" : "error", "top-right", undefined, {
        message: message,
      });

      loading = false;
    }
  };
</script>

<Veil {loading}>
  <Loader />
</Veil>
<form on:submit|preventDefault={handleSubmit} class="createPoll">
  <div class="form-field">
    <label for="question">Poll Question: </label>
    <input
      type="text"
      id="question"
      bind:value={question.value}
      required
      on:input={() => {
        question.inp = true;
      }}
    />
    <div class="error">{question.error}</div>
  </div>
  {#if options_pack.length !== 5}
    <div class="flex items-center justify-end">
      <Button color="tertiary" on:click={handleAddOption}>Add Option</Button>
    </div>
  {/if}
  {#each options_pack as op, index (op.id)}
    <div class="form-field">
      <label for={`option-${arrayNumAlpha[index].letter}`} class="w-full">
        <span class="w-full flex justify-between items-center gap-4">
          <span>Option {arrayNumAlpha[index].letter}: </span>
          {#if options_pack.length > 2}
            <button class="text-primary" on:click={() => deleteOption(op.id)}>
              <Trash size={16} class="text-primary" />
            </button>
          {/if}
        </span>
      </label>
      <input
        type="text"
        id={`option-${arrayNumAlpha[index].letter}`}
        name={`option-${arrayNumAlpha[index].letter}`}
        bind:value={op.value}
        required
        on:input={() => {
          op.inp = true;

          if (op.value.length < 1) op.error = "Option cannot be empty";
          else op.error = "";
        }}
      />
      {#if op.inp}
        <div class="error">
          {op.error}
        </div>
      {/if}
    </div>
  {/each}
  <Button type="submit" fullWidth>Add Poll</Button>
</form>

<style>
  form {
    max-width: 400px;
    width: 100%;
    text-align: center;
    margin: 0 auto;

    display: flex;
    gap: 10px;
    flex-direction: column;
  }

  input {
    width: 100%;
    border-radius: 6px;
  }

  label {
    margin-bottom: 10px;
    text-align: left;
    text-transform: capitalize;
  }

  button {
    border: none;
    box-shadow: none;
    background-color: transparent;
  }

  .error {
    color: var(--primary);
    font-weight: bold;
    font-size: 12px;
    text-align: left;
  }
</style>
