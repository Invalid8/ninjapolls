<script>
  import {
    BarChart2,
    GanttChartSquare,
    PlusCircle,
    ScreenShare,
    Vote,
    VoteIcon,
  } from "lucide-svelte";
  import { Button } from "../shared";
  import PollDetails from "../components/PollDetails.svelte";
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { getPollById } from "../services/pollService";

  let search = "";
  let poll;

  onMount(async () => {
    const {
      poll: data,
      success,
      message,
    } = await getPollById(process.env.HOME_POLL, { example: true });

    if (success) poll = data;
  });
</script>

<div class="home min-h-full w-full flex flex-col gap-4 justify-center">
  <div class="swat">
    <div class="banner space-in flex justify-center">
      <div class="info flex flex-col gap-4 sm:text-start text-center">
        <div class="flex gap-2 flex-col">
          <h1 class="items-center font-bold">
            Quickly Set Up and Operate Your<span class="text-tertiary">
              {" "} Polling</span
            >
            Solution For <span class="text-primary">Free</span>
          </h1>
          <p class="text-medium">
            Easily set up and manage your polling system with our platform.
            Create polls, collect votes in real-time, and analyze results
            instantly. Perfect for businesses, schools, and events, our
            user-friendly interface offers the flexibility and reliability you
            need.
          </p>
        </div>
        <div
          class="btn-box flex gap-2 flex-wrap sm:flex-nowrap sm:flex-row flex-col sm:justify-start justify-center items-start sm:items-center"
        >
          <Button
            on:click={() => navigate("/poll")}
            className="sm:mx-0 mx-auto"
          >
            <span class="flex gap-1 items-center fomt-bold">
              <span>Create Poll</span>
              <PlusCircle />
            </span>
          </Button>
          <div class="search-box sm:mx-0 mx-auto">
            <input
              type="text"
              placeholder="Poll ID"
              class="vote"
              on:input={(e) => {
                const value = e.currentTarget.value;
                search = value;
              }}
              value={search.trim()}
            />
            <button
              class={!search && "cursor-none"}
              on:click={() => {
                if (search) navigate(`/poll/${search}`);
              }}>Find Poll</button
            >
          </div>
        </div>
      </div>
      <div
        class="view-box sm:mx-0 mx-auto flex sm:block justify-center items-center"
      >
        <!-- <img src="/pollError.png" alt="error.poll" /> -->
        <div class="inn w-full h-full">
          <PollDetails
            isExample
            disableShare
            poll={poll || {
              poll_id: "356464_43546322-2e43234356",
              question: "Intresting stuff right?",
              answers: [
                {
                  answer: "Yes",
                  votes: 0,
                },
                {
                  answer: "No",
                  votes: 0,
                },
              ],
              link: null,
              totalVotes: 0,
              isAdmin: false,
            }}
          />
        </div>
      </div>
    </div>
    <div class="features space-in flex items-center justify-center flex-col">
      <h2 class="text-larger">Features</h2>
      <div class="feature-list flex flex-wrap gap-4 justify-center">
        <div
          class="feature-item text-center w-280 flex flex-col items-center justify-center"
        >
          <span class="icon-x text-tertairy">
            <BarChart2 size="42px" class="text-tertiary" />
          </span>
          <div class="info flex flex-col gap-1 items-center">
            <h3>Easy Poll Creation</h3>
            <p>
              Create polls in just a few clicks with our intuitive interface.
            </p>
          </div>
        </div>
        <div
          class="feature-item text-center w-280 flex flex-col items-center justify-center"
        >
          <span class="icon-x text-tertairy">
            <VoteIcon size="42px" class="text-secondary" />
          </span>
          <div class="info flex flex-col gap-1 items-center">
            <h3>Real-Time Voting</h3>
            <p>
              Collect votes in real-time and watch results update instantly.
            </p>
          </div>
        </div>
        <div
          class="feature-item text-center w-280 flex flex-col items-center justify-center"
        >
          <span class="icon-x text-tertairy">
            <GanttChartSquare size="42px" class="text-primary" />
          </span>
          <div class="info flex flex-col gap-1 items-center">
            <h3>Detailed Analytics</h3>
            <p>
              Analyze voting patterns with our comprehensive analytics tools.
            </p>
          </div>
        </div>
        <div
          class="feature-item text-center w-280 flex flex-col items-center justify-center"
        >
          <span class="icon-x text-tertairy">
            <ScreenShare size="42px" class="text-color" />
          </span>
          <div class="info flex flex-col gap-1 items-center">
            <h3>Multi-Device Support</h3>
            <p>Access and vote on polls from any device, anywhere.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section class="space-in w-full flex justify-center">
    <div class="feedback flex justify-between items-center gap-4 flex-wrap">
      <img
        class="mx-auto sm:mx-0"
        alt="Live polling"
        srcset="https://images.ctfassets.net/rvt0uslu5yqp/63IE7tzWsucVnVoM9Ui2Am/839bf3579582ceedd4bf62b77e42252e/Mentimeter_Web_Live-Polling_2022-11__1_.svg?&amp;w=640&amp;q=75 1x, https://images.ctfassets.net/rvt0uslu5yqp/63IE7tzWsucVnVoM9Ui2Am/839bf3579582ceedd4bf62b77e42252e/Mentimeter_Web_Live-Polling_2022-11__1_.svg?&amp;w=1200&amp;q=75 2x"
        src="https://images.ctfassets.net/rvt0uslu5yqp/63IE7tzWsucVnVoM9Ui2Am/839bf3579582ceedd4bf62b77e42252e/Mentimeter_Web_Live-Polling_2022-11__1_.svg?&amp;w=1200&amp;q=75"
      />
      <div class="flex flex-col gap-2 w-600">
        <h2 class="text-larger" id="instant-dynamic-feedback">
          <span class="">Instant &amp; dynamic feedback</span>
        </h2>
        <p
          class="f-ci f-dy f-dz f-p f-ea r-text leading-normal break-words max-w-full text-100 text-weak font-body"
        >
          Answers from your audience will appear in real-time with our dynamic
          and vibrant visuals. Our interactive slides will grow and change as
          your audience's submissions stream in. You can also add images and
          GIFs for some added fun and visual effect.
        </p>
        <p
          class="f-ci f-dy f-dz f-p f-ea r-text leading-normal break-words max-w-full text-100 text-weak font-body"
        ></p>
      </div>
    </div>
  </section>
