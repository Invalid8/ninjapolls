<script>
  import { Router, Route } from "svelte-routing";
  import { Home, NotFound, Admin, User, Poll, Help } from "./pages";
  import { fade, slide } from "svelte/transition";
  import { ThemeSwitch, Header, Footer } from "./components";

  export let url = "";
</script>

<div class="wrapper">
  <Header />
  <main in:fade out:slide|local>
    <Router {url}>
      <Route path="/" component={Home} />
      <Route path="/poll" component={User} />
      <Route path="/admin" component={Admin} />
      <Route path="/help" component={Help} />
      <Route path="/poll/:id" let:params>
        <Poll id={params.id} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </main>
  <Footer />
</div>

<div class="hover-t">
  <ThemeSwitch />
</div>

<style>
  .hover-t {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 100vh;
  }

  main {
    width: 100%;
    height: 100%;
  }
</style>
