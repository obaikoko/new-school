"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLetterHeadHTML = void 0;
const generateLetterHeadHTML = (result) => {
    var _a;
    const fullName = [result.firstName, result.otherName, result.lastName]
        .filter(Boolean)
        .join(' ');
    return `
    <div style="margin-bottom: 20px; font-family: Arial, sans-serif;">
      <!-- Header Section -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <!-- Student Passport -->
        <div>
          <img src="${result.image || 'https://via.placeholder.com/80'}" alt="Student Passport" style="height: 80px; width: 80px; object-fit: cover; border: 1px solid #ccc; border-radius: 4px;" />
        </div>

        <!-- School Info -->
        <div style="flex-grow: 1; text-align: center;">
          <h2 style="margin: 0;">Beryl International Schools</h2>
          <p style="margin: 0; color: #E22777; font-size: 14px;">
            Plot 1, Block 1, Ikot Eneobong (Federal Housing Estate) Calabar Municipality, Cross River State<br />
            
          </p>
          </> TEL: 07060511978, 09073091617</p>
        </div>
 
        <!-- School Logo -->
        <div>
          <img src="https://res.cloudinary.com/dzajrh9z7/image/upload/v1726781636/beryl/epfme50v5t4l66i6fzx3.jpg" alt="School Logo" style="height: 80px;" />
        </div>
      </div>

      <!-- Student Info Table -->
      <table style="width: 100%; margin-bottom: 20px; font-size: 14px; border-collapse: collapse;">
        <tr>
          <td><strong>STUDENT NAME:</strong> ${fullName}</td>
          <td><strong>CLASS:</strong> ${result.level}${result.subLevel}</td>
        </tr>
        <tr>
          <td><strong>SESSION:</strong> ${result.session} ${result.term}</td>
          <td><strong>POSITION IN CLASS:</strong> ${result.position}</td>
        </tr>
        <tr>
          <td><strong>STUDENT'S TOTAL SCORE:</strong> ${result.totalScore}</td>
          <td><strong>STUDENT AVERAGE:</strong> ${(_a = result.averageScore) === null || _a === void 0 ? void 0 : _a.toFixed(2)}</td>
        </tr>
      </table>
    </div>
  `;
};
exports.generateLetterHeadHTML = generateLetterHeadHTML;
