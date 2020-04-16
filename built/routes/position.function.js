"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_geocoder_1 = __importDefault(require("node-geocoder"));
const lodash_1 = __importDefault(require("lodash"));
const PositionMap_1 = __importDefault(require("../models/PositionMap"));
const api_key_1 = __importDefault(require("../config/api-key"));
function getGeoAddress(position) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            provider: "google",
            // fetch: customFetchImplementation,
            apiKey: api_key_1.default.googleMapsAPIKey,
            formatter: null,
        };
        const geocoder = node_geocoder_1.default(options);
        console.log("resolving position: ", position);
        return yield geocoder.reverse(position);
    });
}
function updateLocalAddress() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("start updateLocalAddress ");
        const filter = {
            "localAddress.city": "",
        };
        const positionMaps = yield PositionMap_1.default.find(filter);
        lodash_1.default.map(positionMaps, (positionMap) => __awaiter(this, void 0, void 0, function* () {
            //get local address
            const position = {
                lat: positionMap.position.lat,
                lon: positionMap.position.lng,
            };
            console.log("positionMap position", position);
            const addressPromise = getGeoAddress(position);
            const addressArray = yield Promise.all([addressPromise]);
            console.log("Found ", addressArray[0][0]);
            // update
            positionMap.localAddress.city = lodash_1.default.get(addressArray[0][0], "city", "");
            positionMap.localAddress.county = lodash_1.default.get(addressArray[0][0], "county", "");
            positionMap.localAddress.state = lodash_1.default.get(addressArray[0][0], "state", "");
            positionMap.localAddress.country = lodash_1.default.get(addressArray[0][0], "country", "");
            positionMap
                .save()
                .then((positionMap) => {
                console.log("Saved address positionMap ", positionMap);
            })
                .catch((err) => {
                console.log("Error ", err);
            });
        }));
    });
}
exports.default = updateLocalAddress;
//# sourceMappingURL=position.function.js.map