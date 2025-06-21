"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema, source = "body") => (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: result.error.errors,
        });
    }
    // overwrite with parsed data
    req[source] = result.data;
    next();
};
exports.validate = validate;
