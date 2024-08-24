import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { selectOnePostCreating } from '@/features/posts/onePost/onePostSlice';
import { addComment, fetchPost } from '@/features/posts/onePost/onePostThunks';
import type { CommentMutation } from '@/types';
import React, { type ChangeEvent, type FormEvent, useState } from 'react';
import { toast } from 'sonner';
import styles from './commentForm.module.scss';

interface Props {
  newsId: number;
}

export const CommentForm: React.FC<Props> = ({ newsId }) => {
  const isCreating = useAppSelector(selectOnePostCreating);
  const dispatch = useAppDispatch();
  const initialState: CommentMutation = {
    news_id: newsId,
    author: '',
    text: '',
  };

  const [commentMutation, setCommentMutation] = useState<CommentMutation>(initialState);

  const onFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setCommentMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!commentMutation.text) {
      return toast.warning('The text of the comment are required!', {
        className: 'border',
        duration: 1500,
      });
    }

    await dispatch(addComment(commentMutation));
    dispatch(fetchPost(newsId));
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formContainer}>
        <div className={styles.fieldContainer}>
          <Label htmlFor={'author'}>Name</Label>
          <Input
            type={'author'}
            id={'author'}
            name={'author'}
            placeholder={'Enter the your name'}
            onChange={onFieldChange}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Label htmlFor={'text'}>Comment</Label>
          <Textarea rows={3} id={'text'} name={'text'} placeholder={'Enter your comment'} onChange={onFieldChange} />
        </div>

        <Button type={'submit'} disabled={isCreating} size={'sm'} className={'mr-auto'}>
          Add comment
        </Button>
      </div>
    </form>
  );
};
