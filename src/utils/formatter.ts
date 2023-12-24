export const getFirstPathname = (pathname: string) => {
  // eslint-disable-next-line no-useless-escape
  const match = pathname.match(/^\/([^\/]+)/);
  return match ? match[1] : null;
};
