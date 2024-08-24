import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/constants';
import { CommentForm } from '@/features/posts/newPost/components/commentForm/commentForm';
import { CommentItem } from '@/features/posts/onePost/components/commentItem/commentItem';
import { selectOnePostFetching, selectOnePostNews } from '@/features/posts/onePost/onePostSlice';
import { deleteComment, fetchPost } from '@/features/posts/onePost/onePostThunks';
import { formatDate } from '@/lib/formatDate';
import { ResetIcon } from '@radix-ui/react-icons';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './OnePost.module.scss';

export const OnePost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectOnePostNews);
  const isFetching = useAppSelector(selectOnePostFetching);

  useEffect(() => {
    dispatch(fetchPost(parseFloat(id)));
  }, [dispatch, id]);

  const onDelete = async (commentId: number) => {
    await dispatch(deleteComment(commentId));
    dispatch(fetchPost(parseFloat(id)));
  };

  const toBack = () => navigate(-1);

  if (isFetching) {
    return <Loader centered />;
  }

  if (news === null) {
    return <p className={'text-center text-sm text-muted-foreground'}>Something went error</p>;
  }

  return (
    <div className={styles.onePostContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3>{news.newsInfo.title}</h3>
          <span>{formatDate(news.newsInfo.createdAt)}</span>
        </div>

        <Button onClick={toBack} size={'icon'} variant={'ghost'}>
          <ResetIcon />
        </Button>
      </div>

      <p className={styles.postContent}>{news.newsInfo.content}</p>

      {news.newsInfo.image && (
        <img className={styles.postImage} src={`${API_URL}/${news.newsInfo.image}`} alt={news.newsInfo.title} />
      )}

      <div className={styles.commentsContainer}>
        <h3>Comments</h3>
        <div className={styles.commentsBlock}>
          {news.comments.length === 0 ? (
            <p>There are no comments.</p>
          ) : (
            news.comments.map((item) => <CommentItem key={item.id} comment={item} onDelete={onDelete} />)
          )}
        </div>
      </div>

      <div className={styles.commentsForm}>
        <h3>Add comment</h3>
        <CommentForm newsId={news.newsInfo.id} />
      </div>
    </div>
  );
};
