# How to debug your scripts 

## Prerequisites
- A Latite Client script
- Visual Studio 2022 (with Just-in-Time debugging enabled)

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

Then load your script using **.script load <name>**

your script's files will show up on the right side of the screen

![](https://cdn.discordapp.com/attachments/1095148413399605308/1141544126282748014/image.png)

If an error pops up your script, a popup will show up and if you open the Call Stack your script will show up.