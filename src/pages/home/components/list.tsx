import React from 'react';
import { isEmpty } from 'project-libs';
import styles from './list.less';
import type { listDataType } from '../data';
import { ShowLoading } from '@/components/index';
import { OrderSkeletons } from '@/skeletons/index';

type ListProps = {
  listData: listDataType;
  showLoading: boolean;
}

const List = (props: ListProps) => {
  const { listData } = props;
  const browseImg = require('@/assets/png/browse.png');
  return (
    <div>
      {isEmpty(listData) ?
        <OrderSkeletons /> :
        <div className={styles.listWrap}>
          {listData?.map((item: listDataType) => (
            <div className={styles.ItemWrap} key={item.id}>
              <div className={styles.imgContent}>
                <img src={item.firstImg} alt="" />
                <div className={styles.browseWrap}>
                  <img className={styles.browseImg} src={browseImg} alt="" />
                  <span className={styles.browseNum}>{item.clickShow}</span>
                </div>
              </div>
              <div className={styles.spaceCotent}>{item.contentTitle}</div>
            </div>
          ))}
          <ShowLoading showLoading={props?.showLoading} />
        </div>
      }
    </div>
  );
}

export default List