# hex-to-hsl

A simple extension that converts any hex and rgb colours in your files to the hsl format, and back to hex

## Features

Use keyboard shortcut ctrl+h ctrl+s for windows and cmd+h cmd+s for mac to convert the currently active file to hsl

Conversely, use keyboard shortcut ctrl+h ctrl+x for windows and cmd+h cmd+x for mac to convert the currently active file to hex

Or use the VS Code commands to convert the entire workspace's files' colours to hsl or hex. Currently converts all files in the src folder with the following extensions: .ts, .js, .css, .vue, .jsx

## Known Issues

- Doesn't support percentage rgb yet, coz I don't use those :)
- Has small issues with floating points in hsl and rgb formats, since it parses them as ints

## Release Notes

### 0.1.1
Handle no commas in hsl values (example: `hsl(292 5% 99%)`)

### 0.1.0
Added ability to convert to all colours in active file and workspace to hex

### 0.0.3
Fixed issue with nested node_modules not being ignored

### 0.0.2
Converts all colours found in workspace src files

### 0.0.1

Initial release of hex-to-hsl
Converts all colours found in active file
