-- Set leader
vim.g.mapleader = ","
-- Close and exit
vim.keymap.set("n", "<leader>q", ":qa!<CR>", {})
-- Quick save
vim.keymap.set("n", "<leader>s", ":w<CR>", {})
-- Reload config
vim.keymap.set("n", "<C-A>r", ":so %<CR>", {})

-- Disable arrow keys for movement
--[[
vim.keymap.set('n', '<Up>', '<Nop>')
vim.keymap.set('n', '<Down>', '<Nop>')
vim.keymap.set('n', '<Right>', '<Nop>')
vim.keymap.set('n', '<Left>', '<Nop>')
]]--
