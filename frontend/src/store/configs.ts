import { createStore } from "solid-js/store";
import { Conf, emptyConf } from "../functions/models";
import { apiGetConfig, apiGetDate, apiPath } from "../functions/api";
import { createSignal } from "solid-js";

const [config, setConfig] = createStore<Conf>(emptyConf);
const [themePath, setThemePath] = createSignal<string>(apiPath+"/fs/public/themes/cerulean/bootstrap.min.css");
const [today, setToday] = createSignal<string>(new Date().toJSON().slice(0, 10));

function changeBackColor(color:string) {
    document.documentElement.setAttribute("data-bs-theme", color);
    color === "dark"
        ? document.documentElement.style.setProperty('--transparent-light', '#ffffff15')
        : document.documentElement.style.setProperty('--transparent-light', '#00000015');
}

async function syncDate() {
    const date = await apiGetDate();
    if (String(date) === "") {
        setToday(new Date().toJSON().slice(0, 10));
    } else {
        setToday(String(date));
    }
}

async function reload() {
    setConfig(await apiGetConfig());

    const theme = config.Theme ? config.Theme : "cerulean";
    const color = config.Color ? config.Color : "dark";

    changeBackColor(color);

    setThemePath(apiPath+"/fs/public/themes/"+theme+"/bootstrap.min.css");
}

export const configStore = {
    config,
    themePath,
    setThemePath,
    today,

    reload,
    changeBackColor,
    syncDate,
};
