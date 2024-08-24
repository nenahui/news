import { SymbolIcon } from '@radix-ui/react-icons';
import React from 'react';
import styles from './Loader.module.scss';

interface Props {
  centered?: boolean;
  className?: string;
}

export const Loader: React.FC<Props> = ({ centered = false, className }) => {
  return (
    <div
      className={styles.loadingBlock}
      style={{ position: centered ? 'absolute' : 'static', transform: centered ? 'translate(-50%, -50%)' : 'none' }}
    >
      <SymbolIcon className={`${styles.loading} ${className}`} />
    </div>
  );
};
