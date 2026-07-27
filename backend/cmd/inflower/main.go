package main

import (
	"flag"

	_ "time/tzdata"

	"github.com/aceberg/inflower/internal/conf"
	"github.com/aceberg/inflower/internal/gdb"
	"github.com/aceberg/inflower/internal/web"
)

const dirPath = "/data/inflower"
const nodePath = ""

func main() {
	dirPtr := flag.String("d", dirPath, "Path to config dir")
	nodePtr := flag.String("n", nodePath, "Path to node modules")
	flag.Parse()

	// Make AppConfig
	conf.Start(*dirPtr, *nodePtr)

	gdb.Start()

	web.Gui()
}
