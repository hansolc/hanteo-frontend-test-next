import { ContentsListResponse } from '@/schema/contents';
import styles from './ContentList.module.scss';
import { ActionResult } from '@/types/action';

interface ContentListProps {
  listInfo: ActionResult<ContentsListResponse>;
}

const ContentList = ({ listInfo }: ContentListProps) => {
  if (listInfo.status === 'error') {
    return <div>error</div>;
  }

  const { contents, limit, skip, total } = listInfo.data;

  return (
    <div className={styles.contentListWrapper}>
      {contents.map((item, idx) => {
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
