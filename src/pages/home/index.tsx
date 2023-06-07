import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Dropdown } from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';
import { getMater, plusDecorationContentList } from './service';
import type { dictionariesData, plusDecorationContentParam, listDataType } from './data';
import { queryKeyArrayItem, getUrlParameter } from '@/uitls/index';
import DropContent from './components/DropContent';
import List from './components/list';

export default function Page() {
  // 筛选内容
  const [synthesisData, setSynthesisData] = useState<dictionariesData[]>([]);
  const [synthesisSelected, setSynthesisSelected] = useState<string>('')
  const [styleData, setStyleData] = useState<dictionariesData[]>([]);
  const [styleSelected, setStyleSelected] = useState<string>('');
  const [spaceData, setSpaceData] = useState<dictionariesData[]>([]);
  const [spacesSelected, setSpacesSelected] = useState<string>('');

  // 获取浏览器参数
  const tfcode: string = !getUrlParameter('tfcode')?'baidu_free': getUrlParameter('tfcode');
  // 列表参数
  const [listParam, setListParams] = useState<plusDecorationContentParam>({
    currentPage: 1,
    pageSize: 20,
    contentTemplate:'9500002',
    // contentTemplateSecond:'',
    secondTagNumbers: [],
    // typeCode: '',
    tfcode: tfcode,
    ownedIp: '100004',
    sortType: 0,
  })
  // 列表内容
  const [listData, setListData] = useState<listDataType[]>([]);

  // 计算器
  const calculatorImg = require('@/assets/png/calculator.png');

  useEffect(() => {
    getDictionariesDate()
    getList();
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

  // 获取列表
  const getList = async () => {
    const { data } = await plusDecorationContentList(listParam);
    if (data.data.length) {
      setListData(data.data)
    }
  }


  // 获取当前选中项返回值
  const getSelectedValue = (type: string, value: string) => {
    if (type === 'synthesis') {
      setSynthesisSelected(value)
    } else if (type === 'style') {
      setStyleSelected(value)
    } else if (type === 'space') {
      setSpacesSelected(value)
    }
  }

  
  return (
    <div>
      {/* 筛选 */}
      <Dropdown arrow={<DownOutline />}>
        <Dropdown.Item key="synthesis" title={synthesisSelected !== '' ? synthesisSelected : '综合排序'}>
          <DropContent secondTagList={synthesisData} type={'synthesis'} onSelected={getSelectedValue} />
        </Dropdown.Item>

        <Dropdown.Item key="style" title={styleSelected !== '' ? styleSelected : '风格'}>
          <DropContent secondTagList={styleData} type={'style'} onSelected={getSelectedValue} />
        </Dropdown.Item>

        <Dropdown.Item key="space" title={spacesSelected !== '' ? spacesSelected : '风格'}>
          <DropContent secondTagList={spaceData} type={'space'} onSelected={getSelectedValue} />
        </Dropdown.Item>
      </Dropdown>

      {/* 列表 */}
      <List listData={listData}/>
    </div>
  );
}
