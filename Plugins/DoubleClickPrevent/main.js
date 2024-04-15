let mod = new Module("doubleClickPrevent", "Double Click Prevent", "Adds a window after clicking where subsequent ones are ignored. (Only works with mouse buttons)", 0);
client.getModuleManager().registerModule(mod);

let optDebounce = mod.addNumberSetting("debounce", "Debounce Time (ms)", "Window where subsequent clicks are ignored", 0, 50, 1, 0);
let lastValidClickTime = 0;
client.on("click", e => {
    if (!mod.isEnabled())
        return;
    if (!e.isDown)
        return;
    if (!(e.button == 1 || e.button == 2))
        return;
    let clickTime = Date.now();
    if (lastValidClickTime + optDebounce.getValue() > clickTime) {
        e.cancel = true;
    }
    else {
        e.cancel = false;
        lastValidClickTime = clickTime;
    }
});
