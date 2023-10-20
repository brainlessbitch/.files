return {--[[
    "lukas-reineke/indent-blankline.nvim",
    main = "ibl",
    opts = {
        indent = { char = "▎" },
        scope = {
            enabled = true,
            show_start = true,
            show_end = true,
        },
    },
    config = function(_, opts)
        require("ibl").setup(opts)
    end]]--
}
