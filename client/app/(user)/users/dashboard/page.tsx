const TeacherDashboardPage = () => {
  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Welcome, Teacher</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white dark:bg-gray-800 rounded-2xl p-4 shadow'>
          <h2 className='text-sm text-muted-foreground'>Total Classes</h2>
          <p className='text-2xl font-semibold'>4</p>
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-2xl p-4 shadow'>
          <h2 className='text-sm text-muted-foreground'>Students Taught</h2>
          <p className='text-2xl font-semibold'>86</p>
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-2xl p-4 shadow'>
          <h2 className='text-sm text-muted-foreground'>Pending Results</h2>
          <p className='text-2xl font-semibold'>3</p>
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-2xl p-4 shadow'>
          <h2 className='text-sm text-muted-foreground'>Messages</h2>
          <p className='text-2xl font-semibold'>5</p>
        </div>
      </div>

      {/* Timetable Preview */}
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow p-4'>
        <h2 className='text-lg font-semibold mb-3'>Today's Timetable</h2>
        <ul className='space-y-2'>
          <li className='flex justify-between'>
            <span>8:00 AM - 9:00 AM</span>
            <span>Mathematics (JSS2)</span>
          </li>
          <li className='flex justify-between'>
            <span>9:00 AM - 10:00 AM</span>
            <span>Basic Science (JSS3)</span>
          </li>
          <li className='flex justify-between'>
            <span>11:00 AM - 12:00 PM</span>
            <span>Health Ed (JSS1)</span>
          </li>
        </ul>
      </div>

      {/* Announcements */}
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow p-4'>
        <h2 className='text-lg font-semibold mb-3'>Announcements</h2>
        <ul className='list-disc pl-5 text-sm space-y-2'>
          <li>Submit all pending results before Friday.</li>
          <li>Staff meeting scheduled for Monday at 2 PM.</li>
          <li>New exam timetable will be shared next week.</li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
