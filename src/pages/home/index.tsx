import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Dropdown } from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';
import { getMater } from '@/services/home';

export default function Page() {
  const [list, setList] = useState([]);
  useEffect(() => {
    console.log('list', getMater())
    // getMater()
  })

  return (
    <div>
      <Dropdown arrow={<DownOutline />}>
        <Dropdown.Item key="synthesis" title='综合排序'>
          <div className={styles.dropContent}>
            <span className={styles.item}>全部</span>
            <span className={styles.item}>全部</span>
            <span className={styles.item}>全部</span>
            <span className={styles.item}>全部</span>
            <span className={styles.item}>全部</span>
            <span className={styles.item}>全部</span>
          </div>
        </Dropdown.Item>

        <Dropdown.Item key="style" title='风格'>

        </Dropdown.Item>

        <Dropdown.Item key="space" title='空间'>

        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}
