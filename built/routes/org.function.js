"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Org_1 = __importDefault(require("../models/Org"));
function addMemberToOrg(req, res, memberId, orgId) {
    console.log("start addMemberToOrg: ", memberId, orgId);
    Org_1.default.findById(orgId, function (err, org) {
        if (err) {
            console.log("Error ", err);
            res.status(404).send("Unable to addMember");
        }
        else {
            if (!org) {
                res.json({});
            }
            else {
                console.log("addMemberToOrg found org: ", org);
                if (!org.members.includes(memberId)) {
                    org.members.push(memberId);
                    org
                        .save()
                        .then((org) => {
                        console.log("addMemberToOrg done", org);
                        res.json(org);
                    })
                        .catch((err) => {
                        console.log("addMember err", err);
                        res.status(400).send("Unable to addMember");
                    });
                }
            }
        }
    });
}
exports.default = addMemberToOrg;
//# sourceMappingURL=org.function.js.map