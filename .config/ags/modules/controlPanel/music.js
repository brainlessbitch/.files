const Mpris = await Service.import("mpris");

const MusicControls = () =>
  Widget.Box({
    className: "controls",
    hpack: "end",
    hexpand: true,
    children: [
      Widget.Button({
        className: "controlsPrev",
        label: "󰒮",
        onClicked: () => Mpris.players[0].previous(),
      }),
      Widget.Button({
        className: "controlsPlayPause",
        label: "󰐊",
        onClicked: () => Mpris.players[0].playPause(),
        setup: (self) => {
          self.hook(Mpris, (self) => {
            const player = Mpris.players[0];
            if (!player) return;

            self.label = `${
              player !== null && player.playBackStatus === "Playing" ? "󰏤" : "󰐊"
            }`;
          });
        },
      }),
      Widget.Button({
        className: "controlsNext",
        label: "󰒭",
        onClicked: () => Mpris.players[0].next(),
      }),
    ],
  });

export const MusicWidget = () =>
  Widget.Box({
    className: "music",
    children: [
      Widget.Box({
        className: "cover",
        setup: (self) => {
          self.hook(Mpris, (self) => {
            const player = Mpris.players[0];
            if (!player) return;

            self.css = `background-image: url('${player.coverPath}');`;
          });
        },
      }),
      Widget.Box({
        children: [
          Widget.Box({
            vertical: true,
            children: [
              Widget.Label({
                className: "title",
                hpack: "start",
                label: "N/A",
                justification: "center",
                truncate: "end",
                maxWidthChars: 10,
                setup: (self) => {
                  self.poll(1000, (self) => {
                    const player = Mpris.players[0];
                    if (!player) return;

                    self.label = `${player.trackTitle}`;
                  });
                },
              }),
              Widget.Label({
                className: "artist",
                hpack: "start",
                label: "N/A",
                justification: "center",
                useMarkup: true,
                truncate: "end",
                maxWidthChars: 12,
                setup: (self) => {
                  self.hook(Mpris, (self) => {
                    const player = Mpris.players[0];
                    if (!player) return;

                    self.label = `${player.trackArtists.join(", ")}`;
                  });
                },
              }),
            ],
          }),
          MusicControls(),
        ],
      }),
    ],
  });
