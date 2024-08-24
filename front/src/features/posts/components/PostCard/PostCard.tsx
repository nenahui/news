import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { NotFoundIc } from '@/assets/icons/NotFound';
import { Button } from '@/components/ui/button';
import { selectPostsDeleting } from '@/features/posts/postsSlice';
import { deletePost, fetchPosts } from '@/features/posts/postsThunks';
import type { News } from '@/types';
import React from 'react';
import { Card } from '@/components/ui/card';
import { DoubleArrowRightIcon, TrashIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import styles from './PostCard.module.scss';

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

  return (
    <Card className={styles.card}>
      {post.image ? (
        <img src={post.image} alt={'Card'} className={styles.image} />
      ) : (
        <NotFoundIc className={styles.notFound} />
      )}
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <div className={styles.cardBottom}>
          <div className={styles.cardDate}>
            <span>At {post.createdAt}</span>
            <Link to={'/'}>
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
