# FiveM TypeScript Template Generator

## Introduction

This script helps you generate a FiveM TypeScript project template with support for Lua integration. It sets up a directory structure and initializes necessary configuration files.

## Usage

1. Clone this repository or download the script file.
2. Run `npm install` to install dependencies.
3. Run `npm run build` to build the projects.
4. Run `npm run start` to start the generator.
5. Follow the prompts to configure your project:
   - **Project Name**: Enter the name of your FiveM project.
   - **Author Name**: Enter your name or the author's name for package.json and fxmanifest.lua.
   - **Enable Lua 5.4**: Choose whether to enable Lua 5.4 support in fxmanifest.lua.
   - **Include ESX Import**: Choose whether to include ESX import in fxmanifest.lua.
6. Once configured, the template will be generated in your current directory.

## Directory Structure

```
fx_version 'cerulean'
game 'gta5'

author '<Author Name>'
lua54 "yes"  -- or "no" based on user input

shared_scripts {
    'dist/shared/*.lua'
    -- Include ESX import if selected --
}

client_scripts {
    'dist/client/*.js',
    'dist/client/*.lua'
}

server_scripts {
    'dist/server/*.js',
}
```

## License

Licensed under the terms of the [Creative Commons Attribution-ShareAlike 4.0 International License](https://github.com/mdxwzl/fivem-template/blob/main/LICENSE-CC-BY).