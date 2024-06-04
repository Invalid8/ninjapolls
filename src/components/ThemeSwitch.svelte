<script>
  import { onMount } from "svelte";
  import { Sun, Moon } from "lucide-svelte";

  let theme = "light";

  // Check localStorage for user's preferred theme
  onMount(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      theme = savedTheme;
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.className = theme;
    }
  });

  const toggleTheme = () => {
    theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  };
</script>

<div class="switch" on:click={toggleTheme}>
  {#if theme === "light"}
    <Sun class="icon" />
  {:else}
    <Moon class="icon" />
  {/if}
</div>

<style>
  .switch {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background-color: var(--tertiary);
    color: #000;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.4s;
  }

  .switch:hover {
    background-color: #bbb;
  }
</style>
