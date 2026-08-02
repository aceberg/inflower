package main

import (
	"flag"

	_ "time/tzdata"

	"github.com/aceberg/inflower/internal/conf"
	"github.com/aceberg/inflower/internal/gdb"
	"github.com/aceberg/inflower/internal/web"
)

const dirPath = "/data/inflower"

func main() {
	dirPtr := flag.String("d", dirPath, "Path to config dir")
	flag.Parse()

	// Make AppConfig
	conf.Start(*dirPtr)

	gdb.Start()

	web.Gui()
}
