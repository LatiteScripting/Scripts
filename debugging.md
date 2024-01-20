# How to debug your scripts 

Script Debugging currently only works when using Latite on Minecraft versions below 1.19.50. Additionally, some JavaScript features will be lost when using Latite Scripting on these versions.

## Prerequisites
- Latite Client on an older Minecraft version (below 1.19.40)
- A Latite Client Plugin to debug
- [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) (with [Just-in-Time debugging](https://learn.microsoft.com/en-us/visualstudio/debugger/debug-using-the-just-in-time-debugger?view=vs-2022) enabled)

To enable JIT debugging, go to Visual Studio Installer and make sure Just-in-Time option
is enabled from Individual Components

Launch Visual Studio.

![](https://cdn.discordapp.com/attachments/1095148413399605308/1139978442851495966/image.png)

Click Continue without Code, then go to the Debug tab

Then launch Minecraft. Select **Attach to Process** below:

![](https://cdn.discordapp.com/attachments/1095148413399605308/1139975127161901170/image.png)

in **Attach To:** click the **Select** button, then select **Script**.

![](https://cdn.discordapp.com/attachments/1095148413399605308/1141543023050752170/image.png)

Then, this will show up. Type **Minecraft.Windows.exe** in the textbox below, select the first option 
that shows up, then click the **Attach** button.
![](https://cdn.discordapp.com/attachments/1095148413399605308/1139975738800492634/image.png)

Then load your plugin using **.plugin load <name>**

your plugin's files will show up on the right side of the screen

![](https://cdn.discordapp.com/attachments/1095148413399605308/1141544126282748014/image.png)

If an error pops up your script, a popup will show up and if you open the Call Stack your script will show up.
