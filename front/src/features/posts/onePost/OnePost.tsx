import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CommentItem } from '@/features/posts/onePost/components/commentItem/commentItem';
import { selectOnePostFetching, selectOnePostNews } from '@/features/posts/onePost/onePostSlice';
import { deleteComment, fetchPost } from '@/features/posts/onePost/onePostThunks';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const OnePost: React.FC = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectOnePostNews);
  const isFetching = useAppSelector(selectOnePostFetching);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  const onDelete = async (commentId: string) => {
    await dispatch(deleteComment(commentId));
    dispatch(fetchPost(id));
  };

  if (isFetching) {
    return <Loader />;
  }

  if (news === null) {
    return <p className={'text-center text-sm text-muted-foreground'}>Something went error</p>;
  }

  return (
    <div className={'container max-w-[600px] mt-5'}>
      <div className={'flex items-center justify-between mb-3'}>
        <h3 className={'text-xl'}>{news.newsInfo.title}</h3>
        <span className={'text-sm text-muted-foreground'}>
          {dayjs(news.newsInfo.createdAt).format('DD MMMM, YYYY hh:mm A')}
        </span>
      </div>

      <p className={'mb-4'}>{news.newsInfo.content}</p>

      <h3 className={'text-xl mb-1'}>Comments</h3>
      <div className={'flex flex-col gap-2 mb-4'}>
        {news.comments.length === 0 ? (
          <p className={'text-muted-foreground text-sm'}>There are no comments.</p>
        ) : (
          news.comments.map((item) => <CommentItem key={item.id} comment={item} onDelete={onDelete} />)
        )}
      </div>

      <h3 className={'text-xl mb-2'}>Add comment</h3>
      <form>
        <div className={'flex flex-col gap-3'}>
          <div className={'grid items-center gap-1.5'}>
            <Label htmlFor={'name'}>Name</Label>
            <Input type={'name'} id={'name'} name={'name'} placeholder={'Enter the news name'} />
          </div>

          <div className={'grid items-center gap-1.5'}>
            <Label htmlFor={'comment'}>Comment</Label>
            <Textarea rows={3} id={'comment'} name={'comment'} placeholder={'Enter the news comment'} />
          </div>

          <Button>Save</Button>
        </div>
      </form>
    </div>
  );
};
