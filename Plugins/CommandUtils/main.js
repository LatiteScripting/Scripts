let module = new Module('CommandUtils', 'Command Utils', 'Adds 10 more customizable keybinded commands.', 0)

let Cmd0 = module.addTextSetting('0', 'Cmd 0', 'Cmd 0', '')
let Key0 = module.addKeySetting('0', 'Key 0', 'Key 0', 96)

let Cmd1 = module.addTextSetting('1', 'Cmd 1', 'Cmd 1', '')
let Key1 = module.addKeySetting('0', 'Key 1', 'Key 1', 97)

let Cmd2 = module.addTextSetting('2', 'Cmd 2', 'Cmd 2', '')
let Key2 = module.addKeySetting('0', 'Key 2', 'Key 2', 98)

let Cmd3 = module.addTextSetting('3', 'Cmd 3', 'Cmd 3', '')
let Key3 = module.addKeySetting('0', 'Key 3', 'Key 3', 99)

let Cmd4 = module.addTextSetting('4', 'Cmd 4', 'Cmd 4', '')
let Key4 = module.addKeySetting('0', 'Key 4', 'Key 4', 100)

let Cmd5 = module.addTextSetting('5', 'Cmd 5', 'Cmd 5', '')
let Key5 = module.addKeySetting('0', 'Key 5', 'Key 5', 101)

let Cmd6 = module.addTextSetting('6', 'Cmd 6', 'Cmd 6', '')
let Key6 = module.addKeySetting('0', 'Key 6', 'Key 6', 102)

let Cmd7 = module.addTextSetting('7', 'Cmd 7', 'Cmd 7', '')
let Key7 = module.addKeySetting('0', 'Key 7', 'Key 7', 103)

let Cmd8 = module.addTextSetting('8', 'Cmd 8', 'Cmd 8', '')
let Key8 = module.addKeySetting('0', 'Key 8', 'Key 8', 104)

let Cmd9 = module.addTextSetting('9', 'Cmd 9', 'Cmd 9', '')
let Key9 = module.addKeySetting('0', 'Key 9', 'Key 9', 105)

client.getModuleManager().registerModule(module)

client.on('key-press', e => {
    // Bail if the module is off or if the user in in a UI.
    if(!module.isEnabled() || game.isInUI()) return

    let cmd = ''

    // Find which key was pressed
    if (e.keyCode == Key0.getValue() && e.isDown) cmd = Cmd0.getValue()
    if (e.keyCode == Key1.getValue() && e.isDown) cmd = Cmd1.getValue()
    if (e.keyCode == Key2.getValue() && e.isDown) cmd = Cmd2.getValue()
    if (e.keyCode == Key3.getValue() && e.isDown) cmd = Cmd3.getValue()
    if (e.keyCode == Key4.getValue() && e.isDown) cmd = Cmd4.getValue()
    if (e.keyCode == Key5.getValue() && e.isDown) cmd = Cmd5.getValue()
    if (e.keyCode == Key6.getValue() && e.isDown) cmd = Cmd6.getValue()
    if (e.keyCode == Key7.getValue() && e.isDown) cmd = Cmd7.getValue()
    if (e.keyCode == Key8.getValue() && e.isDown) cmd = Cmd8.getValue()
    if (e.keyCode == Key9.getValue() && e.isDown) cmd = Cmd9.getValue()

    // Bail if the command happens to be empty.
    // This is the case if the user did not define the command yet.
    if(cmd == '') return

    // Execute the defined command then unset the cmd variable.
    game.executeCommand(cmd)
    cmd = ''
})