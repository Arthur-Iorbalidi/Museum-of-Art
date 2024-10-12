import Loader from '@components/ui/Loader/Loader';
import { memo, ReactNode } from 'react';

import styles from './Artworks.module.scss';

export enum LayoutType {
  threeColumns,
  twoColumns,
}

interface IProps {
  children: ReactNode;
  isLoading: boolean;
  message?: string;
  layoutType?: LayoutType;
}

const Artworks = ({
  children,
  message,
  isLoading,
  layoutType = LayoutType.threeColumns,
}: IProps) => {
  const classNameSwitcher = () => {
    switch (layoutType) {
      case LayoutType.threeColumns:
        return styles.threeColumns;
      case LayoutType.twoColumns:
        return styles.twoColumns;
      default:
        return styles.threeColumns;
    }
  };
  console.log('render');
  return (
    <div className={`${styles.artworks} ${classNameSwitcher()}`}>
      {isLoading && <Loader />}
      {children}
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default memo(Artworks);
