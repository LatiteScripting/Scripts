# Latite Plugin API

The Latite Scripting/Plugin API is an advanced client-side Minecraft Scripting API for Latite Client. The API allows you to interact with many aspects of the Minecraft Windows 10/11 Edition client (while not allowing cheats).

### What is Latite Client?
Latite Client is a non-cheat modification for Minecraft Windows 10/11 Edition which has features ranging from world utility to visual mods and PVP-related utilities. 

Latite Client 
### Restrictions
Some features in Latite Client Scripting are restricted. Features such as getting the entities, attacking entities, getting entity positions are limited to operators to prevent cheating.

Other things like world manipulation are only possible on local worlds.

### How to use this API

You need to have Latite Client **v2.0.0b8+** to use the latest iteration of the Latite Plugin API. The Latite Client beta versions are currently Work-In-Progress and open to patrons and boosters however they will be released soon.

Join the [Latite Discord](https://discord.gg/latite) for more information.

Latite's scripting API uses JavaScript. To be able to use scripts, you need to have Latite Beta. Join the discord for more information.

## How to make a Plugin

You can view a quick guide/quickstart [here](https://github.com/LatiteScripting/Scripts/tree/master/how-to-make-a-script.md)

For scripting documentation, go to https://latitescripting.github.io/

## Debugging

You can [debug your scripts](https://github.com/LatiteScripting/Scripts/tree/master/debugging.md) in Latite Client using Visual Studio.

## How to get your plugin added
For now, you can request your plugin to be added in [#beta-chat](https://discord.com/channels/885656043521179680/1058027973065842698) in the Discord server. You must have a GitHub repository that contains your plugin. Your plugin will **NOT** auto update in this repository for security reasons. We will check your code and update it in this repostiory every once in awhile

## Using the .plugin command in game
To install those plugin, run `.plugin install <pluginname>` ingame. For example, do `.plugin install chatlogger` to install the ChatLogger plugin.

## Cloning this repository
Cloning this repository is a good way to get plugins.

Use this command to clone the repository and all plugins inside it:
```console
git clone https://github.com/LatiteScripting/Scripts.git
```
You can also [download the plugins here](https://github.com/LatiteScripting/Scripts/archive/refs/heads/master.zip)
