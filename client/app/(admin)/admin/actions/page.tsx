'use client';

import { useState } from 'react';
import {
  FilePlus,
  BookOpen,
  BadgeDollarSign,
  CalendarCheck,
  Upload,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import RegisterStudentsForm from '@/components/shared/students/register-form';
import PublishResultForm from '@/components/shared/results/publish-result';
import ResumptionInfoForm from '@/components/shared/results/resumption-info-form';
import RegisterUsersForm from '@/components/shared/users/register-form';
import AddSubjectToResult from '@/components/shared/results/add-subject-result';
import RemoveSubjectFromResult from '@/components/shared/results/remove-subject';

const actions = [
  {
    title: 'Register Users',
    description: 'Add new Users to the system.',
    icon: Users,
    content: <RegisterUsersForm />,
  },
  {
    title: 'Register Students',
    description: 'Add new students to the system.',
    icon: Users,
    content: <RegisterStudentsForm />,
  },
  {
    title: 'Add Subjects',
    description: 'Create and manage subjects offered.',
    icon: BookOpen,
    content: <AddSubjectToResult />,
  },
  {
    title: 'Remove Subjects',
    description: 'Create and manage subjects offered.',
    icon: BookOpen,
    content: <RemoveSubjectFromResult />,
  },
  {
    title: 'Publish Results',
    description: 'Release term results to students.',
    icon: Upload,
    content: <PublishResultForm />,
  },
  {
    title: 'Set Resumption Information',
    description: 'Define tuition and other Information.',
    icon: BadgeDollarSign,
    content: <ResumptionInfoForm />,
  },
  {
    title: 'Manage Timetable',
    description: 'Create or update class schedules.',
    icon: CalendarCheck,
    content: <div>Timetable Management Form</div>,
  },

  {
    title: 'Post Announcements',
    description: 'Share important info with staff/students.',
    icon: FilePlus,
    content: <div>Announcements Form</div>,
  },
];

const ActionsPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    null | (typeof actions)[0]
  >(null);

  const handleClick = (action: (typeof actions)[0]) => {
    setSelectedAction(action);
    setOpen(true);
  };

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {actions.map((action) => (
          <Card key={action.title} className='flex flex-col justify-between'>
            <CardHeader className='flex flex-row items-center gap-4'>
              <action.icon className='w-6 h-6 text-primary' />
              <div>
                <CardTitle className='text-lg'>{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button onClick={() => handleClick(action)} className='w-full'>
                Go to {action.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl backdrop-blur-md'>
          <DialogHeader>
            <DialogTitle>{selectedAction?.title}</DialogTitle>
            <DialogDescription>{selectedAction?.description}</DialogDescription>
          </DialogHeader>
          <div className='mt-4'>{selectedAction?.content}</div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionsPage;
