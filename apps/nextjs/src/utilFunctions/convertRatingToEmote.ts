//converts anime ratings from user (stored as integer in the db) to emoji format
export function convertRatingToEmote(ratingNumber: number) {
  switch (ratingNumber) {
    case 1:
      return "🤢";
    case 2:
      return "😐";
    case 3:
      return "😊";
    case 4:
      return "🥰";
    default:
      return "";
  }
}
