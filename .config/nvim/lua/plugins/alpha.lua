return {
  "goolord/alpha-nvim",
  cmd = "Alpha",
  opts = function()
    local dashboard = require "alpha.themes.dashboard"
    dashboard.section.header.val = {
      "+[-->-[>>+>-----<<]<--<---]>-.>>>+.>>..+++[.>]<<<<.+++.------.<<-.>>>>+."
    }
    dashboard.section.header.opts.hl = "DashboardHeader"
    dashboard.section.footer.opts.hl = "DashboardFooter"

    local alpha_button, get_icon = require("astronvim.utils").alpha_button, require("astronvim.utils").get_icon
    local function button(icon, txt, func)
      return {
        type = "button",
        val = icon .. txt,
        on_press = func,
        opts = {
          position = "center",
          text = icon .. txt,
          shortcut = "",
          cursor = -2,
          width = 36,
          align_shortcut = "right",
          hl = "DashboardCenter",
        }
      }
    end

    local function course_menu()
      return vim.ui.select({
        "Computer Science",
        "English",
        "Gender Studies",
        "Chemistry",
        "History",
        "Algebra",
      }, {
        prompt = "Select Course",
        backend = "builtin",
      }, function(selected)
          if selected then
            return vim.cmd("e " ..
              os.getenv("HOME") ..
              "/notes/" ..
              selected:gsub("%s", ""):sub(1,1):lower() ..
              selected:gsub("%s", ""):sub(2) ..
              "/" ..
              os.date("%d-%m-%y", os.time()) .. ".tex")
          end
        end)
    end


    dashboard.section.buttons.val = {
      alpha_button("LDR n  ", get_icon("FileNew", 2, true) .. "New File  "),
      alpha_button("LDR f f", get_icon("Search", 2, true) .. "Find File  "),
      alpha_button("LDR f o", get_icon("DefaultFile", 2, true) .. "Recents  "),
      alpha_button("LDR f w", get_icon("WordFile", 2, true) .. "Find Word  "),
      alpha_button("LDR f '", get_icon("Bookmarks", 2, true) .. "Bookmarks  "),
      alpha_button("LDR S l", get_icon("Refresh", 2, true) .. "Last Session  "),
      button("󰎚  ", "New Note", course_menu)
    }

    dashboard.config.layout = {
      { type = "padding", val = vim.fn.max { 2, vim.fn.floor(vim.fn.winheight(0) * 0.2) } },
      dashboard.section.header,
      { type = "padding", val = 5 },
      dashboard.section.buttons,
      { type = "padding", val = 3 },
      dashboard.section.footer,
    }
    dashboard.config.opts.noautocmd = true
    return dashboard
  end,
  config = require "plugins.configs.alpha",
}
