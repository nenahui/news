import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Comment } from '@/types';
import { TrashIcon } from '@radix-ui/react-icons';
import React from 'react';

interface Props {
  comment: Comment;
  onDelete: (id: string) => void;
}

export const CommentItem: React.FC<Props> = ({ comment, onDelete }) => {
  return (
    <Card className={'px-3 py-1 pt-2 rounded-lg'}>
      <h3 className={'text-muted-foreground'}>{comment.author}</h3>
      <p className={'text-sm'}>{comment.text}</p>

      <Button onClick={() => onDelete(comment.id)} variant={'outline'} size={'sm'} className={'ml-auto flex py-1'}>
        Delete
        <TrashIcon />
      </Button>
    </Card>
  );
};
