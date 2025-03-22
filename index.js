/**
 * note-color
 * A simple package to get colors for musical notes based on Chrome Music Lab palette
 */

// Default Chrome Music Lab palette
const DEFAULT_PALETTE = [
  { note: "C", name: "Amaranth", hex: "#e23058" },
  { note: "C#", name: "Orange Soda", hex: "#f7583a" },
  { note: "D", name: "Royal Orange", hex: "#f8943e" },
  { note: "D#", name: "Saffron", hex: "#f3b72f" },
  { note: "E", name: "Dandelion", hex: "#edd92a" },
  { note: "F", name: "Yellow-Green", hex: "#95c531" },
  { note: "F#", name: "Apple", hex: "#55a753" },
  { note: "G", name: "Deep Green-Cyan Turquoise", hex: "#11826e" },
  { note: "G#", name: "Lapis Lazuli", hex: "#3161a3" },
  { note: "A", name: "Iris", hex: "#5b37cb" },
  { note: "A#", name: "Purple Plum", hex: "#a247be" },
  { note: "B", name: "Brilliant Rose", hex: "#e957b2" },
];

// Note aliases mapping for different notations
const NOTE_ALIASES = {
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
  // Handle lowercase variants
  c: "C",
  "c#": "C#",
  db: "C#",
  d: "D",
  "d#": "D#",
  eb: "D#",
  e: "E",
  f: "F",
  "f#": "F#",
  gb: "F#",
  g: "G",
  "g#": "G#",
  ab: "G#",
  a: "A",
  "a#": "A#",
  bb: "A#",
  b: "B",

  //bemol sign aliases too

  //latin aliases (do re moi fa sol la si), accentueated too
};

/**
 * Normalizes a note string to a standard format
 * @param {string} noteStr - The note string (e.g., "C", "C#", "Db", "Bb")
 * @returns {string} Normalized note (e.g., "C", "C#", "D", etc.)
 */
function normalizeNote(noteStr) {
  // Remove any spaces or extra characters
  const cleanNote = noteStr.trim();

  // Check if the note is in our alias mapping
  if (NOTE_ALIASES[cleanNote]) {
    return NOTE_ALIASES[cleanNote];
  }

  return cleanNote;
}

/**
 * Converts a MIDI note number to a standard note name
 * @param {number} midiNumber - MIDI note number (0-127)
 * @returns {string} The note name (e.g., "C", "C#", etc.)
 */
function midiToNoteName(midiNumber) {
  const noteNames = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  return noteNames[midiNumber % 12];
}

/**
 * Gets the color for a musical note
 * @param {string|number} note - Note name (e.g., "C", "Db") or MIDI number
 * @param {Object} [options] - Options object
 * @param {string} [options.paletteId] - ID of a predefined palette
 * @param {Array} [options.palette] - Custom color palette array
 * @param {boolean} [options.fullInfo=false] - If true, returns object with name and hex
 * @returns {string|Object} Hex color code or object with name and hex
 */
function getNoteColor(note, options = {}) {
  let normalizedNote;

  // Determine the palette to use
  const palette = options.palette || DEFAULT_PALETTE;

  // Handle MIDI number input
  if (typeof note === "number") {
    if (note < 0 || note > 127) {
      throw new Error("MIDI note number must be between 0 and 127");
    }
    normalizedNote = midiToNoteName(note);
  } else if (typeof note === "string") {
    normalizedNote = normalizeNote(note);
  } else {
    throw new Error("Note must be a string or MIDI number");
  }

  // Find the note in the palette
  const noteData = palette.find((item) => item.note === normalizedNote);

  if (!noteData) {
    throw new Error(`Note ${normalizedNote} not found in palette`);
  }

  // Return full info or just the hex color
  return options.fullInfo ? noteData : noteData.hex;
}

export default getNoteColor;
