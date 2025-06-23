"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getGrade = (totalScore) => {
    if (totalScore >= 90)
        return 'A+';
    if (totalScore >= 80)
        return 'A';
    if (totalScore >= 70)
        return 'B+';
    if (totalScore >= 60)
        return 'B';
    if (totalScore >= 50)
        return 'C';
    if (totalScore >= 40)
        return 'D';
    return 'F9';
};
exports.default = getGrade;
