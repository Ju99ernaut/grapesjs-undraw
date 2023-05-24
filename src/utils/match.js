export default function matchText(search, text) {
  if (!text || !search) {
    return false;
  }
  return text.toLowerCase().indexOf(search.toLowerCase()) > -1;
}
