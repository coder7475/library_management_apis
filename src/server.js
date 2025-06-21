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
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const envConfig_1 = require("./configs/envConfig");
const server = app_1.default.listen(envConfig_1.env.PORT, () => {
    console.log(`🚀 Server (${envConfig_1.env.NODE_ENV}) running at https://${envConfig_1.env.HOST}:${envConfig_1.env.PORT}`);
    // connect to database
    connectToMongoDB();
});
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(envConfig_1.env.MONGODB_URI);
            console.log("✅ Connected to MongoDB");
        }
        catch (error) {
            console.error("❌ MongoDB connection error:", error);
            process.exit(1); // Exit if DB connection fails
        }
    });
}
// Graceful shutdown handler
const onCloseSignal = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🛑 SIGINT/SIGTERM received, shutting down gracefully...");
    try {
        yield mongoose_1.default.disconnect();
        console.log("✅ Disconnected from MongoDB");
    }
    catch (err) {
        console.error("⚠️ Error disconnecting from MongoDB:", err);
    }
    server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
    });
    // Force shutdown if it takes too long
    setTimeout(() => {
        console.error("❌ Forcefully exiting after timeout");
        process.exit(1);
    }, 10000).unref();
});
// Listen to termination signals
process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
