"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../../app"));
const supertest_1 = __importDefault(require("supertest"));
let token = "";
// create random email
let dummyEmail = Math.random().toString(36).substring(7) + "@gmail.com";
let userId = "";
// get token
beforeAll(async () => {
    const response = await (0, supertest_1.default)(app_1.default).post("/api/v1/auth/login").send({
        email: "super@admin.com",
        password: "P@ssw0rd",
    });
    token = response.body.accessToken;
});
// get all user test
describe("GET /api/v1/users", () => {
    it("should return 200 if user is authenticated", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .get("/api/v1/users")
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
    });
    it("should return 401 if user is not authenticated", async () => {
        const response = await (0, supertest_1.default)(app_1.default).get("/api/v1/users");
        expect(response.status).toBe(401);
        expect(response.body.message).toBe(" Un-Authorized ");
    });
});
// create user test
describe("POST /api/v1/users", () => {
    it("should return 401 if user is not authenticated", async () => {
        const response = await (0, supertest_1.default)(app_1.default).post("/api/v1/users").send({});
        expect(response.status).toBe(401);
        expect(response.body.message).toBe(" Un-Authorized ");
    });
    it("should return 400 if email, password, name, birthDate, gender, religion, address is missing", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/api/v1/users")
            .send({})
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("errors");
    });
    it("should return 200 if user is created", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post("/api/v1/users")
            .send({
            email: dummyEmail,
            password: "P@ssw0rd",
            confirmPassword: "P@ssw0rd",
            name: "Yu Zong",
            birthDate: "2022-05-01",
            address: "China",
            gender: "Laki-Laki",
            religion: "Budha",
            roleId: 4,
        })
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("data");
        expect(response.body.message).toBe("User Created Succesfully");
        userId = response.body.data.id;
    });
});
// delete user test
describe("DELETE /api/v1/users/:id", () => {
    it("should return 200 if user is deleted", async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .delete("/api/v1/users/" + userId)
            .set("Authorization", "Bearer " + token);
        expect(response.status).toBe(200);
        // exprect message to be deleted
        expect(response.body.message).toBe("User Deleted Succesfully");
    });
});
//# sourceMappingURL=user.test.js.map