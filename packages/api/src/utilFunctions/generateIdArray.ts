export const generateIdArray = (arrayOfObjects: any[]) => {
  return arrayOfObjects.map((obj: any) => {
    return obj.id;
  });
};
