import { createSignal } from "solid-js";

function Header() {

  const [themePath, setThemePath] = createSignal('');
  const [iconsPath, setIconsPath] = createSignal('');  

  setThemePath("https://cdn.jsdelivr.net/npm/aceberg-bootswatch-fork@v5.3.3-2/dist/"+"grass"+"/bootstrap.min.css");
  setIconsPath("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css");

  return (
    <>
    <link rel="stylesheet" href={iconsPath()}></link> {/* icons */}
    <link rel="stylesheet" href={themePath()}></link> {/* theme */}
    <nav class="navbar navbar-expand-md navbar-dark bg-primary">
      <div class="container-lg">
        <a class="navbar-brand" href="/">
          <img src="/fs/public/favicon.png" style="width: 2em"/>
        </a>
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link active" href="/" title="Home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/config/" title="Config">Config</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/history/" title="History">History</a>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active fs-3 ms-md-2" target="_blank" href="https://github.com/aceberg/inflower" title="Github"><i class="bi bi-github"></i></a>
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
};

export default Header
