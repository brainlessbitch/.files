#  ____   _
# |_  /__| |_  _ _ __  - exoess
#  / /(_-< ' \| '_/ _| - https://github.com/exoess/.dotfiles
# /___/__/_||_|_| \__| - My zsh config

# Vars
env_file="$HOME/env_variables"

if [ -f "$env_file" ]; then
    while IFS= read -r line; do
        export "$line"
    done < "$env_file"
else
    echo "Err: $env_file not found"
fi

export HISTORY_IGNORE="(cd|cd -|cd ..|exit|history|ls|pwd|sudo reboot)"

if [ -d "$HOME/.local/bin" ] ;
  then PATH="$HOME/.local/bin:$PATH"
fi

# Load Engine
autoload -Uz compinit

for dump in ~/.config/zsh/zcompdump(N.mh+24); do
  compinit -d ~/.config/zsh/zcompdump
done

compinit -C -d ~/.config/zsh/zcompdump

autoload -Uz add-zsh-hook
autoload -Uz vcs_info
precmd () { vcs_info }
_comp_options+=(globdots)

zstyle ':completion:*' verbose true
zstyle ':completion:*:*:*:*:*' menu select
zstyle ':completion:*:default' list-colors ${(s.:.)LS_COLORS}
zstyle ':completion:*' matcher-list '' 'm:{a-zA-Z}={A-Za-z}'

# History
HISTFILE=~/.config/zsh/zhistory
HISTSIZE=5000
SAVEHIST=5000

# Zsh Options
setopt AUTOCD              # change directory just by typing its name
setopt PROMPT_SUBST        # enable command substitution in prompt
setopt MENU_COMPLETE       # Automatically highlight first element of completion menu
setopt LIST_PACKED		   # The completion menu takes less space.
setopt AUTO_LIST           # Automatically list choices on ambiguous completion.
setopt HIST_IGNORE_DUPS	   # Do not write events to history that are duplicates of previous events
setopt HIST_FIND_NO_DUPS   # When searching history don't display results already cycled through twice
setopt COMPLETE_IN_WORD    # Complete from both ends of a word.

# Prompt

# Plugins
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-history-substring-search/zsh-history-substring-search.zsh

bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down

# Change Terminal Title
function xterm_title_precmd () {
	print -Pn -- '\e]2;%n@%m %~\a'
	[[ "$TERM" == 'screen'* ]] && print -Pn -- '\e_\005{g}%n\005{-}@\005{m}%m\005{-} \005{B}%~\005{-}\e\\'
}

function xterm_title_preexec () {
	print -Pn -- '\e]2;%n@%m %~ %# ' && print -n -- "${(q)1}\a"
	[[ "$TERM" == 'screen'* ]] && { print -Pn -- '\e_\005{g}%n\005{-}@\005{m}%m\005{-} \005{B}%~\005{-} %# ' && print -n -- "${(q)1}\e\\"; }
}

if [[ "$TERM" == (kitty*|alacritty*|urxvt*|screen*|tmux*|xterm*) ]]; then
	add-zsh-hook -Uz precmd xterm_title_precmd
	add-zsh-hook -Uz preexec xterm_title_preexec
fi

# Alias
alias maintenance="yay -Sc && sudo pacman -Scc"
alias purge="sudo pacman -Rns $(pacman -Qtdq) ; sudo fstrim -av"
alias update="yay -Syu"

alias ls='lsd -a --group-directories-first'
#alias ls='lsd -a --group-directories-first --icon never'
alias ll='lsd -la --group-directories-first'
#alias ll='lsd -la --group-directories-first --icon never'

# Autostart

#echo -e "\e[1;32m---,--'-{\e[0;31m@"

# Starship
export STARSHIP_CONFIG=~/starship.toml
eval "$(starship init zsh)"
