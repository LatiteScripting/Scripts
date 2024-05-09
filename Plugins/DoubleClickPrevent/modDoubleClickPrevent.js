let modDoubleClickPrevent = new Module("DoubleClickPrevent", "Double Click Prevent", "Adds a window after clicking where subsequent clicks are ignored.", 0);
client.getModuleManager().registerModule(modDoubleClickPrevent);
let optDebounce = modDoubleClickPrevent.addNumberSetting("debounce", "Debounce Time (ms)", "Window where subsequent clicks are ignored", 0, 50, 1, 0);
let lastValidClickTime = [0, 0];
client.on("click", e => {
    if (!modDoubleClickPrevent.isEnabled())
        return;
    if (!e.isDown)
        return;
    if (!(e.button == 1 || e.button == 2))
        return;
    let clickTime = Date.now();
    if (lastValidClickTime[e.button - 1] + optDebounce.getValue() > clickTime) {
        e.cancel = true;
    }
    else {
        lastValidClickTime[e.button - 1] = clickTime;
    }
});
