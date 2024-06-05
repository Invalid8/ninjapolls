<script>
  // @ts-nocheck

  import { Button, Modal } from "flowbite-svelte";
  import {
    Email,
    Reddit,
    LinkedIn,
    Pinterest,
    Telegram,
    WhatsApp,
    Facebook,
    X,
  } from "svelte-share-buttons-component";
  import { showNotification } from "../lib";
  import { ClipboardCheck, ClipboardCopy } from "lucide-svelte";

  export let open = false;
  export let poll;

  const MAIN_URL = window.location.origin;
  const url = `${MAIN_URL}/poll/${poll.id}`;

  const title = `PollProxy poll`;
  const desc = `Hey 😎!, Come participate in this poll, your vote counts. ✅`;

  const getPlatformSpecificText = (platform) => {
    switch (platform) {
      case "WhatsApp":
        return `*${title}* \n\n${desc}\n\n*Link*: ${url}`;
      case "Email":
        return `${title}\n\n${desc}\n\nLink: ${url}`;
      case "Facebook":
        return `${title} - ${desc} ${url}`;
      case "X":
        return `${title}\n${desc}\n`;
      case "Telegram":
        return `${desc}\n\n${url}`;
      case "Reddit":
        return `${title}\n\n${desc}\n\n${url}`;
      case "LinkedIn":
        return `${title}\n\n${desc}\n\n${url}`;
      default:
        return `${title} - ${desc} ${url}`;
    }
  };

  const copyToClipboard = async ({ link }) => {
    const text = `${title}\n\n${desc}\n\n${url}`;
    try {
      await navigator.clipboard.writeText(link ? url : text);
      showNotification("info", "top-right", undefined, {
        message: "Copied to clipboard!",
      });
    } catch (err) {
      showNotification("error", "top-right", undefined, {
        message: `Failed to copy: ${err.message}`,
      });
    }
  };
</script>

{#if poll}
  <Modal title="Share Poll" {open} autoclose size="sm">
    <div class="conte">
      <p class="description text-lg">
        {desc}
        <a href={url}>{url}</a>
        {" "}
        <button
          class="b bg-transparent dark:bg-transparent text-sm w-fit m-0"
          on:click={() => copyToClipboard({ link: true })}
        >
          <ClipboardCheck size="22" />
        </button>
      </p>
      <div
        class="share-buttons flex gap-2 flex-wrap justify-center items-center"
      >
        <button class="bg-black share-button" on:click={copyToClipboard}>
          <ClipboardCopy />
        </button>
        <Facebook
          class="share-button"
          quote={getPlatformSpecificText("Facebook")}
          {url}
        />
        <X
          class="share-button"
          text={getPlatformSpecificText("X")}
          {url}
          hashtags="polling,voting,webdevelopment"
          via="dalgoridim"
          related="other,users"
        />
        <WhatsApp
          class="share-button"
          text={getPlatformSpecificText("WhatsApp")}
        />
        <Telegram
          class="share-button"
          text={getPlatformSpecificText("Telegram")}
          {url}
        />
        <Email
          subject={title}
          body={getPlatformSpecificText("Email")}
          class="share-button"
        />

        <Reddit class="share-button" {title} {url} />
        <LinkedIn class="share-button" {url} />
        <Pinterest
          class="share-button"
          {url}
          media="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/200px-Svelte_Logo.svg.png"
          description={title}
        />
      </div>
    </div>
    <svelte:fragment slot="footer">
      <Button color="alternative" on:click={() => (open = false)}>Cancel</Button
      >
    </svelte:fragment>
  </Modal>
{/if}

<style>
  .description {
    margin-bottom: 1rem;
    text-align: center;
  }
  .share-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }

  :global(.share-button) {
    border-radius: 6px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column !important;
    width: 2.5rem !important;
    height: 2.5rem !important;
  }
</style>
