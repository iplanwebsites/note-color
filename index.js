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

// Additional predefined palettes
const PALETTES = {
  default: DEFAULT_PALETTE,
  pastel: [
    { note: "C", name: "Pastel Red", hex: "#ffb3ba" },
    { note: "C#", name: "Pastel Orange", hex: "#ffdfba" },
    { note: "D", name: "Pastel Yellow", hex: "#ffffba" },
    { note: "D#", name: "Light Pastel Yellow", hex: "#e6ffba" },
    { note: "E", name: "Pastel Green", hex: "#baffba" },
    { note: "F", name: "Light Pastel Cyan", hex: "#baffdf" },
    { note: "F#", name: "Pastel Cyan", hex: "#baffff" },
    { note: "G", name: "Light Pastel Blue", hex: "#bad3ff" },
    { note: "G#", name: "Pastel Blue", hex: "#babdff" },
    { note: "A", name: "Pastel Purple", hex: "#d3baff" },
    { note: "A#", name: "Pastel Magenta", hex: "#ffbaff" },
    { note: "B", name: "Light Pastel Magenta", hex: "#ffbad3" },
  ],
  monochrome: [
    { note: "C", name: "Black", hex: "#000000" },
    { note: "C#", name: "Very Dark Gray", hex: "#1a1a1a" },
    { note: "D", name: "Dark Gray", hex: "#333333" },
    { note: "D#", name: "Medium Dark Gray", hex: "#4d4d4d" },
    { note: "E", name: "Medium Gray", hex: "#666666" },
    { note: "F", name: "Gray", hex: "#808080" },
    { note: "F#", name: "Medium Light Gray", hex: "#999999" },
    { note: "G", name: "Light Gray", hex: "#b3b3b3" },
    { note: "G#", name: "Very Light Gray", hex: "#cccccc" },
    { note: "A", name: "Almost White", hex: "#e6e6e6" },
    { note: "A#", name: "Off White", hex: "#f2f2f2" },
    { note: "B", name: "White", hex: "#ffffff" },
  ],
};

// Note aliases mapping for different notations
const NOTE_ALIASES = {
  // Standard flat notation
  db: "C#",
  eb: "D#",
  gb: "F#",
  ab: "G#",
  bb: "A#",

  // Flat sign (♭) aliases
  "c♭": "B",
  "d♭": "C#",
  "e♭": "D#",
  "f♭": "E",
  "g♭": "F#",
  "a♭": "G#",
  "b♭": "A#",

  // Sharp sign (♯) aliases
  "c♯": "C#",
  "d♯": "D#",
  "e♯": "F",
  "f♯": "F#",
  "g♯": "G#",
  "a♯": "A#",
  "b♯": "C",

  // Latin solfège (Do-Re-Mi) aliases
  do: "C",
  re: "D",
  mi: "E",
  fa: "F",
  sol: "G",
  la: "A",
  si: "B",
  ti: "B",

  // Accented Latin solfège
  dó: "C",
  ré: "D",
  mí: "E",
  fá: "F",
  sól: "G",
  lá: "A",
  sí: "B",

  // Sharps in Latin solfège
  "do#": "C#",
  "re#": "D#",
  "fa#": "F#",
  "sol#": "G#",
  "la#": "A#",

  // Flats in Latin solfège
  reb: "C#",
  mib: "D#",
  solb: "F#",
  lab: "G#",
  sib: "A#",
};

/**
 * Normalizes a note string to a standard format
 * @param {string} noteStr - The note string (e.g., "C", "C#", "Db", "Bb")
 * @returns {string} Normalized note (e.g., "C", "C#", "D", etc.)
 */
