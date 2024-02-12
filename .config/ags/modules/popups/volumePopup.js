const Audio = await Service.import("audio");

const VolumeIcon = () =>
  Widget.Label({
    className: "volPopupIcon",
    setup: (self) => {
      self.hook(
        Audio,
        (self) => {
          if (!Audio.speaker) return;

          const icons = ["󰝟", "󰕿", "󰖀", "󰕾"];

          self.label =
            icons[
              Audio.speaker.stream.isMuted
                ? 0
                : Math.floor((Audio.speaker.volume * 100) / 26)
            ].toString();
        },
        "speaker-changed",
      );
    },
  });

const PercentBar = () =>
  Widget.Slider({
    className: "volPopupBar",
    drawValue: false,
    vertical: true,
    inverted: true,
    onChange: ({ value }) => (Audio.speaker.volume = value),
    setup: (self) => {
      self.hook(
        Audio,
        (self) => {
          if (!Audio.speaker) return;

          self.value = Audio.speaker.volume;
        },
        "speaker-changed",
      );
    },
  });

export const VolumePopup = () =>
  Widget.Box({
    css: `min-height: 1px;
          min-width: 1px;`,
    child: Widget.Revealer({
      transition: "slide_left",
      child: Widget.Box({
        className: "volumePopup",
        vertical: true,
        children: [PercentBar(), VolumeIcon()],
      }),
      attribute: { count: 0 },
      setup: (self) => {
        self.hook(
          Audio,
          (self) => {
            self.revealChild = true;
            self.attribute.count++;
            Utils.timeout(1500, () => {
              self.attribute.count--;

              if (self.attribute.count === 0) self.revealChild = false;
            });
          },
          "speaker-changed",
        );
      },
    }),
  });
