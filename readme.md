# note-color 🎹 🎨

A lightweight library that maps musical notes to colors based on the Chrome Music Lab's beautiful palette. Perfect for music visualizations, educational tools, and creative projects!

## Installation 📦

```bash
npm i note-color
```

## Demo 🎭

Try the [interactive demo](https://iplanwebsites.github.io/note-color/demo.html) to see all the features in action!

## Features ✨

- 🎵 Map any musical note to a consistent color
- 🔠 Support for multiple notation styles (C, C#, Db, do, ré, etc.)
- 🎹 Works with MIDI note numbers and pitch classes
- 🎨 Multiple built-in palettes (default, pastel, monochrome)
- 🖌️ Create custom palettes for your project's aesthetic
- 🧠 Smart handling of edge cases with robust normalization
- 🪶 Zero dependencies - tiny footprint!

## How It Works 🔍

The package maps the 12 notes of the chromatic scale to specific colors:

```
C  → 🔴 Red
C# → 🟠 Orange
D  → 🟠 Light Orange
D# → 🟡 Yellow/Orange
E  → 🟡 Yellow
F  → 🟢 Light Green
F# → 🟢 Green
G  → 🟢 Teal
G# → 🔵 Blue
A  → 🟣 Purple
A# → 🟣 Magenta
B  → 🟣 Pink
```

This mapping is based on the [Chrome Music Lab's](https://musiclab.chromeexperiments.com/) color scheme, created by Google's Creative Lab team to help people explore music in a fun, visual way.

## Usage 🚀

### Basic Usage 🚀

```javascript
import getNoteColor from "note-color";

// Get color for note C
getNoteColor("C"); // Returns "#e23058" (red)

// Different notation styles - all get normalized to standard notation
getNoteColor("C#"); // Returns "#f7583a" (orange)
getNoteColor("Db"); // Same as C#: "#f7583a"
getNoteColor("do"); // Latin solfège for C: "#e23058"
getNoteColor("ré"); // Latin solfège (with accent) for D: "#f8943e"
```

### Supported Notation Systems 🔤

The package supports multiple notation formats:

#### Standard Note Names

```javascript
// Major scale notes
getNoteColor("C"); // "#e23058"
getNoteColor("D"); // "#f8943e"
getNoteColor("E"); // "#edd92a"
getNoteColor("F"); // "#95c531"
getNoteColor("G"); // "#11826e"
getNoteColor("A"); // "#5b37cb"
getNoteColor("B"); // "#e957b2"

// With accidentals (sharps)
getNoteColor("C#"); // "#f7583a"
getNoteColor("D#"); // "#f3b72f"
getNoteColor("F#"); // "#55a753"
getNoteColor("G#"); // "#3161a3"
getNoteColor("A#"); // "#a247be"

// With accidentals (flats) - automatically converts to sharp equivalent
getNoteColor("Db"); // Same as C#: "#f7583a"
getNoteColor("Eb"); // Same as D#: "#f3b72f"
getNoteColor("Gb"); // Same as F#: "#55a753"
getNoteColor("Ab"); // Same as G#: "#3161a3"
getNoteColor("Bb"); // Same as A#: "#a247be"
```

#### Unicode Symbols

```javascript
// With Unicode sharp sign (♯)
getNoteColor("C♯"); // Same as C#: "#f7583a"
getNoteColor("D♯"); // Same as D#: "#f3b72f"

// With Unicode flat sign (♭)
getNoteColor("D♭"); // Same as C#: "#f7583a"
getNoteColor("E♭"); // Same as D#: "#f3b72f"

// Special cases
getNoteColor("B♯"); // Same as C: "#e23058"
getNoteColor("C♭"); // Same as B: "#e957b2"
getNoteColor("E♯"); // Same as F: "#95c531"
getNoteColor("F♭"); // Same as E: "#edd92a"
```

#### Latin Solfège (Do-Re-Mi)

```javascript
// Basic solfège
getNoteColor("do"); // C: "#e23058"
getNoteColor("re"); // D: "#f8943e"
getNoteColor("mi"); // E: "#edd92a"
getNoteColor("fa"); // F: "#95c531"
getNoteColor("sol"); // G: "#11826e"
getNoteColor("la"); // A: "#5b37cb"
getNoteColor("si"); // B: "#e957b2" (or "ti" in some systems)

// With accidentals
getNoteColor("do#"); // C#: "#f7583a"
getNoteColor("re#"); // D#: "#f3b72f"
getNoteColor("fa#"); // F#: "#55a753"
getNoteColor("sol#"); // G#: "#3161a3"
getNoteColor("la#"); // A#: "#a247be"

// With accents (same results)
getNoteColor("dó"); // C: "#e23058"
getNoteColor("ré"); // D: "#f8943e"
getNoteColor("mí"); // E: "#edd92a"
getNoteColor("fá"); // F: "#95c531"
getNoteColor("sól"); // G: "#11826e"
getNoteColor("lá"); // A: "#5b37cb"
getNoteColor("sí"); // B: "#e957b2"
```

#### Case Insensitivity

```javascript
// Case insensitive - these all return the same color
getNoteColor("C"); // "#e23058"
getNoteColor("c"); // "#e23058"
getNoteColor("DO"); // "#e23058"
getNoteColor("Do"); // "#e23058"
getNoteColor("do"); // "#e23058"
```

### Working with MIDI and Pitch Classes 🎹

The package accepts several numeric input formats:

#### MIDI Note Numbers (0-127)

MIDI notes span from 0 to 127, where middle C is 60:

```javascript
// MIDI note numbers
getNoteColor(60); // Middle C: "#e23058"
getNoteColor(61); // C#: "#f7583a"
getNoteColor(62); // D: "#f8943e"
getNoteColor(72); // C one octave above middle C (still "#e23058")

// Common MIDI ranges
// Piano keys: 21 (A0) to 108 (C8)
// Middle C (C4): 60
// A440 (A4): 69
```

#### Pitch Classes (0-11)

Pitch classes represent the 12 notes regardless of octave:

```javascript
// Pitch classes (0-11)
getNoteColor(0); // C: "#e23058"
getNoteColor(1); // C#: "#f7583a"
getNoteColor(2); // D: "#f8943e"
getNoteColor(7); // G: "#11826e"
getNoteColor(11); // B: "#e957b2"
```

#### Any Integer (With Modulo 12)

The package applies modulo 12 to any integer, wrapping numbers outside the 0-11 range:

```javascript
// Numbers wrap modulo 12
getNoteColor(12); // Same as 0 (C): "#e23058"
getNoteColor(13); // Same as 1 (C#): "#f7583a"
getNoteColor(24); // Same as 0 (C): "#e23058"
getNoteColor(-1); // Same as 11 (B): "#e957b2"
getNoteColor(-12); // Same as 0 (C): "#e23058"
```

#### Pitch Class to Note Mapping

| Pitch Class | Note | Color (Default Palette) |
| ----------- | ---- | ----------------------- |
| 0           | C    | #e23058                 |
| 1           | C#   | #f7583a                 |
| 2           | D    | #f8943e                 |
| 3           | D#   | #f3b72f                 |
| 4           | E    | #edd92a                 |
| 5           | F    | #95c531                 |
| 6           | F#   | #55a753                 |
| 7           | G    | #11826e                 |
| 8           | G#   | #3161a3                 |
| 9           | A    | #5b37cb                 |
| 10          | A#   | #a247be                 |
| 11          | B    | #e957b2                 |

### Color Palettes 🎨

The package comes with three built-in palettes:

1. **default** - Chrome Music Lab's original colorful palette
2. **pastel** - A softer, pastel version of the color wheel
3. **monochrome** - Grayscale from black to white

```javascript
// Use built-in palettes
getNoteColor("C", { paletteId: "default" }); // Default red: "#e23058"
getNoteColor("C", { paletteId: "pastel" }); // Pastel red: "#ffb3ba"
getNoteColor("C", { paletteId: "monochrome" }); // Black: "#000000"

// Get available palettes
import { getAvailablePalettes } from "note-color";
getAvailablePalettes(); // ["default", "pastel", "monochrome"]

// Access palette data directly
import { PALETTES } from "note-color";
console.log(PALETTES.pastel); // View the full pastel palette

// Create a custom palette (must include all 12 notes C through B)
const rainbowPalette = [
  { note: "C", name: "Vivid Red", hex: "#ff0000" },
  { note: "C#", name: "Vivid Orange", hex: "#ff8800" },
  { note: "D", name: "Vivid Yellow", hex: "#ffff00" },
  // ... and so on for all 12 notes
];

getNoteColor("C", { palette: rainbowPalette }); // "#ff0000"
```

#### Pastel Palette Preview

| Note  | Color Name           | Hex Code | Preview |
| ----- | -------------------- | -------- | ------- |
| C     | Pastel Red           | #ffb3ba  | 🩷       |
| C#/Db | Pastel Orange        | #ffdfba  | 🧡      |
| D     | Pastel Yellow        | #ffffba  | 💛      |
| D#/Eb | Light Pastel Yellow  | #e6ffba  | 💚      |
| E     | Pastel Green         | #baffba  | 💚      |
| F     | Light Pastel Cyan    | #baffdf  | 💙      |
| F#/Gb | Pastel Cyan          | #baffff  | 💙      |
| G     | Light Pastel Blue    | #bad3ff  | 💙      |
| G#/Ab | Pastel Blue          | #babdff  | 💜      |
| A     | Pastel Purple        | #d3baff  | 💜      |
| A#/Bb | Pastel Magenta       | #ffbaff  | 💗      |
| B     | Light Pastel Magenta | #ffbad3  | 💗      |

#### Monochrome Palette Preview

| Note  | Color Name        | Hex Code | Preview |
| ----- | ----------------- | -------- | ------- |
| C     | Black             | #000000  | ⚫      |
| C#/Db | Very Dark Gray    | #1a1a1a  | ⚫      |
| D     | Dark Gray         | #333333  | ⚫      |
| D#/Eb | Medium Dark Gray  | #4d4d4d  | ⚫      |
| E     | Medium Gray       | #666666  | ⚫      |
| F     | Gray              | #808080  | ⚫      |
| F#/Gb | Medium Light Gray | #999999  | ⚫      |
| G     | Light Gray        | #b3b3b3  | ⚫      |
| G#/Ab | Very Light Gray   | #cccccc  | ⚪      |
| A     | Almost White      | #e6e6e6  | ⚪      |
| A#/Bb | Off White         | #f2f2f2  | ⚪      |
| B     | White             | #ffffff  | ⚪      |

### Additional Options and Advanced Usage ⚙️

```javascript
// Get full note information including name
const noteInfo = getNoteColor("F", { fullInfo: true });
// Returns: { note: 'F', name: 'Yellow-Green', hex: '#95c531' }

// Now you can use the individual properties
console.log(`Note: ${noteInfo.note}`); // "Note: F"
console.log(`Color name: ${noteInfo.name}`); // "Color name: Yellow-Green"
console.log(`Hex code: ${noteInfo.hex}`); // "Hex code: #95c531"

// Handle errors silently
getNoteColor("Z", { failSilently: true }); // null instead of throwing error
getNoteColor({}, { failSilently: true }); // null (invalid input type)

// Combine multiple options
getNoteColor("C", {
  paletteId: "pastel",
  fullInfo: true,
  failSilently: true,
}); // Returns full pastel palette info for C
```

#### Error Handling

Without `failSilently`, invalid inputs will throw errors:

```javascript
try {
  getNoteColor("Z"); // Throws: "Error: Note Z not found in palette"
} catch (error) {
  console.error(error.message);
}

try {
  getNoteColor({}); // Throws: "Error: Note must be a string or number"
} catch (error) {
  console.error(error.message);
}
```

#### Working with Arrays of Notes

Process multiple notes at once:

```javascript
// Map an array of notes to their colors
const notes = ["C", "E", "G"]; // C major triad
const colors = notes.map((note) => getNoteColor(note));
// ["#e23058", "#edd92a", "#11826e"]

// Create an array of pitch classes and get their colors
const pitchClasses = [0, 4, 7]; // C major triad as pitch classes
const chordColors = pitchClasses.map((pc) => getNoteColor(pc));
// ["#e23058", "#edd92a", "#11826e"]
```

## Default Palette 🎨

| Note  | Color Name      | Hex Code | Preview |
| ----- | --------------- | -------- | ------- |
| C     | Amaranth        | #e23058  | 🔴      |
| C#/Db | Orange Soda     | #f7583a  | 🟠      |
| D     | Royal Orange    | #f8943e  | 🟠      |
| D#/Eb | Saffron         | #f3b72f  | 🟡      |
| E     | Dandelion       | #edd92a  | 🟡      |
| F     | Yellow-Green    | #95c531  | 🟢      |
| F#/Gb | Apple           | #55a753  | 🟢      |
| G     | Deep Green-Cyan | #11826e  | 🟢      |
| G#/Ab | Lapis Lazuli    | #3161a3  | 🔵      |
| A     | Iris            | #5b37cb  | 🟣      |
| A#/Bb | Purple Plum     | #a247be  | 🟣      |
| B     | Brilliant Rose  | #e957b2  | 🟣      |

## Use Cases and Examples 💡

Here are some practical ways to use this package:

### Music Visualization 🎵

```javascript
// Create a real-time piano visualizer
pianoKeys.forEach((key) => {
  const midiNote = key.midiNumber;
  const color = getNoteColor(midiNote);
  key.addEventListener("noteon", () => {
    key.style.backgroundColor = color;
  });
});
```

### Music Education 🎓

```javascript
// Highlight chord notes with their respective colors
function visualizeChord(chordName) {
  const chordNotes = getChordNotes(chordName); // Your function to get notes
  return chordNotes
    .map((note) => {
      const color = getNoteColor(note);
      return `<span style="color:${color}">${note}</span>`;
    })
    .join(" - ");
}
```

### Audio Analysis 🎧

```javascript
// Visualize frequency data from audio analysis
function visualizeAudioFrequencies(frequencies) {
  frequencies.forEach((freq) => {
    const midiNote = frequencyToMidi(freq); // Your conversion function
    const color = getNoteColor(midiNote, { failSilently: true }) || "#888";
    // Draw visualization with the color
  });
}
```

### Synesthesia Experience 🧠

```javascript
// Create a synesthesia experience that maps sounds to colors
audioContext.addEventListener("audioprocess", (event) => {
  const dominantPitch = getPitchFromAudio(event.inputBuffer);
  document.body.style.backgroundColor = getNoteColor(dominantPitch);
});
```

### Musical Games 🎮

```javascript
// Note recognition game
function createNoteQuiz() {
  const randomNote = getRandomNote();
  const color = getNoteColor(randomNote, { fullInfo: true });

  displayElement.textContent = "What note corresponds to this color?";
  displayElement.style.backgroundColor = color.hex;

  checkAnswerButton.addEventListener("click", () => {
    if (userInput.value.toLowerCase() === randomNote.toLowerCase()) {
      score++;
      feedback.textContent = `Correct! This is ${randomNote} (${color.name})`;
    }
  });
}
```

### Instrument Learning Tools 🎸

```javascript
// Colorful fretboard visualization
fretboardPositions.forEach((position) => {
  const note = position.note;
  position.element.style.backgroundColor = getNoteColor(note);
  position.element.setAttribute("data-note", note);
});
```

## Credits 👏

- Original color palette by [Chrome Music Lab](https://musiclab.chromeexperiments.com/), a collection of experiments by Google's Creative Lab team
- Package created with ❤️ to make music more colorful and accessible

## License 📄

MIT
