import Cookies from "js-cookie";
import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

// Check if the environment variable is properly loaded
const clientId = process.env.REACT_APP_WIX_CLIENT_ID;
if (!clientId) {
  throw new Error("WIX_CLIENT_ID is not defined in the environment variables");
}

// Parse the session token from cookies safely
const tokens = Cookies.get("session")
  ? JSON.parse(Cookies.get("session"))
  : null;

// Create a centralized Wix client with OAuth authentication
const myWixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId, // use the environment variable for client ID
    tokens, // use tokens from cookies, or null if unavailable
  }),
});

// Fetch data items from a specified collection
export async function fetchDataItems(dataCollectionId, sortField = "orderId") {
  try {
    const result = await myWixClient.items
      .queryDataItems({ dataCollectionId })
      .ascending(sortField)
      .find();

    return result.items;
  } catch (error) {
    console.error("Error fetching data items:", error);
    throw error;
  }
}
