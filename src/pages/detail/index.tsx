import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import styles from './index.less';
import type { listDataType } from './data';
import { getDecorationContentDetails } from './service';
import { urlGet, isEmpty } from 'project-libs';
import { ImageViewer, Button } from 'antd-mobile'

export default function Page() {


  // 详情图片
  const [imgData, setImgData] = useState<listDataType>({
    clickShow: 0,
    contentTitle: '',
    imgList: [],
  })
  const [visible, setVisible] = useState<boolean>(true)

  // 眼睛图标
  const browseImg = require('@/assets/png/browse.png');

  useEffect(() => {
    if (!isEmpty(history.location.state)) {
      getDetail(history.location.state)
    }
  }, [])

  // 获取详情
  const getDetail = async (id: string) => {
    if (!id) return;
    const { data } = await getDecorationContentDetails(id)
    if (data && data.imgList.length) {
      setImgData({
        clickShow: data.clickShow,
        contentTitle: data.contentTitle,
        imgList: data.imgList,
      })
    }
  }

  // 算报价
  const handleQuoted = () => {
    const tfcode = urlGet('tfcode');
    window.location.href = `${UMI_ENV == 'prod' ? 'https://m.superzhuangplus.com/' : 'http://plusm-test.chuhaikankan.com/'}QuotesGadgets?tfcode=${tfcode ? tfcode : 'baidu_free'}`;
  }

  const handleBack = () => {
    history.back();
  }


  // 自定义图片底部内容
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
            <Button block color='success' size='large' style={{ backgroundColor: '#53617C', borderStyle: 'none' }} onClick={handleQuoted}>
              装成这样要花多少钱？
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <ImageViewer.Multi
        images={imgData.imgList}
        visible={visible}
        renderFooter={renderFooter}
      />
      <div className={styles.back} onClick={handleBack}></div>
    </div>
  );
}
