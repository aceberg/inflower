import { GithubIcon } from "../../functions/icons";
import { configStore } from "../../store/configs";

function Header() {

  return (
    <>
    <link rel="stylesheet" href={configStore.themePath()}></link> {/* theme */}
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <div class="container-lg">

        <a class="navbar-brand" href="/">
          <img src="/fs/public/favicon.png" style="width: 2em"></img>
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNavbar">

          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <a class="nav-link active" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/config/">Config</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/history/">History</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/months/">Months</a>
            </li>
          </ul>

          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                class="nav-link active fs-3 ms-md-2"
                target="_blank"
                href="https://github.com/aceberg/inflower"
                title="GitHub">
                <GithubIcon></GithubIcon>
              </a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
    </>
  )
};

export default Header
