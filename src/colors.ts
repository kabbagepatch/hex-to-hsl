export const hex2rgb = (color : string) => {
  if (color.length < 7) {
    color = color.split('').map(c => (c === '#' ? c : c + c)).join('');
  }

  const r  = parseInt(color.substring(1, 3), 16);
  const g  = parseInt(color.substring(3, 5), 16);
  const b  = parseInt(color.substring(5, 7), 16);
  let a;
  if (color.length > 7) {
    a  = parseInt(color.substring(7), 16) / 255.0;
  }
  const rgbColor = a ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;

  return rgbColor;
};
