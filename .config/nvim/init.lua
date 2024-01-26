if vim.loader and vim.fn.has "nvim-0.9.1" == 1 then vim.loader.enable() end

for _, source in ipairs {
  "astronvim.bootstrap",
  "astronvim.options",
  "astronvim.lazy",
  "astronvim.autocmds",
  "astronvim.mappings",
} do
  local status_ok, fault = pcall(require, source)
  if not status_ok then vim.api.nvim_err_writeln("Failed to load " .. source .. "\n\n" .. fault) end
end

if astronvim.default_colorscheme then
  if not pcall(vim.cmd.colorscheme, "horizon") then
    require("astronvim.utils").notify(
      ("Error setting up colorscheme: `%s`"):format(astronvim.default_colorscheme),
      vim.log.levels.ERROR
    )
  end
end

require("astronvim.utils").conditional_func(astronvim.user_opts("english", nil, false), true)

--[[
local buf = vim.api.nvim_create_buf(false, true)

function NewcolFunc() vim.cmd "vnew" end
]]
--
--[[
vim.cmd "function! Newcol(a, b, c, d) \n lua NewcolFunc() \n endfunction"
local Newcol = [[%@Newcol@%## Newcol %X]]
--
--[[
vim.cmd "function! Exit(a, b, c, d) \n q! \n endfunction"
local Exit = [[%@Exit@%##Exit%X]]
--
--[[
function OpenAcme()
  vim.api.nvim_set_current_buf(buf)

  vim.api.nvim_buf_set_option(buf, "tabline", Newcol .. Exit)

  vim.api.nvim_buf_set_option(buf, "bufhidden", "wipe")
  vim.api.nvim_buf_set_option(buf, "swapfile", false)
  vim.api.nvim_buf_set_option(buf, "modifiable", false)
  vim.api.nvim_buf_set_option(buf, "buftype", "nofile")
  vim.api.nvim_buf_set_option(buf, "filetype", "acmeContainer")
  vim.api.nvim_buf_set_option(buf, "colorcolumn", "")
  vim.api.nvim_buf_set_option(buf, "cursorcolumn", false)
  vim.api.nvim_buf_set_option(buf, "cursorline", false)
  vim.api.nvim_buf_set_option(buf, "number", false)
  vim.api.nvim_buf_set_option(buf, "relativenumber", false)
  vim.api.nvim_buf_set_option(buf, "signcolumn", "no")
end

vim.cmd "command! OpenAcme lua OpenAcme()"
]]
--
