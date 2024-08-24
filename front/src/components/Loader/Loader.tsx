import { SymbolIcon } from '@radix-ui/react-icons';
import React from 'react';
import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loadingBlock}>
      <SymbolIcon className={styles.loading} />
    </div>
  );
};
