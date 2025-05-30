// src/utils/studentReportTemplate.ts

interface Student {
  // studentId: string,
  firstName: string;
  lastName: string;
  level: string;
  subLevel: string;
}
export const generateStudentHTML = (students: Student[]): string => {
  const rows = students
    .map(
      (s) => `
      <tr>
        
        <td>${s.firstName}</td>
        <td>${s.lastName}</td>
        <td>${s.level}</td>
        <td>${s.subLevel}</td>
      </tr>`
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Students Report</h2>
        <table>
          <thead>
            <tr>
              
              <th>First Name</th>
              <th>Last Name</th>
              <th>Level</th>
              <th>Sub Level</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `;
};
