<script>
  import { Menu, X } from "lucide-svelte";
  import Logo from "./Logo.svelte";
  import { Button } from "../shared";
  import { Link, Router } from "svelte-routing";

  let menuIsOpen = false;

  function handleToggle() {
    menuIsOpen = !menuIsOpen;
  }
</script>

<Router>
  <header class="flex gap-2">
    <h2>
      <a href="/">
        <Logo />
      </a>
    </h2>
    <div class="otha">
      <Button on:click={handleToggle}><Menu /></Button>
    </div>
    <nav class="flex {menuIsOpen && 'show'}">
      {#if menuIsOpen}
        <div class="close w-full flex">
          <Button on:click={handleToggle} flat><X /></Button>
        </div>
      {/if}
      <ul class="flex items-center gap-4 flex-wrap">
        <li>
          <Link class="font-bold" on:click={handleToggle} let:active to="/"
            ><span class={active ? "text-primary" : "text-color"}>Home</span
            ></Link
          >
        </li>
        <li>
          <Link class="font-bold" on:click={handleToggle} let:active to="/poll"
            ><span class={active ? "text-primary" : "text-color"}
              >Create Poll</span
            ></Link
          >
        </li>
        <li>
          <Link class="font-bold" on:click={handleToggle} let:active to="/help"
            ><span class={active ? "text-primary" : "text-color"}
              >How to create?</span
            ></Link
          >
        </li>
      </ul>
    </nav>
  </header>
</Router>

<style>
  header {
    background-color: #f7f7f7;
    padding: 20px 25px;
    margin: 0 auto;
    width: 100%;
    max-width: 840px;
    align-items: center;
    justify-content: space-between;
  }

  h2 {
    user-select: none;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  @media (min-width: 541px) {
    .otha,
    .close {
      display: none;
    }
  }

  @media (max-width: 540px) {
    header {
      padding: 10px 20px;
    }

    nav {
      position: fixed;
      width: 100%;
      height: 100%;

      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      background-color: #000000cb;
      color: #fff;

      display: grid;
      place-items: center;
      place-content: center;
      gap: 10px;

      padding: 20px;
      font-size: 120%;

      opacity: 0;
      visibility: hidden;
      z-index: -1000;
    }

    nav.show {
      opacity: 100%;
      visibility: visible;
      z-index: 1000;
    }

    .close {
      justify-content: end;
      position: absolute;
      top: 20px;
      right: 20px;
    }

    nav ul {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
