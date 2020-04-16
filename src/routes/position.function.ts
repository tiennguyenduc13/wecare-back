import NodeGeocoder from "node-geocoder";
import _ from "lodash";
import PositionMap, { IPositionMap } from "../models/PositionMap";
import apiKey from "../config/api-key";

async function getGeoAddress(position) {
  const options = {
    provider: "google",
    // fetch: customFetchImplementation,
    apiKey: apiKey.googleMapsAPIKey,
    formatter: null,
  };

  const geocoder = NodeGeocoder(options);
  console.log("resolving position: ", position);
  return await geocoder.reverse(position);
}

export default async function updateLocalAddress() {
  console.log("start updateLocalAddress ");
  const filter = {
    "localAddress.city": "",
  };
  const positionMaps = await PositionMap.find(filter);
  _.map(positionMaps, async (positionMap: IPositionMap) => {
    //get local address
    const position = {
      lat: positionMap.position.lat,
      lon: positionMap.position.lng,
    };
    console.log("positionMap position", position);
    const addressPromise = getGeoAddress(position);
    const addressArray = await Promise.all([addressPromise]);
    console.log("Found ", addressArray[0][0]);
    // update
    positionMap.localAddress.city = _.get(addressArray[0][0], "city", "");
    positionMap.localAddress.county = _.get(addressArray[0][0], "county", "");
    positionMap.localAddress.state = _.get(addressArray[0][0], "state", "");
    positionMap.localAddress.country = _.get(addressArray[0][0], "country", "");
    positionMap
      .save()
      .then((positionMap) => {
        console.log("Saved address positionMap ", positionMap);
      })
      .catch((err) => {
        console.log("Error ", err);
      });
  });
}
