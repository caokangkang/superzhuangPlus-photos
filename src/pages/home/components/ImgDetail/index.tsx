import React, { useEffect, useState } from 'react';
import { ImageViewer, Button } from 'antd-mobile'
import { demoImages } from './data';
import styles from './index.less';

type viewImgType = {
  imgData: {
    clickShow: number;
    contentTitle: string;
    imgList: string[]
  };
  visible: boolean;
  onClose: (flag: boolean) => void
}

const ViewWithFooter = (props: viewImgType) => {
  const { imgData, visible, onClose} = props;
  const browseImg = require('@/assets/png/browse.png');

  const handleClose = () => {
    onClose(false)
  }

  const renderFooter = (image: string, index: number) => {
    return (
      <div className={styles.footer}>
        <div className={styles.contentTitle}>
          <span>({index + 1}/{imgData.imgList.length})</span>
          <span>{imgData.contentTitle}</span>
        </div>
        <div className={styles.clickShow}>
          <img className={styles.browseImg} src={browseImg} alt="" />
          <span className={styles.browseNum}>{imgData.clickShow}浏览</span>
        </div>
        <div className={styles.footerButton}>
          <div className={styles.button}>
            <Button block color='success' size='large' style={{ backgroundColor: '#53617C', borderStyle: 'none' }}>
              装成这样要花多少钱？
            </Button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <ImageViewer.Multi
        images={imgData.imgList}
        visible={visible}
        onClose={handleClose}
        renderFooter={renderFooter}
      />
    </div>
  );
}
export default ViewWithFooter;
