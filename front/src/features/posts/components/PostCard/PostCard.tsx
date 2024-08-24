import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { NotFoundIc } from '@/assets/icons/NotFound';
import { Button } from '@/components/ui/button';
import { API_URL } from '@/constants';
import { selectPostsDeleting } from '@/features/posts/postsSlice';
import { deletePost, fetchPosts } from '@/features/posts/postsThunks';
import type { News } from '@/types';
import React from 'react';
import { Card } from '@/components/ui/card';
import { DoubleArrowRightIcon, TrashIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import styles from './PostCard.module.scss';
import dayjs from 'dayjs';

interface Props {
  post: News;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const dispatch = useAppDispatch();
  const isDeleting = useAppSelector(selectPostsDeleting);

  const onDelete = async () => {
    await dispatch(deletePost(post.id));
    dispatch(fetchPosts());
  };

  let image = <NotFoundIc className={styles.notFound} />;

  if (post.image) {
    image = <img src={`${API_URL}/${post.image}`} alt={'Card'} className={styles.image} />;
  }

  return (
    <Card className={styles.card}>
      {image}
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <div className={styles.cardBottom}>
          <div className={styles.cardDate}>
            <span>{dayjs(post.createdAt).format('DD MMMM, YYYY hh:mm A')}</span>
            <Link to={`/news/${post.id}`}>
              Read full post
              <DoubleArrowRightIcon className={'mb-[-2px]'} />
            </Link>
          </div>
          <Button
            disabled={isDeleting}
            onClick={onDelete}
            size={'sm'}
            variant={'ghost'}
            className={'hover:text-red-600'}
          >
            Delete <TrashIcon />
          </Button>
        </div>
      </div>
    </Card>
  );
};
