import Constants from 'expo-constants';

import axios from "axios";

const AXIOS = axios.create({
  baseURL: Constants.manifest.extra.BASE_URL,
  timeout: 10000,
});

export default AXIOS;
