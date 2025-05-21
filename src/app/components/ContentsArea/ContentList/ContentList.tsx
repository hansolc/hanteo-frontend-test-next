import { ContentsListResponse } from '@/schema/contents';
import styles from './ContentList.module.scss';

interface ContentListProps {
  listInfo: ContentsListResponse['contents'];
}

const ContentList = ({ listInfo }: ContentListProps) => {
  return (
    <div className={styles.contentListWrapper}>
      {listInfo.map((item, idx) => {
        return (
          <div key={item.id} className={styles.contentListItemWrapper}>
            <div>{item.img}</div>
            <div className={styles.ranking}>{item.ranking}</div>
            <div className={styles.info}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.artist}>{item.artist}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentList;
