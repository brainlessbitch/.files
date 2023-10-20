return {
    "nvim-treesitter/nvim-treesitter",
    opts = {
        auto_install = true,
        highlight = { enable = true },
        indent = { enable = true },
    },
    config = function(_, opts)
        require("nvim-treesitter.configs").setup(opts)
    end
}
