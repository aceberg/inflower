[![Docker](https://github.com/aceberg/inflower/actions/workflows/main-docker-all.yml/badge.svg)](https://github.com/aceberg/inflower/actions/workflows/main-docker-all.yml)
[![Binary-release](https://github.com/aceberg/inflower/actions/workflows/binary-release.yml/badge.svg)](https://github.com/aceberg/inflower/actions/workflows/binary-release.yml)
![Docker Image Size (latest semver)](https://img.shields.io/docker/image-size/aceberg/inflower)

<h1><a href="https://github.com/aceberg/inflower">
    <img src="https://raw.githubusercontent.com/aceberg/inflower/main/assets/logo.png" width="20" />
</a>inflower</h1>
<br/>

Personal finance tracker

![Screenshot_1](https://raw.githubusercontent.com/aceberg/inflower/main/assets/Screenshot_1.png)  

## Quick start

```sh
docker run --name inflower \
-e "TZ=$YOURTIMEZONE" \
-v ~/.dockerdata/inflower:/data/inflower \
-p 8859:8859 \
aceberg/inflower
```

## Config

Configuration can be done through `config.yaml` file or GUI, or environment variables

| Variable  | Description | Default |
| --------  | ----------- | ------- |
| HOST | Listen address | 0.0.0.0 |
| PORT   | Port for web GUI | 8859 |
| THEME | Any theme name from https://bootswatch.com in lowcase or [additional](https://github.com/aceberg/aceberg-bootswatch-fork) | cerulean |
| COLOR | Background color: light or dark | dark |
| TZ | Set your timezone for correct time | "" |

## Options

| Key  | Description | Default | 
| --------  | ----------- | ------- | 
| -d | Path to config dir | /data/inflower | 

## Thanks
- [Bootstrap](https://getbootstrap.com/)
- Themes: [Free themes for Bootstrap](https://bootswatch.com)
- Favicon and logo: <a href="https://www.flaticon.com/free-icons/graph" title="graph icons">Graph icons created by Magnific - Flaticon</a>