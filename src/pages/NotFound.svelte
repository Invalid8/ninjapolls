<script>
  import { slide } from "svelte/transition";
  import { Button } from "../shared";
  import { navigate } from "svelte-routing";

  let pageName = "Not Found";

  const faces = [
    "(⓿_⓿)",
    "ฅʕ•̫͡•ʔฅ",
    "¯\\_( ͡° ͜ʖ ͡°)_/¯",
    "¯\\_(ツ)_/¯",
    "ψ(._. )>",
    "◑﹏◐",
    "(ง •_•)ง",
    "(✿◠‿◠)",
    "(★‿★)",
    "༼ つ ◕_◕ ༽つ",
    "~(=^‥^)ノ",
    "( ͡° ͜ʖ ͡°)",
    "¯\\_(ツ)_/¯",
  ];

  let faceId = 0;

  setInterval(() => {
    faceId = Math.floor(Math.random() * faces.length);
  }, 2500);
</script>

<div class="page-not-found flex-column">
  <div class="info">
    <div class="big" transition:slide>{faces[faceId || 0]}</div>
    <h3>Page Not Found</h3>
    <p>
      Yh, you have definalely lost your way 💀<br /> I guess you were probably
      snooping about❗<br /><span class="sm"
        >(Now see where you have landed yourself).</span
      >
    </p>
  </div>
  <div class="btn-box">
    <Button color="secondary" on:click={() => window.history.back()}
      >Back</Button
    >
    <Button on:click={navigate("/")}>Home</Button>
  </div>
</div>

<style>
  .big {
    font-size: 30px;
    margin-bottom: 10px;
  }

  .sm {
    font-size: 14px;
  }

  .info {
    text-align: center;
    justify-content: center;
    align-items: center;
    gap: 5px;
    font-size: 120%;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .btn-box {
    margin-top: 5px;
    justify-content: center;
    display: flex;
    gap: 10px;
  }
</style>
