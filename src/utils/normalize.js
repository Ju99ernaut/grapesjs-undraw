function buildTagObjects(localNames) {
  const tags = [
    ...new Set(
      localNames.reduce((acc, name) => acc.concat(name.tags.split(", ")), [])
    ),
  ];

  return tags.map((tag) => {
    return {
      type: tag.toLowerCase(),
      payload: [
        ...localNames
          .filter((o) => o.tags.includes(tag))
          .map((o) => ({
            image: o.image,
            title: o.title,
            tags: o.tags,
          })),
      ],
    };
  });
}

function buildTitleObjects(localNames) {
  const titles = [
    ...new Set(localNames.reduce((acc, name) => acc.concat(name.title), [])),
  ];

  return titles.map((title) => {
    return {
      type: title.toLowerCase(),
      payload: [
        ...localNames
          .filter((o) => o.title === title)
          .map((o) => ({
            image: o.image,
            title: o.title,
            tags: o.tags,
          })),
      ],
    };
  });
}

// Normalize undraw JSON files
// Demo: https://repl.it/@dance2die/Normalizr-for-undraw-data
export default function normalize(localNames) {
  return [...buildTagObjects(localNames), ...buildTitleObjects(localNames)];
}
