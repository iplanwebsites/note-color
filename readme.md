# note-color 🎨

A lightweight npm package that maps musical notes to colors based on the Chrome Music Lab palette. Perfect for music visualizations, educational tools, and creative projects.

## Installation

```bash
npm install note-color
```

## Demo

Check out the [interactive demo](https://iplanwebsites.github.io/note-color/demo.html) to see the package in action.

## Features

- Get colors for musical notes based on Chrome Music Lab's palette
- Support for different note formats (C, C#, Db, etc.)
- Support for MIDI note numbers
- Custom palette support
- No dependencies

## Usage

### Basic Usage

```javascript
import getNoteColor from "note-color";

// Get color for note C
const cColor = getNoteColor("C"); // Returns "#e23058"

// Get color for C sharp / D flat
getNoteColor("C#"); // Returns "#f7583a"
getNoteColor("Db"); // Returns "#f7583a" (same as C#)

// Works with lowercase
getNoteColor("e"); // Returns "#edd92a"
```

### MIDI Note Numbers

```javascript
// Get color from MIDI note number
getNoteColor(60); // Middle C: "#e23058"
getNoteColor(62); // D: "#f8943e"
getNoteColor(64); // E: "#edd92a"
```

### Get Full Information

```javascript
// Get full note information including name
const noteInfo = getNoteColor("F", { fullInfo: true });
// Returns: { note: 'F', name: 'Yellow-Green', hex: '#95c531' }
```

### Custom Palettes

```javascript
// Define a custom palette
const customPalette = [
  { note: "C", name: "Custom Red", hex: "#ff0000" },
  { note: "D", name: "Custom Blue", hex: "#0000ff" },
  // Add entries for all 12 notes
];

// Use the custom palette
getNoteColor("C", { palette: customPalette }); // "#ff0000"
```

## Chrome Music Lab Default Palette

| Note  | Color Name                | Hex Code |
| ----- | ------------------------- | -------- |
| C     | Amaranth                  | #e23058  |
| C#/Db | Orange Soda               | #f7583a  |
| D     | Royal Orange              | #f8943e  |
| D#/Eb | Saffron                   | #f3b72f  |
| E     | Dandelion                 | #edd92a  |
| F     | Yellow-Green              | #95c531  |
| F#/Gb | Apple                     | #55a753  |
| G     | Deep Green-Cyan Turquoise | #11826e  |
| G#/Ab | Lapis Lazuli              | #3161a3  |
| A     | Iris                      | #5b37cb  |
| A#/Bb | Purple Plum               | #a247be  |
| B     | Brilliant Rose            | #e957b2  |

## Use Cases

- Create music visualizations with consistent color mapping
- Build educational tools for teaching music theory
- Develop synesthesia-inspired applications
- Add color to music notation software

## License

MIT
