(local wezterm (require :wezterm))
(local colors (require :colors))

(local tab_colors [
       (. colors.ansi 2)
       (. colors.ansi 4)
       (. colors.ansi 3)
       (. colors.ansi 7)
       (. colors.ansi 5)
       (. colors.ansi 6)
       ])

(wezterm.on :format-tab-title
            (fn [tab]
              (let [accent (. tab_colors 
                              (+ (% tab.tab_index (length tab_colors)) 1))]
              (if tab.is_active
                  (wezterm.format [{:Background {:Color accent}}
                                  {:Foreground {:Color colors.background}}
                                  {:Text (.. " " (tostring tab.tab_index) " ")}])
                  (wezterm.format [{:Background {:Color colors.background}}
                                  {:Foreground {:Color accent}}
                                  {:Text (.. " " (tostring tab.tab_index) " ")}])
                  ))))
