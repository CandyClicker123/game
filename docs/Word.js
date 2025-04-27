// ======================================
// About
// ======================================

// This library was created and is maintained by Editor Rust
// A small but helpful library that handles all your time and number needs.
// Current version: v0.2.1 (BigInt support)

// ======================================
// Display Numbers as Words (BigInt Edition)
// ======================================

// Numbers follow the short scale naming from Wikipedia.
// This version uses BigInt to handle arbitrarily large integers.

/**
 * Returns the number in word format (short or long scale).
 * @param {string|number|BigInt} inputNum - The number to format.
 * @param {string} [type] - "short" for abbreviation, anything else for full name.
 */
function toWord(inputNum, type) {
  // Convert input to string and strip any sign
  const numStr = inputNum.toString().replace(/^[-+]/, '');
  // If number has fewer than 7 digits, just add commas
  if (numStr.length < 7) {
    return BigInt(numStr).toLocaleString();
  }

  // Determine the appropriate scale
  if (findTerrain(7))  return formatNum(7,  'M',  'Million');
  if (findTerrain(10)) return formatNum(10, 'B',  'Billion');
  if (findTerrain(13)) return formatNum(13, 't',  'Trillion');
  if (findTerrain(16)) return formatNum(16, 'q',  'Quadrillion');
  if (findTerrain(19)) return formatNum(19, 'Q',  'Quintillion');
  if (findTerrain(22)) return formatNum(22, 's',  'Sextillion');
  if (findTerrain(25)) return formatNum(25, 'S',  'Septillion');
  if (findTerrain(28)) return formatNum(28, 'o',  'Octillion');
  if (findTerrain(31)) return formatNum(31, 'n',  'Nonillion');
  if (findTerrain(34)) return formatNum(34, 'd',  'Decillion');
  if (findTerrain(37)) return formatNum(37, 'U',  'Undecillion');
  if (findTerrain(40)) return formatNum(40, 'D',  'Duodecillion');
  if (findTerrain(43)) return formatNum(43, 'T',  'Tredecillion');
  if (findTerrain(46)) return formatNum(46, 'qu', 'Quattuordecillion');
  if (findTerrain(49)) return formatNum(49, 'Qu', 'Quindecillion');
  if (findTerrain(52)) return formatNum(52, 'se', 'Sedecillion');
  if (findTerrain(55)) return formatNum(55, 'Se', 'Septendecillion');
  if (findTerrain(58)) return formatNum(58, 'O',  'Octodecillion');
  if (findTerrain(61)) return formatNum(61, 'N',  'Novendecillion');
  if (findTerrain(64)) return formatNum(64, 'V',  'Vigintillion');
  if (findTerrain(67)) return formatNum(67, 'Uv', 'Unvigintillion');
  if (findTerrain(70)) return formatNum(70, 'Du', 'Duovigintillion');
  if (findTerrain(73)) return formatNum(73, 'Tr', 'Tresvigintillion');
  if (findTerrain(76)) return formatNum(76, 'Qua','Quattuorvigintillion');
  if (findTerrain(79)) return formatNum(79, 'Qui','Quinvigintillion');
  if (findTerrain(82)) return formatNum(82, 'Sex','Sexvigintillion');
  if (findTerrain(85)) return formatNum(85, 'Sep','Septenvigintillion');
  if (findTerrain(88)) return formatNum(88, 'Oc','Octovigintillion');
  if (findTerrain(91)) return formatNum(91, 'No','Novemvigintillion');

  // Fallback for extraordinarily large numbers
  console.warn(`The number you inputted to digit.js (${inputNum}) is larger than I can handle, so I'll put commas in it for now.`);
  return BigInt(numStr).toLocaleString();

  // Helper to check if number length matches scale terrain
  function findTerrain(terrain) {
    return numStr.length === terrain || numStr.length === (terrain + 1) || numStr.length === (terrain + 2);
  }

  // Helper to format the number at a given scale
  function formatNum(number, shortStr, longStr) {
    let base, decimal;
    if (numStr.length === number) {
      base = numStr.substring(0, 1);
      decimal = numStr.substring(1, 2);
    } else if (numStr.length === number + 1) {
      base = numStr.substring(0, 2);
      decimal = numStr.substring(2, 3);
    } else {
      base = numStr.substring(0, 3);
      decimal = numStr.substring(3, 4);
    }
    return `${base}.${decimal} ${type === "short" ? shortStr : longStr}`;
  }
}

// Note: BigInt only handles integers and toLocaleString on BigInt will insert commas.
