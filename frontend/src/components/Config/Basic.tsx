import { For, Show } from "solid-js";
import { apiPath } from "../../functions/api"
import { configStore } from "../../store/configs";

function Basic() {

  const themes = ["cerulean", "cosmo", "cyborg", "darkly", "emerald", "flatly", "grass", "grayscale", "journal", "litera", "lumen", "lux", "materia", "minty", "morph", "ocean", "pulse", "quartz", "sand", "sandstone", "simplex", "sketchy", "slate", "solar", "spacelab", "superhero", "united", "vapor", "wood", "yeti", "zephyr"];

  const handleTheme = (theme:string) => {
    configStore.setThemePath(apiPath+"/fs/public/themes/"+theme+"/bootstrap.min.css");
  };

  const handleColor = (color:string) => {
    configStore.changeBackColor(color);
  };

  return (
    <div class="card border-primary">
      <div class="card-header">Basic config</div>
      <div class="card-body table-responsive">
        <form action={apiPath + '/api/config/'} method="post">
          <table class="table table-borderless">
          <tbody>
            <tr>
              <td>Host</td>
              <td><input name="host" type="text" class="form-control" value={configStore.config.Host}></input></td>
            </tr>
            <tr>
              <td>Port</td>
              <td><input name="port" type="text" class="form-control" value={configStore.config.Port}></input></td>
            </tr>
            <tr>
              <td>Theme</td>
              <td>
                <select name="theme" class="form-select" onChange={(e)=>handleTheme(e.currentTarget.value)}>
                <For each={themes}>{theme =>
                  <Show
                    when={theme == configStore.config.Theme}
                    fallback={<option value={theme}>{theme}</option>}
                  >
                    <option value={theme} selected>{theme}</option>
                  </Show>
                }</For>
                </select>
              </td>
            </tr>
            <tr>
               <td>Color mode</td>
               <td>
                <select name="color" class="form-select" onChange={(e)=>handleColor(e.currentTarget.value)}>
                <Show
                  when={configStore.config.Color == "dark"}
                  fallback={<>
                    <option value="dark">dark</option>
                    <option value="light" selected>light</option>
                  </>}
                >
                  <option value="dark" selected>dark</option>
                  <option value="light">light</option>
                </Show>
                </select>
               </td>
            </tr>
            <tr>
              <td><button type="submit" class="btn btn-primary">Save</button></td>
              <td></td>
            </tr>
          </tbody>
          </table>
        </form>
      </div>
    </div>
  )
}

export default Basic