/// <reference types="D:\\dev\\latiteapi\\definitions" />

plugin.requestPermission("permission.system_access" /*Permission.SystemAccess*/);

/**
 * @typedef {number} MessageBoxButtons
 */

module.exports = {
    /** @readonly @type {MessageBoxButtons} */
    MB_ABORTRETRYIGNORE: 0x00000002,
    /** @readonly @type {MessageBoxButtons} */
    MB_CANCELTRYCONTINUE: 0x00000006,
    /** @readonly @type {MessageBoxButtons} */
    MB_HELP: 0x00004000,
    /** @readonly @type {MessageBoxButtons} */
    MB_OK: 0x00000000,
    /** @readonly @type {MessageBoxButtons} */
    MB_OKCANCEL: 0x00000001,
    /** @readonly @type {MessageBoxButtons} */
    MB_RETRYCANCEL: 0x00000005,
    /** @readonly @type {MessageBoxButtons} */
    MB_YESNO: 0x00000004,
    /** @readonly @type {MessageBoxButtons} */
    MB_YESNOCANCEL: 0x00000003,


    /**
     * Shows a Windows message box.
     * @param {string} text The content of the message box
     * @param {string} caption The caption of the message box
     * @param {MessageBoxButtons} type The type of the message box
     * @returns {number} The response of the message box
     * @throws {Error}
     */
    messageBox: function(text, caption, type) {
        const module = NativeModule.get("User32.dll");
        
        if (module) {
            return module.call("MessageBoxW", 'int32', 0, text, caption, type);
        } else {
            throw new Error("System Access permission is not granted.");
        }
    }
}