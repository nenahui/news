import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { PostCard } from '@/features/posts/components/PostCard/PostCard';
import { selectPosts, selectPostsFetching } from '@/features/posts/postsSlice';
import { fetchPosts } from '@/features/posts/postsThunks';
import { SymbolIcon } from '@radix-ui/react-icons';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import styles from './Posts.module.scss';

export const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const isFetching = useAppSelector(selectPostsFetching);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className={styles.posts}>
      <div className={styles.postsHeader}>
        <h2 className={styles.postTitle}>Posts</h2>
        <Button size={'sm'}>Add new post</Button>
      </div>

      <div className={styles.postsCards}>
        {isFetching ? (
          <div className={styles.loadingBlock}>
            <SymbolIcon className={styles.loading} />
          </div>
        ) : posts.length === 0 ? (
          <p className={styles.emptyText}>The news list is empty</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};
