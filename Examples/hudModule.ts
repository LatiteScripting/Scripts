/*const test = new HudModule(
  "TestModule",
  "Test Hud Module",
  "",
  KeyCode.F6,
  true,
);

client.getModuleManager().registerModule(test);

test.on("render", (isPreview, isEditor) => {
  try {
    let text = "test hud module";
    let size = graphics.getTextSize(text, 1, Font.Smooth);
    let currentRect = test.getRect();
    test.setRect(
      new Rect(
        currentRect.left,
        currentRect.top,
        currentRect.left + size.x,
        currentRect.top + size.y,
      ),
    );
    graphics.drawText(
      new Rect(0, 0, size.x, size.y),
      [1, 0, 0, 1],
      text,
      1,
      Font.Smooth,
      TextAlignment.Left,
    );
  } catch (e) {
    script.log(e);
  }
});

client.on("unload-script", (ev) => {
  if (ev.scriptName == script.name) {
    client.getModuleManager().deregisterModule(test);
  }
});
*/

// outdated