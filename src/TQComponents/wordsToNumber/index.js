import parser from './parser';
import compiler from './compiler';

export function wordsToNumbers(text, options = {}) {
  const textz = text.replace('$', '');
  const regions = parser(textz, options);
  if (!regions.length) return textz;
  const compiled = compiler({ textz, regions });
  return compiled;
}

export default wordsToNumbers;
