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
exports.generateStudentPdf = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const generateStudentPdf = (html) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = yield page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '0cm', bottom: '0cm', left: '0cm', right: '0cm' },
        scale: 0.75, // Try 0.8 or 0.75 if needed
    });
    yield browser.close();
    return Buffer.from(pdfBuffer);
});
exports.generateStudentPdf = generateStudentPdf;
