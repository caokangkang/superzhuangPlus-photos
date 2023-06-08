import React, { useEffect, useState } from 'react';
import styles from './DropContent.less';

type DropProps = {
  type: string,
  secondTagList: {
    text: string,
    value: number
  }[]
  isSelected: number[];
  onSelected: (type: string, value: number) => void
}

const DropContent = (props: DropProps) => {
  const { type, secondTagList, isSelected, onSelected } = props;
  const [isSelectArray, setIsSelectArray] = useState<number[]>([])

  useEffect(() => {
    setIsSelectArray(isSelected)
  }, [isSelected])

  // 去除多余元素
  const removeElement = async (element: number) => {
    // 使用 filter 方法过滤掉要移除的元素
    const newArray = isSelectArray.filter(item => item !== element);
    await setIsSelectArray(newArray)
    onSelected(type, newArray)
  };

  const handleSelect = async (value: number) => {
    // console.log('value', value)
    let arr: number[]
    if (type == 'synthesis') {
      onSelected(type, [value])
      return
    }
    if (isSelectArray.includes(value)) {
      removeElement(value)
    } else {
      arr = [...isSelectArray, value]
      await setIsSelectArray(arr)
      onSelected(type, arr)
    }
  }
  
  return (
    <div className={styles.dropContent} >
      {secondTagList.map((item) => (
        <span className={`${styles.item} ${isSelectArray.includes(item.value) ? styles.itemActive : ''}`} key={item.value} onClick={() => handleSelect(item.value)}>{item.text}</span>
      ))}
    </div>
  );
}
export default DropContent