</div>

<style>
  section {
    display: flex;
    justify-content: center;
  }

  .home {
    width: 100%;
    gap: 40px;
  }

  .features {
    background-color: #dbd7d7e0;
  }

  .banner {
    gap: 30px;
    padding-top: 10px;
  }

  .banner .info {
    width: 100%;
    max-width: 600px;
  }

  .view-box {
    height: fit-content;
    overflow: hidden;

    max-width: 450px;
    width: calc(280px + 10vmax);
    min-width: 280px;
  }

  .inn {
    overflow: auto hidden;
  }

  .search-box {
    height: 40px;
    min-height: 40px;

    overflow: hidden;
    border-radius: 6px;

    display: flex;
    border: 1px solid #cccccc95;
  }

  .search-box input {
    width: 180px;
    min-width: 180px;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    border-radius: 6px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    padding-left: 10px;

    border: none;
  }

  .search-box button {
    width: fit-content;
    border: none;
    padding: 8px 16px;
    font-weight: bold;
    background-color: var(--tertiary);
    color: #fff;
  }

  .cursor-none {
    cursor: not-allowed;
  }

  .space-in {
    padding: 40px;
  }

  .feedback img {
    width: 400px;
  }

  @media (min-width: 721px) {
    .swat {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 100vh;
    }

    .swat > .banner {
      min-height: 60vh;
      align-items: center;
    }

    .swat > .features {
      min-height: 40vh;
    }
  }

  @media (max-width: 720px) {
    .banner {
      flex-direction: column;
      margin-top: 20px;
    }

    .view-box {
      min-width: fit-content;
    }
  }

  @media (max-width: 450px) {
    .space-in {
      padding: 20px;
    }

    .feedback img {
      width: 350px;
    }
  }

  @media (max-width: 360px) {
    .feedback img {
      width: 300px;
    }
  }
</style>
