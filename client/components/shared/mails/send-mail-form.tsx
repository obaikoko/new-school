'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Bold, Italic, PaintBucket, SendHorizontal } from 'lucide-react';

const SendEmailForm = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);

  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = editor?.getHTML();
    console.log({ to, subject, body, attachment });
  };

  return (
    <Card className='max-w-3xl mx-auto p-6 shadow-md space-y-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <Label>To</Label>
          <Input
            type='email'
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Subject</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Message</Label>

          {/* Toolbar with Lucide Icons */}
          <div className='flex gap-2 mb-2'>
            <Button
              type='button'
              size='icon'
              variant='ghost'
              onClick={() => editor?.chain().focus().toggleBold().run()}
              title='Bold'
            >
              <Bold className='w-5 h-5' />
            </Button>

            <Button
              type='button'
              size='icon'
              variant='ghost'
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              title='Italic'
            >
              <Italic className='w-5 h-5' />
            </Button>

            <Button
              type='button'
              size='icon'
              variant='ghost'
              onClick={() => editor?.chain().focus().setColor('#ff0000').run()}
              title='Red'
            >
              <PaintBucket className='w-5 h-5 text-red-500' />
            </Button>

            <Button
              type='button'
              size='icon'
              variant='ghost'
              onClick={() => editor?.chain().focus().setColor('#000000').run()}
              title='Black'
            >
              <PaintBucket className='w-5 h-5 text-black' />
            </Button>
          </div>

          {/* Editor */}
          <div className='border rounded-md p-2 min-h-[150px]'>
            <EditorContent editor={editor} />
          </div>
        </div>

        <div>
          <Label>Attachment</Label>
          <Input
            type='file'
            onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
          />
        </div>

        <Button type='submit' className='flex gap-2 items-center'>
          <SendHorizontal className='w-4 h-4' />
          Send
        </Button>
      </form>
    </Card>
  );
};

export default SendEmailForm;
