import React from 'react';
import { isEmpty } from 'project-libs';
import styles from './list.less';
import { Empty } from 'antd-mobile'
import type { listDataType } from '../data';
import { ShowLoading } from '@/components/index';
import { history } from 'umi';
import { OrderSkeletons } from '@/skeletons/index';

type ListProps = {
  listData: listDataType;
  showLoading: boolean;
  onHanldeClick: (id: string) => void
}

const List = (props: ListProps) => {
  const { listData, onHanldeClick } = props;
  const browseImg = require('@/assets/png/browse.png');
  const empty = require('@/assets/png/empty.png');

  const handleClick = (id: string, event: any) => {
    onHanldeClick(id)
    // history.push(`/detail?id=${id}`)
    history.push(`/detail`, id)
    /* history.push({
      pathname: '/detail',
      query: {
        id: id
      }
    }) */
  }

  return (
    <div>
      {isEmpty(listData) ?
        <Empty
          image={empty}
          imageStyle={{ width: '183px', marginTop: '168px' }}
          description='暂时没有相关案例'
        /> :
        <div className={styles.listWrap}>
          {listData?.map((item: listDataType) => (
            <div className={styles.ItemWrap} key={item.id} onClick={(event) => handleClick(item.id, event)}>
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
      }
      <ShowLoading showLoading={props?.showLoading} />
    </div>
  );
}

export default List