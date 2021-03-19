import { STORE_TEMP_NOMAD } from "../actionTypes";

export const storeTempNomad = (nomadId) => ({
  type: STORE_TEMP_NOMAD,
  payload: { nomadId },
});