function normalizeNote(noteStr) {
  // Remove any spaces or extra characters
  const cleanNote = noteStr.trim();

  // Basic note normalization (handle standard notes like "c" -> "C")
  const basicNoteMap = {
    c: "C",
    d: "D",
    e: "E",
    f: "F",
    g: "G",
    a: "A",
    b: "B",
  };

  // First check for direct uppercase match (e.g., "C", "C#")
  if (
    ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].includes(
      cleanNote
    )
  ) {
    return cleanNote;
  }

  // Convert lowercase single letter notes to uppercase
  const lowercaseNote = cleanNote.toLowerCase();
  if (basicNoteMap[lowercaseNote]) {
    return basicNoteMap[lowercaseNote];
  }

  // Try to find a matching alias (case-insensitive)
  const aliasKey = Object.keys(NOTE_ALIASES).find(
    (key) => key.toLowerCase() === lowercaseNote
  );

  if (aliasKey) {
    return NOTE_ALIASES[aliasKey];
  }

  // Check if there's a direct match in our alias mapping
  if (NOTE_ALIASES[lowercaseNote]) {
    return NOTE_ALIASES[lowercaseNote];
  }

  // If we reach here and the input is a single letter followed by # or b,
  // try to normalize it as a standard note
  if (lowercaseNote.length === 2) {
    const noteLetter = lowercaseNote[0];
    const accidental = lowercaseNote[1];

    if (basicNoteMap[noteLetter]) {
      if (accidental === "#") {
        return `${basicNoteMap[noteLetter]}#`;
      } else if (accidental === "b") {
        // Map flats to their sharp equivalents
        const flatToSharp = {
          Cb: "B",
          Db: "C#",
          Eb: "D#",
          Fb: "E",
          Gb: "F#",
          Ab: "G#",
          Bb: "A#",
        };
        const flatKey = `${basicNoteMap[noteLetter]}b`;
        return flatToSharp[flatKey] || cleanNote;
      }
    }
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
 * @param {string|number} note - Note name (e.g., "C", "Db"), MIDI number, or pitch class (0-11)
 * @param {Object} [options] - Options object
 * @param {string} [options.paletteId] - ID of a predefined palette (default, pastel, monochrome)
 * @param {Array} [options.palette] - Custom color palette array
 * @param {boolean} [options.fullInfo=false] - If true, returns object with name and hex
 * @param {boolean} [options.failSilently=false] - If true, returns null instead of throwing errors
 * @returns {string|Object|null} Hex color code, object with name and hex, or null if error and failSilently is true
 */
function getNoteColor(note, options = {}) {
  let normalizedNote;
  let palette;

  try {
    // Determine the palette to use
    if (options.paletteId && PALETTES[options.paletteId]) {
      palette = PALETTES[options.paletteId];
    } else if (options.palette) {
      palette = options.palette;
    } else {
      palette = DEFAULT_PALETTE;
    }

    // Handle different input types
    if (typeof note === "number") {
      if (note >= 0 && note <= 11) {
        // This is a pitch class (0-11), convert to note name
        normalizedNote = midiToNoteName(note);
      } else if (note >= 0 && note <= 127) {
        // This is a MIDI note number
        normalizedNote = midiToNoteName(note);
      } else {
        // Apply modulo 12 to handle any integer as pitch class
        const pitchClass = ((note % 12) + 12) % 12;
        normalizedNote = midiToNoteName(pitchClass);
      }
    } else if (typeof note === "string") {
      normalizedNote = normalizeNote(note);
    } else {
      throw new Error("Note must be a string or number");
    }

    // Find the note in the palette
    const noteData = palette.find((item) => item.note === normalizedNote);

    if (!noteData) {
      throw new Error(`Note ${normalizedNote} not found in palette`);
    }

    // Return full info or just the hex color
    return options.fullInfo ? noteData : noteData.hex;
  } catch (error) {
    if (options.failSilently) {
      return null;
    }
    throw error;
  }
}

/**
 * Gets all available palette IDs
 * @returns {Array<string>} Array of palette ID strings
 */
function getAvailablePalettes() {
  return Object.keys(PALETTES);
}

export default getNoteColor;
export { getAvailablePalettes, PALETTES };
