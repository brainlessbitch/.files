package.path = "/usr/share/lua/5.4/?.lua;" .. package.path
local fennel = require("fennel")
local wezterm = require("wezterm")

configDir = os.getenv("HOME") .. "/.config/wezterm/"

fennel.path = fennel.path .. ";" .. configDir .. "?.fnl;"

table.insert(package.searchers, fennel.searcher)
return require("init")
