local wezterm = require 'wezterm'

require("bar")

local config = {}

config.alternate_buffer_wheel_scroll_speed = 1
config.bold_brightens_ansi_colors = true
config.colors = require("colors")
config.cursor_thickness = "2px"
config.custom_block_glyphs = false
config.enable_tab_bar = true
config.font = wezterm.font('UbuntuMonoNerdFont')
config.font_size = 12.0
--config.freetype_render_target = "Mono"
config.hide_tab_bar_if_only_one_tab = true
config.initial_cols = 30
config.initial_rows = 10
config.show_tab_index_in_tab_bar = false
config.term = 'wezterm'
--config.underline_position = 1
config.underline_thickness = "0.1cell"
config.use_fancy_tab_bar = false
config.window_background_opacity = 0.1
config.window_close_confirmation = 'NeverPrompt'
config.window_padding = { top = 25, bottom = 25, left = 25, right = 25 }

return config
