<script>
  import { Coffee } from "lucide-svelte";
  import { Button } from "../shared";
</script>

<footer>
  <div class="copyright">
    <ul class="flex gap-1 flex-col">
      <li>
        Developed by <a target="_blank" href="https://github.com/invalid8"
          >Dalgoridim</a
        >
      </li>
      <li>
        Technology <a target="_blank" href="https://svelte.dev">Svelte</a>
      </li>
      <li>
        Source Tutorial <a
          target="_blank"
          href="https://youtu.be/zojEMeQGGHs?si=NyDrYdBy7UxdfaX9">Net Ninja</a
        >
      </li>
      <!-- <Button smSize color="secondary" inverse>
        <span class="font-bold">Buy me a coffee</span><Coffee />
      </Button> -->
    </ul>
  </div>
</footer>

<style>
  footer {
    padding: 40px;
    text-align: center;
    background-color: #f7f7f7;
  }

  .copyright {
    color: #aaa;
    font-size: 14px;
    display: inline-block;
    padding: 20px;
  }

  ul li {
    list-style-type: none;
  }

  ul li a {
    color: var(--primary);
  }
</style>
