import React, { useState } from 'react';
import styles from './DropContent.less';

type DropProps = {
  type: string,
  secondTagList: {
    text: string,
    value: number
  }[]
  onSelected: (type: string, value: number) => void
}

const DropContent: React.FC<DropProps> = (props) => {
  const [isSelectKey, setIsSelectKey] = useState<number>(-1)
  // console.log('props', props)
  const { type, secondTagList, onSelected } = props;

  const handleSelect = (value: number, text: string) => {
    // console.log('index', index)
    setIsSelectKey(value)
    onSelected(type, text)
  }
  return (
    <div className={styles.dropContent}>
      {secondTagList.map((item) => (
        <span className={`${styles.item} ${isSelectKey === item.value ? styles.itemActive : ''}`} key={item.value} onClick={() => handleSelect(item.value, item.text)}>{item.text}</span>
      ))}
    </div>
  );
}
export default DropContent
