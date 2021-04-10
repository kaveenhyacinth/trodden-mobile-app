export const timeDifference = (date) => {
  const msDiff = new Date() - new Date(date);
  const sDiff = Math.floor(msDiff / 1000);
  const miDiff = Math.floor(sDiff / 60);
  const hDiff = Math.floor(miDiff / 60);
  const dDiff = Math.floor(hDiff / 24);
  const wDiff = Math.floor(dDiff / 7);
  const mDiff = Math.floor(wDiff / 4);
  const yDiff = Math.floor(mDiff / 12);

  if (yDiff >= 1)
    return yDiff === 1 ? `${yDiff} year ago` : `${yDiff} years ago`;
  if (mDiff >= 1)
    return mDiff === 1 ? `${mDiff} month ago` : `${mDiff} months ago`;
  if (wDiff >= 1)
    return wDiff === 1 ? `${wDiff} week ago` : `${wDiff} weeks ago`;
  if (dDiff >= 1) return dDiff === 1 ? `${dDiff} day ago` : `${dDiff} days ago`;
  if (hDiff >= 1)
    return hDiff === 1 ? `${hDiff} hour ago` : `${hDiff} hours ago`;
  if (miDiff >= 1)
    return miDiff === 1 ? `${miDiff} minute ago` : `${miDiff} minutes ago`;
  if (msDiff >= 1) return "just now";
};
