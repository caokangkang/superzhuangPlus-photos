import request from '@/uitls/request';
import React from 'react';
import styles from './list.less';
import type { listDataType } from '../data';

type ListProps = {
  listData: listDataType
}

const List: React.FC<ListProps> = (props) => {
  // console.log('first', first)
  const { listData } = props;
  const testImg = require('../../../assets/yay.jpg');
  const browseImg = require('@/assets/png/browse.png');
  return (
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
    </div>
  );
}

export default List