local augroup = vim.api.nvim_create_augroup
local autocmd = vim.api.nvim_create_autocmd

autocmd("TextYankPost", {
    callback = function()
        vim.highlight.on_yank({
            higroup = "IncSearch",
            timeout = "1000"
        })
    end
})

autocmd("BufWritePre", {
    pattern = "",
    command = ":%s/\\s\\+$//e"
})

autocmd("BufWritePre", {
    pattern = "",
    command = ":silent lua vim.lsp.buf.format()"
})

autocmd("BufEnter", {
    pattern = "",
    command = "set fo-=c fo-=r fo-=o"
})

autocmd("Filetype", {
  pattern = "tex",
  command = "set textwidth=50 colorcolumn=50"
})

autocmd("BufWritePost", {
    pattern = "style.scss",
    command = ":! sassc ./style.scss ./style.css"
})
