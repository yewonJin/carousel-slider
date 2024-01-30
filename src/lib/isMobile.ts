export const isMobile = (str: string) => {
  let mobileRegex = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;

  return !!str.match(mobileRegex);
};
