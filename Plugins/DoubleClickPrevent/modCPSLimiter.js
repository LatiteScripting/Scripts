let modCPSLimiter = new Module("CPSLimiter", "CPS Limiter", "Forces a hard limit on clicks per second", 0);
let optionLimit = modCPSLimiter.addNumberSetting("limit", "CPS Limit", "The limit to how many clicks can be sent per second", 0, 20, 1, 10);
let optionLeft = modCPSLimiter.addBoolSetting("left", "Left Click", "Controls whether left click CPS is limited", true);
let optionRight = modCPSLimiter.addBoolSetting("right", "Right Click", "Controls whether right click CPS is limited", true);
client.getModuleManager().registerModule(modCPSLimiter);
let clicks = [0, 0];
client.on("click", e => {
    if (!modCPSLimiter.isEnabled())
        return;
    if (!e.isDown)
        return;
    if (!(e.button == 1 || e.button == 2))
        return;
    if (e.cancel)
        return;
    if (game.isInUI())
        return;
    let button = e.button - 1;
    if (clicks[button] >= optionLimit.getValue()) {
        e.cancel = true;
    }
    else {
        clicks[button]++;
        setTimeout(() => {
            clicks[button]--;
        }, 1000);
    }
});
