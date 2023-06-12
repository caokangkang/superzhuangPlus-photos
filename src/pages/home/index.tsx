import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Dropdown } from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';
import { isEmpty } from 'project-libs';
import { getMater, plusDecorationContentList, getDecorationContentDetails } from './service';
import type { dictionariesData, listDataType } from './data';
import { queryKeyArrayItem, getUrlParameter } from '@/uitls/index';
import DropContent from './components/DropContent';
import List from './components/list';
import { useObserverHook } from '@/hooks/index';
import { CommonEnum } from '@/enums/index';

export default function Page() {
  // 筛选内容
  const [synthesisData, setSynthesisData] = useState<dictionariesData[]>([]);
  const [synthesisSelected, setSynthesisSelected] = useState<number[]>([])
  const [styleData, setStyleData] = useState<dictionariesData[]>([]);
  const [styleSelected, setStyleSelected] = useState<number[]>([])
  const [spaceData, setSpaceData] = useState<dictionariesData[]>([]);
  const [spacesSelected, setSpacesSelected] = useState<number[]>([])
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [tagNum, setTagNum] = useState<number[]>([]);
  const [visible, setVisible] = useState<boolean>(false)

  // 页数
  const [page, setPage] = useState(CommonEnum.PAGE);

  // 是否吸顶元素
  const [isSticky, setIsSticky] = useState<boolean>(false);

  // 获取浏览器参数
  const tfcode: string = !getUrlParameter('tfcode') ? 'baidu_free' : getUrlParameter('tfcode');
  // 列表内容
  const [listData, setListData] = useState<listDataType[]>([]);

  // 详情图片
  const [imgList, setImgList] = useState<listDataType>({
    clickShow: 0,
    contentTitle: '',
    imgList: [],
  })

  // 计算器
  const calculatorImg = require('@/assets/png/calculator.png');

  useEffect(() => {
    getDictionariesDate()
    getList(1);
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])


  const getDictionariesDate = async () => {
    const { data } = await getMater()
    if (data.length) {
      // setListData(data)
      const synthesis = queryKeyArrayItem(data, '排序', 'tagName');
      setSynthesisData(synthesis.secondTagList)
      const style = queryKeyArrayItem(data, '风格', 'tagName');
      setStyleData(style.secondTagList)
      const space = queryKeyArrayItem(data, '空间', 'tagName');
      setSpaceData(space.secondTagList)
    }
  }

  const invokeHttp = async (currentPage: number, sortType: number = 0, secondTagNumbers: number[] = []) => {
    const { data } = await plusDecorationContentList({
      ...page,
      currentPage,
      contentTemplate: '9500005',
      // contentTemplateSecond:'',
      secondTagNumbers,
      // typeCode: '',
      tfcode: tfcode,
      ownedIp: '100004',
      sortType: sortType,
    });

    return data;
  }

  // 获取列表
  const getList = async (currentPage: number) => {
    const data = await invokeHttp(currentPage);
    if (!isEmpty(data)) {
      setListData(data.data)
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }


  // 获取详情
  const getDetail = async (id: string) => {
    if (!id) return;
    const { data } = await getDecorationContentDetails(id)
    if (data && data.imgList.length) {
      setImgList({
        clickShow: data.clickShow,
        contentTitle: data.contentTitle,
        imgList: data.imgList,
      })
    }
  }

  // 关闭详情
  const closeDetail = (flag: boolean) => {
    setTimeout(() => {
      setVisible(flag)
    }, 200)
  }




  // 获取详情ID
  const getContentId = async (id: string) => {
    if (id) {
      await getDetail(id);
      await setVisible(true)
    }
  }


  // 获取当前选中项返回值
  const getSelectedValue = async (type: string, value: Array<number>) => {
    setListData([])
    if (type === 'synthesis') {
      setStyleSelected([])
      setSpacesSelected([])
      setSynthesisSelected(value)
    } else if (type === 'style') {
      setSynthesisSelected([])
      setSpacesSelected([])
      setStyleSelected(value)
    } else if (type === 'space') {
      setSynthesisSelected([])
      setStyleSelected([])
      setSpacesSelected(value)
    }
    const tagNum = JSON.parse(JSON.stringify(value));
    // setTagNum(tagNum)
    let data = await invokeHttp(1, type === 'synthesis' ? value[0] : 0, type === 'synthesis' ? [] : value);
    if (!isEmpty(data)) {
      setListData(data.data)
      setShowLoading(true);
    } else {
      setShowLoading(false);
    }
  }

  /**
 * 1，页面初始化时候请求接口；
 * 2，监听loading组件是否展示出来；
 * 3，修改page,pageNum+1,再次重新请求接口；
 * 4，拼装数据，然后page
 */
  useObserverHook('#' + CommonEnum.LOADING_ID, async (entries: any) => {
    // console.log(entries)
    if (entries[0].isIntersecting) {
      const result = await invokeHttp(page.currentPage + 1);
      if (!isEmpty(listData) && !isEmpty(result.data) && result.data.length === page.pageSize) {
        setListData([...listData, ...result.data]);
        setPage({
          ...page,
          currentPage: page.currentPage + 1
        });
        setShowLoading(true);
      } else {
        setShowLoading(false);
      }
    }
  }, null);

  //  判断是否超过导航高度
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const threshold = 200; // 滚动位置阈值
    setIsSticky(scrollTop > threshold);
  };

  // 算报价
  const handleQuoted = () => {
    window.location.href = 'http://plusm-test.chuhaikankan.com/QuotesGadgets?tfcode=baidu_free&PageName=';
  }


  return (
    <div>
      <div className={isSticky ? styles.sticky : ''}>
        {/* 筛选 */}
        <Dropdown arrow={<DownOutline />} >
          <Dropdown.Item key="synthesis" title='综合排序'>
            <DropContent secondTagList={synthesisData} isSelected={synthesisSelected} type={'synthesis'} onSelected={getSelectedValue} />
          </Dropdown.Item>

          <Dropdown.Item key="style" title='风格'>
            <DropContent secondTagList={styleData} isSelected={styleSelected} type={'style'} onSelected={getSelectedValue} />
          </Dropdown.Item>

          <Dropdown.Item key="space" title='空间'>
            <DropContent secondTagList={spaceData} isSelected={spacesSelected} type={'space'} onSelected={getSelectedValue} />
          </Dropdown.Item>
        </Dropdown>
      </div>

      {/* 列表 */}
      <List listData={listData} showLoading={showLoading} onHanldeClick={getContentId} />

      {/* 算报价 */}
      <div className={styles.quotedPrice} onClick={handleQuoted}>
        <img src={calculatorImg} alt="" />
      </div>

    </div>
  );
}
