type SubjectResult = {
  subject: string;
};

interface SubjectResultsProps {
  level: string;
}

export const subjectResults = ({
  level,
}: SubjectResultsProps): SubjectResult[] => {
  if (['SSS 1', 'SSS 2', 'SSS 3'].includes(level)) {
    return [
      { subject: 'Mathematics' },
      { subject: 'English' },
      { subject: 'Agricultural Science' },
      { subject: 'Biology' },
      { subject: 'Chemistry' },
      { subject: 'Physics' },
      { subject: 'Further Mathematics' },
      { subject: 'Technical Drawing' },
      { subject: 'History' },
      { subject: 'Christian Religious Knowledge' },
      { subject: 'Civic Education' },
      { subject: 'Computer Science(ICT)' },
      { subject: 'Geography' },
      { subject: 'Economics' },
      { subject: 'Government' },
      { subject: 'Commerce' },
      { subject: 'Literature-In-English' },
    ];
  }

  if (['JSS 1', 'JSS 2', 'JSS 3'].includes(level)) {
    return [
      { subject: 'Mathematics' },
      { subject: 'English' },
      { subject: 'Agricultural Science' },
      { subject: 'Basic Science' },
      { subject: 'Basic Technology' },
      { subject: 'Business Studies' },
      { subject: 'Christian Religious Knowledge' },
      { subject: 'Civic Education' },
      { subject: 'Computer Science(ICT)' },
      { subject: 'French' },
      { subject: 'Home Economics' },
      { subject: 'Literature-In-English' },
      { subject: 'Social Studies' },
      { subject: 'Physical And Health Education' },
    ];
  }

  if (['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'].includes(level)) {
    return [
      { subject: 'English' },
      { subject: 'Mathematics' },
      { subject: 'Social Studies' },
      { subject: 'Basic Science' },
      { subject: 'Physical And Health Education' },
      { subject: 'Christian Religious Knowledge' },
      { subject: 'Civic Education' },
      { subject: 'Computer Science(ICT)' },
      { subject: 'Quantitative Reasoning' },
      { subject: 'Verbal Reasoning' },
      { subject: 'Prevocational Studies' },
      { subject: 'Spelling Bee' },
    ];
  }

  if (level === 'Nursery 2') {
    return [
      { subject: 'English' },
      { subject: 'Mathematics' },
      { subject: 'Social Studies' },
      { subject: 'Basic Science' },
      { subject: 'Physical And Health Education' },
      { subject: 'Christian Religious Knowledge' },
      { subject: 'Computer Science(ICT)' },
      { subject: 'Prevocational Studies' },
      { subject: 'Calligraphy' },
      { subject: 'Jolly Phonics' },
    ];
  }

  if (level === 'Nursery 1') {
    return [
      { subject: 'English' },
      { subject: 'Mathematics' },
      { subject: 'Social Studies' },
      { subject: 'Basic Science' },
      { subject: 'Physical And Health Education' },
      { subject: 'Christian Religious Knowledge' },
      { subject: 'Creative Art' },
      { subject: 'Calligraphy' },
      { subject: 'Jolly Phonics' },
    ];
  }

  // Default for Lower/Upper Reception and others
  return [
    { subject: 'Language Practices' },
    { subject: 'Independence' },
    { subject: 'Control Of Movement' },
    { subject: 'Object Identification' },
    { subject: 'Oral Number Work' },
    { subject: 'Scribbling' },
    { subject: 'Responsibility' },
    { subject: 'Sociability' },
    { subject: 'Nursery Rhymes/Poems' },
    { subject: 'Drawing And Colouring' },
    { subject: 'Singing' },
    { subject: 'Games' },
  ];
};

export default subjectResults;
