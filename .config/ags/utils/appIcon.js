function queryExact(appName) {
  return (
    Applications.list.filter(
      (app) => app.name.toLowerCase() === appName.toLowerCase(),
    )[0] ?? Applications.query(appName)[0]
  );
}

export default ({
  appName,
  onClicked = () => queryExact(appName).launch(),
  icon = queryExact(appName).iconName,
  // size = 36,
  ...props
}) => {
  const appIcon = Widget.Button({
    onClicked,
    child: Widget.Icon({
      icon,
      // size,
      ...props,
    }),
  });
  return appIcon;
};
