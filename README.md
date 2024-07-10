# FiveM TypeScript Template Generator

## Introduction

This script helps you generate a FiveM TypeScript project template with support for Lua integration. It sets up a directory structure and initializes necessary configuration files.

## Usage

1. Run `npx fivem-template@latest`
2. Follow the prompts to configure your project:
   - **Project Name**: Enter the name of your FiveM project.
   - **Author Name**: Enter your name or the author's name for package.json and fxmanifest.lua.
   - **Enable Lua 5.4**: Choose whether to enable Lua 5.4 support in fxmanifest.lua.
   - **Include ESX Import**: Choose whether to include ESX import in fxmanifest.lua.
3. Once configured, the template will be generated in your current directory.

## Directory Structure

```
fx_version 'cerulean'
game 'gta5'

author '<Author Name>'
lua54 "yes"  -- or "no" based on user input

shared_scripts {
    -- Include ESX import if selected --
    'dist/shared/*.js',
    'dist/shared/*.lua'
}

client_scripts {
    'dist/client/*.js',
    'dist/client/*.lua'
}

server_scripts {
    'dist/server/*.js',
    'dist/server/*.lua',
}
```

## License

Licensed under the terms of the [Creative Commons Attribution-ShareAlike 4.0 International License](https://github.com/mdxwzl/fivem-template/blob/main/LICENSE-CC-BY).