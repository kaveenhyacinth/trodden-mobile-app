import { combineReducers } from "redux";
import interestsStore from "./interests/interestsReducer";
import guestStore from "./guest/guestReducer";
import tokensStore from "./jwtTokens/tokensReducer";
import nomadStore from "./nomad/nomadReducer";
import memoriesStore from "./memories/memoriesReducer";
import feedStore from "./feed/feedReducer";
import suggestionsStore from "./suggestions/suggestionReducer";
import lookupNomadStore from "./lookups/nomad/nomadReducer";
// import lookupCaravanStore from "./lookups/caravan/caravanReducer";
// import lookupBlazeStore from "./lookups/blaze/blazeReducer";
// import lookupTagStore from "./lookups/tag/tagReducer";
// import lookupDestinationStore from "./lookups/destination/destinationReducer";

const rootReducer = combineReducers({
  interestsStore,
  guestStore,
  tokensStore,
  nomadStore,
  memoriesStore,
  feedStore,
  suggestionsStore,
  lookupNomadStore,
  // lookupCaravanStore,
  // lookupBlazeStore,
  // lookupTagStore,
  // lookupDestinationStore
});

export default rootReducer;
