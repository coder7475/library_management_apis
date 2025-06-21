"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
// Load env variables from .env with error handling
try {
    const result = dotenv_1.default.config();
    if (result.error) {
        console.warn("Warning: .env file not found or could not be loaded.\n", result.error.message);
        process.exit(1);
    }
}
catch (error) {
    console.error("Error loading environment configuration:", error instanceof Error ? error.message : String(error));
    process.exit(1);
}
// ✅ Define Zod schema for validation
const envSchema = zod_1.z.object({
    PORT: zod_1.z
        .string()
        .default("3000")
        .transform(Number)
        .refine((val) => !Number.isNaN(val), {
        message: "PORT must be a valid number",
    }),
    HOST: zod_1.z.string().default("localhost"),
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]).default("development"),
    MONGODB_URI: zod_1.z.string().nonempty(),
});
// ✅ Validate process.env
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error("❌ Invalid environment configuration:");
    console.error(parsedEnv.error.format());
    process.exit(1);
}
// ✅ Export validated, typed, and transformed env values
exports.env = parsedEnv.data;
