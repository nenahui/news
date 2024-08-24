import { formatDate } from '@/lib/formatDate';
import React from 'react';
import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { selectOnePostCommentDeleting } from '@/features/posts/onePost/onePostSlice';
import { Comment } from '@/types';
import { TrashIcon } from '@radix-ui/react-icons';
import styles from './commentItem.module.scss';

interface Props {
  comment: Comment;
  onDelete: (id: number) => void;
}

export const CommentItem: React.FC<Props> = ({ comment, onDelete }) => {
  const isDeleting = useAppSelector(selectOnePostCommentDeleting);

  return (
    <Card className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{comment.author}</h3>
        <span>{formatDate(comment.createdAt, 'v2')} ago</span>
      </div>
      <p>{comment.text}</p>

      <Button
        disabled={isDeleting}
        onClick={() => onDelete(comment.id)}
        variant={'ghost'}
        size={'sm'}
        className={styles.btn}
      >
        Delete
        <TrashIcon />
      </Button>
    </Card>
  );
};
