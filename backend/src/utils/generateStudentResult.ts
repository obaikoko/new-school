export const generateStudentResultHTML = () => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Student Result Sheet</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 30px;
        color: #000;
        font-size: 12px;
      }
  
      h2 {
        text-align: center;
        margin-bottom: 5px;
      }
  
      .school-info {
        text-align: center;
        font-size: 13px;
        margin-bottom: 15px;
      }
  
      table {
        border-collapse: collapse;
        width: 100%;
      }
  
      th, td {
        border: 1px solid #000;
        padding: 4px 6px;
        text-align: left;
      }
  
      th {
        background-color: #f0f0f0;
      }
  
      .info-table {
        margin-bottom: 20px;
      }
  
      .section-title {
        font-weight: bold;
        text-decoration: underline;
        margin: 20px 0 10px 0;
        font-size: 13px;
      }
  
      .report-container {
        display: flex;
        justify-content: space-between;
        gap: 20px;
      }
  
      .left-column {
        width: 65%;
      }
  
      .right-column {
        width: 35%;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
  
      .remarks, .footer, .account-section {
        margin-top: 20px;
      }
  
      .footer {
        text-align: center;
        font-size: 11px;
        margin-top: 30px;
      }
  
      .narrow-table td, .narrow-table th {
        padding: 3px 5px;
      }
  
      .grading-table {
        width: auto;
        margin-top: 15px;
      }
    </style>
  </head>
  <body>
  
    <h2>BENDONALDS INTERNATIONAL SCHOOLS</h2>
    <div class="school-info">
      NO. 9 BY MTN MAST, ODUKPANI CLOSE, IKOT ENEOBONG, CALABAR, C.R.S NIGERIA<br>
      bendonaldsschools@gmail.com | 07038307768, 08169866808
    </div>
  
    <table class="info-table">
      <tr>
        <td><strong>STUDENT NAME:</strong> Emmanuella Christopher Abang</td>
        <td><strong>CLASS:</strong> JSS 3A</td>
      </tr>
      <tr>
        <td><strong>SESSION:</strong> 2024/2025 Second Term</td>
        <td><strong>STUDENT AVERAGE:</strong> 71.36</td>
      </tr>
      <tr>
        <td><strong>TOTAL SCORE:</strong> 999 Out of 1400</td>
        <td><strong>PASS/FAIL:</strong> PASS</td>
      </tr>
    </table>
  
    <div class="section-title">ACADEMIC PERFORMANCE REPORT</div>
    <div class="report-container">
      <div class="left-column">
        <table class="narrow-table">
          <thead>
            <tr>
              <th>SUBJECT</th>
              <th>TEST (30%)</th>
              <th>EXAM (70%)</th>
              <th>TOTAL (100%)</th>
              <th>GRADE</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Mathematics</td><td>22</td><td>48</td><td>70</td><td>B+</td></tr>
            <tr><td>English</td><td>22</td><td>46</td><td>68</td><td>B</td></tr>
            <tr><td>Agricultural Science</td><td>23</td><td>42</td><td>65</td><td>B</td></tr>
            <tr><td>Basic Science</td><td>16</td><td>42</td><td>58</td><td>C</td></tr>
            <tr><td>Business Studies</td><td>28</td><td>52</td><td>80</td><td>A</td></tr>
            <tr><td>Home Economics</td><td>28</td><td>58</td><td>86</td><td>A</td></tr>
            <tr><td>Social Studies</td><td>21</td><td>47</td><td>68</td><td>B</td></tr>
            <tr><td>Mathematics</td><td>22</td><td>48</td><td>70</td><td>B+</td></tr>
            <tr><td>English</td><td>22</td><td>46</td><td>68</td><td>B</td></tr>
            <tr><td>Agricultural Science</td><td>23</td><td>42</td><td>65</td><td>B</td></tr>
            <tr><td>Basic Science</td><td>16</td><td>42</td><td>58</td><td>C</td></tr>
            <tr><td>Business Studies</td><td>28</td><td>52</td><td>80</td><td>A</td></tr>
            <tr><td>Home Economics</td><td>28</td><td>58</td><td>86</td><td>A</td></tr>
            <tr><td>Social Studies</td><td>21</td><td>47</td><td>68</td><td>B</td></tr>
          </tbody>
        </table>
      </div>
  
      <div class="right-column">
        <div>
          <div class="section-title">AFFECTIVE ASSESSMENT</div>
          <table class="narrow-table">
            <tr><td>Attendance</td><td>B</td></tr>
            <tr><td>Carefulness</td><td>B</td></tr>
            <tr><td>Responsibility</td><td>A</td></tr>
            <tr><td>Honesty</td><td>A</td></tr>
            <tr><td>Neatness</td><td>A</td></tr>
            <tr><td>Obedience</td><td>A</td></tr>
            <tr><td>Politeness</td><td>A</td></tr>
            <tr><td>Punctuality</td><td>A</td></tr>
          </table>
        </div>
  
        <div>
          <div class="section-title">PSYCHOMOTOR SKILLS</div>
          <table class="narrow-table">
            <tr><td>Handwriting</td><td>B</td></tr>
            <tr><td>Drawing</td><td>B</td></tr>
            <tr><td>Sport</td><td>A</td></tr>
            <tr><td>Speaking</td><td>B</td></tr>
            <tr><td>Music</td><td>B</td></tr>
            <tr><td>Craft</td><td>B</td></tr>
            <tr><td>Computer Practice</td><td>A</td></tr>
          </table>
        </div>
      </div>
    </div>
  
    <div class="section-title">GRADING SYSTEM</div>
    <table class="grading-table">
      <tr><td>90 - 100</td><td>A+</td></tr>
      <tr><td>80 - 89</td><td>A</td></tr>
      <tr><td>70 - 79</td><td>B+</td></tr>
      <tr><td>60 - 69</td><td>B</td></tr>
      <tr><td>50 - 59</td><td>C</td></tr>
      <tr><td>40 - 49</td><td>D</td></tr>
      <tr><td>0 - 39</td><td>F</td></tr>
    </table>
  
    <div class="remarks">
      <p><strong>Teacher's Remark:</strong> An impressive result, Emmanuella. You can do better next term.</p>
      <p><strong>Principal's Remark:</strong> An impressive performance. Keep working hard.</p>
    </div>
  
    <div class="account-section">
      <div class="section-title">NEXT TERM DETAILS</div>
      <table class="narrow-table">
        <tr><td>Re-opening Date:</td><td>April 28, 2025</td></tr>
        <tr><td>Next Term Fee:</td><td>₦73,000</td></tr>
        <tr><td>Bus Fare (Optional):</td><td>₦45,000</td></tr>
        <tr><td>Other Charges:</td><td>₦0</td></tr>
      </table>
  
      <div class="section-title">ACCOUNT DETAILS</div>
      <p><strong>Account Name:</strong> BENDONALDS INTERNATIONAL SCHOOLS</p>
      <p><strong>Account Number:</strong> 4091765229</p>
      <p><strong>Bank Name:</strong> POLARIS</p>
    </div>
  
    <div class="footer">
      <p>Generated by bendonaldschools.com | Powered by yourschoolengine</p>
    </div>
  </body>
  </html>`;
};
