export function parseCategories(input: string): string[] {
  try {
    // Parse the string into a JSON array
    const jsonCompatibleInput = input.replace(/'/g, '"');

    const parsedArray: Array<string> = JSON.parse(jsonCompatibleInput);
    // Check if the result is indeed an array of strings
    if (
      Array.isArray(parsedArray) &&
      parsedArray.every((item) => typeof item === "string")
    ) {
      return parsedArray;
    } else {
      throw new Error("Invalid format: not an array of strings.");
    }
  } catch (error) {
    console.error("Error parsing input:", error);
    return [];
  }
}
