import React, { useState } from 'react';
import { ImageViewer, Button } from 'antd-mobile'
import { demoImages } from './data'
import styles from './index.less';

const ViewWithFooter = () => {
  const [visible, setVisible] = useState<boolean>(true)

  const browseImg = require('@/assets/png/browse.png');

  const handleClose = () => {
    setVisible(false)
  }
  const renderFooter = (image: string, index: number) => {
    return (
      <div className={styles.footer}>
        <div className={styles.contentTitle}>
          <span>(1/12)</span>
          <span>精致288平现代复式客厅美图</span>
        </div>
        <div className={styles.clickShow}>
          <img className={styles.browseImg} src={browseImg} alt="" />
          <span className={styles.browseNum}>200浏览</span>
        </div>
        <div className={styles.footerButton}></div>
      </div>
    )
  }
  return (
    <div>
      <ImageViewer.Multi
        images={demoImages}
        visible={visible}
        defaultIndex={1}
        onClick={handleClose}
        renderFooter={renderFooter}
      />
    </div>
  );
}
export default ViewWithFooter;
