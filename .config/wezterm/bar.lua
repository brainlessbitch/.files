local wezterm = require("wezterm")
local colors = require("colors")

local tab_colors = {
    "#ec6a88"
}

wezterm.on(
    "format-tab-title",
    function(tab)
        local accent = tab_colors[(tab.tab_index % #tab_colors) + 1]
        if tab.is_active then
            return wezterm.format({
                { Background = { Color = colors.background } },
                { Foreground = { Color = accent } },
                { Text = "" },
                { Background = { Color = accent } },
                { Foreground = { Color = colors.background } },
                { Text = tostring(tab.tab_index) },
                { Background = { Color = colors.background } },
                { Foreground = { Color = accent } },
                { Text = "" },
            })
        else
            return wezterm.format({
                { Background = { Color = colors.background } },
                { Foreground = { Color = accent } },
                { Text = " " .. tostring(tab.tab_index) .. " " },
            })
        end
    end
)
