function hasNoCommonGenres(list1: string[], list2: Set<string>): boolean {
  return !list1.some((item) => list2.has(item));
}

export default hasNoCommonGenres;
