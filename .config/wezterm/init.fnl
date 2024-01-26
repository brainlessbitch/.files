(local wezterm (require :wezterm))

(require :bar)

(local config {})

(set config.alternate_buffer_wheel_scroll_speed 1)
(set config.bold_brightens_ansi_colors false)
(set config.colors (require :colors))
(set config.cursor_thickness :2px)
(set config.custom_block_glyphs false)
(set config.enable_tab_bar true)
;(set config.font (wezterm.font "CMU Typewriter Text"))
(set config.font (wezterm.font :VictorMonoNerdFont))
;(set config.font (wezterm.font :MapleMonoNF))
(set config.font_size 11.0)
;(set config.freetype_render_target :Mono)
(set config.hide_tab_bar_if_only_one_tab true)
(set config.initial_cols 30)
(set config.initial_rows 10)
(set config.show_tab_index_in_tab_bar false)
(set config.term :wezterm)
;(set config.underline_position 1)
(set config.underline_thickness :0.1cell)
(set config.use_fancy_tab_bar false)
(set config.window_background_opacity 1.0)
(set config.window_close_confirmation :NeverPrompt)
(set config.window_padding {:top 25 :bottom 25 :left 25 :right 25})
(set config.window_decorations :NONE)
(comment
"(set config.background [{
                          :source {:File :/home/bunbun/Downloads/pixmap.png}
                          :repeat_x :Repeat
                          :repeat_x_size :1cell
                          :repeat_y :Repeat
                          :repeat_y_size :1cell
                          :height :1.1cell
                          :width :1.1cell
                          }])")
config
