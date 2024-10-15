export default function useFetchSearchMatches() {
  // Helper function to perform regex matching
  function matchesSearchTerm(value, searchTerm) {
    const regex = new RegExp(`\\b${searchTerm}`, "i");
    return regex.test(value.toLowerCase());
  }

  // search function to handle both string and array values
  function searchValues(searchTerm, key, data) {
    return data?.products.filter((product) => {
      const value = product[key];

      if (!value) return false; // No match if key doesn't exist

      // Handle array values like "tags"
      if (Array.isArray(value)) {
        return value.some((item) => matchesSearchTerm(item, searchTerm));
      }

      // Handle string values
      return matchesSearchTerm(value, searchTerm);
    });
  }

  // Main function to search through specified keys
  function getSearchMatches(searchInput, data) {
    const lowerCaseSearch = searchInput.toLowerCase();

    // List of product keys to search
    const searchKeys = ["title", "category", "brand", "description", "tags"];

    // Perform search across all keys and accumulate matches
    const allMatches = searchKeys.flatMap((key) =>
      searchValues(lowerCaseSearch, key, data)
    );

    // Remove duplicates by product id
    const uniqueMatches = Array.from(
      new Set(allMatches.map((product) => product.id))
    ).map((id) => allMatches.find((product) => product.id === id));

    return uniqueMatches;
  }

  return getSearchMatches;
}
