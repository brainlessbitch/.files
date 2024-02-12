const Audio = await Service.import("audio");

const Icon = () =>
  Widget.Label({
    className: "volIcon",
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

const Slider = () =>
  Widget.Slider({
    className: "volSlider",
    drawValue: false,
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

export const VolumeSlider = () =>
  Widget.Box({
    className: "volumeSlider",
    vertical: true,
    children: [
      Widget.Label({
        className: "volLabel",
        label: "Volume",
        hpack: "start",
      }),
      Widget.Box({
        children: [Icon(), Slider()],
      }),
    ],
  });
