import { useAppDispatch } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/features/posts/newPost/newPostThunks';
import type { NewsMutation } from '@/types';
import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const initialState: NewsMutation = {
  image: null,
  title: '',
  content: '',
};

export const NewPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [newsMutation, setNewsMutation] = useState<NewsMutation>(initialState);

  const onFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setNewsMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFileChang = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setNewsMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!newsMutation.content || !newsMutation.title) {
      return toast.warning('The title and contents of the news are required!', {
        className: 'border',
        duration: 1500,
      });
    }

    await dispatch(createPost(newsMutation));

    toast.success('The post has been successfully created.', {
      className: 'border',
      duration: 1500,
    });
    navigate('/');
  };

  return (
    <div className={'container max-w-[600px] mt-5'}>
      <div className={'flex items-center justify-between mb-3'}>
        <h2 className={'text-2xl leading-none'}>Add new post</h2>
        <Link to={'/'}>
          <Button size={'sm'} variant={'outline'}>
            Cancel
          </Button>
        </Link>
      </div>

      <form onSubmit={onSubmit}>
        <div className={'flex flex-col gap-3'}>
          <div className={'grid items-center gap-1.5'}>
            <Label htmlFor={'title'}>Title</Label>
            <Input
              type={'text'}
              id={'title'}
              name={'title'}
              placeholder={'Enter the news title'}
              onChange={onFieldChange}
            />
          </div>

          <div className={'grid items-center gap-1.5'}>
            <Label htmlFor={'content'}>Content</Label>
            <Textarea
              rows={6}
              id={'content'}
              name={'content'}
              placeholder={'Enter the news content'}
              onChange={onFieldChange}
            />
          </div>

          <div className={'grid items-center gap-1.5'}>
            <Label htmlFor={'image'}>Image</Label>
            <Input type={'file'} id={'image'} name={'image'} onChange={onFileChang} />
          </div>

          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
};
