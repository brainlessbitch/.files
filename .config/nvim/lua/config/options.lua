local cmd = vim.cmd
local opt = vim.opt
local g = vim.g
local o = vim.o
local s = vim.s
local indent = 4

cmd([[ filetype plugin indent on ]])

opt.spell = true

-- Encoding & characters
opt.encoding = "utf-8"
opt.fileencoding = "utf-8"

-- Backspacing behavior
opt.backspace = {"eol", "start", "indent"}

-- Clipboard
opt.clipboard = "unnamedplus"

-- Syntax highlighting
opt.syntax = "enable"

-- Indentation
opt.autoindent = true
opt.expandtab = true
opt.linebreak = true
opt.shiftround = true
opt.shiftwidth = indent
opt.smartindent = true
opt.smarttab = true
opt.softtabstop = indent
opt.tabstop = indent

-- Search
opt.hlsearch = true
opt.ignorecase = true
opt.incsearch = true
opt.smartcase = true
opt.wildignore = opt.wildignore + {}
opt.wildmenu = true

-- ui
opt.cursorline = true
opt.laststatus = 2
opt.lazyredraw = true
opt.list = true
opt.listchars = {
    tab = "▎ ",
    trail = "·",
    extends = "»",
    precedes = "«",
    nbsp = "×"
}
opt.modeline = true

-- Command line height
opt.cmdheight = 0

-- Mouse
opt.mouse = "a"

-- Line numbers
opt.number = true
opt.relativenumber = true

-- Scrolling
opt.scrolloff = 18
opt.sidescrolloff = 3

-- Sign column
opt.signcolumn = "yes"

-- Line wrapping
opt.wrap = false

-- Backup & swap
opt.backup = false
opt.swapfile = false
opt.writebackup = false

-- Autocomplete
opt.completeopt = {"menu", "menuone", "noselect"}
opt.shortmess = opt.shortmess + { c = true }

-- Performance
opt.history = 100
opt.redrawtime = 1500
opt.timeoutlen = 250
opt.ttimeoutlen = 10
opt.updatetime = 100

-- Theme
opt.termguicolors = true

-- Persistent undo
local undodir = vim.fn.stdpath("data") .. "/undo"
opt.undodir = undodir
opt.undofile = true
opt.undolevels = 1000
opt.undoreload = 10000

-- Disable built-in plugins
local disabled_built_ins = {}

for _, plugin in pairs(disabled_built_ins) do
    g["loaded_" .. plugin] = 1
end

-- Colorscheme
cmd.colorscheme("adwaita")

-- Italicized comments
cmd.hi("Comment gui='italic'")

-- Set transparency
local transparent = false
if transparent == true then
    cmd.hi("Normal ctermbg=none guibg=none")
    cmd.hi("NormalNC ctermbg=none guibg=none")
    cmd.hi("LineNr ctermbg=none guibg=none")
    cmd.hi("SignColumn ctermbg=none guibg=none")
end

-- Neovide
if g.neovide then
    o.guifont = "Maple Mono NF:h10"
    g.neovide_padding_top = 10
    g.neovide_padding_bottom = 10
    g.neovide_padding_right = 10
    g.neovide_padding_left = 10
    g.neovide_transparency = 0.9
    g.neovide_theme = 'light'
    g.neovide_cursor_vfx_mode = "pixiedust"
end
