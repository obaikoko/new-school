"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const staffRoute_1 = __importDefault(require("./routes/staffRoute"));
const admissionRoutes_1 = __importDefault(require("./routes/admissionRoutes"));
const dataRoutes_1 = __importDefault(require("./routes/dataRoutes"));
const resultRoutes_1 = __importDefault(require("./routes/resultRoutes"));
const nextTermRoute_1 = __importDefault(require("./routes/nextTermRoute"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
const corsOptions = {
    origin: process.env.PUBLIC_DOMAIN,
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use(cookieParser());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/users', userRoutes_1.default);
app.use('/api/students', studentRoutes_1.default);
app.use('/api/staff', staffRoute_1.default);
app.use('/api/data', dataRoutes_1.default);
app.use('/api/admission', admissionRoutes_1.default);
app.use('/api/results', resultRoutes_1.default);
app.use('/api/nextTerm', nextTermRoute_1.default);
app.use(errorMiddleware_1.errorHandler);
app.use(errorMiddleware_1.notFound);
app.listen(port, () => console.log(`Server running on port ${port}`));
