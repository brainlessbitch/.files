const { exec, execAsync } = Utils;

const Date = () =>
  Widget.Label({
    className: "dateLabel",
    setup: (self) => {
      self.poll(1000, (self) => (self.label = exec('date "+%a %b %e"')));
      self.poll(1000, (self) =>
        execAsync(["date", "+%a %b %e"])
          .then((time) => (self.label = time))
          .catch(console.error),
      );
    },
  });

const Time = () =>
  Widget.Label({
    className: "timeLabel",
    setup: (self) => {
      self.poll(1000, (self) => (self.label = exec('date "+%l:%M"')));
      self.poll(1000, (self) =>
        execAsync(["date", "+%l:%M"])
          .then((time) => (self.label = time))
          .catch(console.error),
      );
    },
  });

export const Clock = () =>
  Widget.Box({
    className: "clock",
    children: [Date(), Time()],
  });
