export const parseVideoId = (trailerUrl: string) => {
  const regex = /[?&]v=([^&#]+)/;

  const match = trailerUrl.match(regex);

  // Return the matched video ID or null if no match is found
  return match ? match[1] : null;
};
