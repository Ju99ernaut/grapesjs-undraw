/**
 * Get distinct search result name array
 * @param {Array} foundNames - an array of `{image: string, type: string, tags: string}`
 */
export default function filterUniqueNames(foundNames) {
  return Object.values(
    foundNames.reduce((acc, o) => {
      if (!acc[o.title]) acc[o.title] = o;
      return acc;
    }, new Map())
  );
}
