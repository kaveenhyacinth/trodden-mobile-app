import Constants from "expo-constants";

export const downloadImage = (uri) =>
  `${Constants.manifest.extra.BASE_URL}/image/${uri}`;

export const downloadVideo = (uri) =>
  `${Constants.manifest.extra.BASE_URL}/video/${uri}`;
