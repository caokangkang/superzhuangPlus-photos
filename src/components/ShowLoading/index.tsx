import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CommonEnum } from '@/enums/index';


import styles from './index.less';

type ShowLoadingType = {
  showLoading: boolean;
}

 const ShowLoading = (props: ShowLoadingType) =>{
  const [state, setState] = useState()

  useEffect(() => {

  }, [])

  return (
    <div>
      {props.showLoading ? <div id={CommonEnum.LOADING_ID} className={styles.loadingInfo}>loading</div> : <div className={styles.loadingInfo}>没有数据了~</div>}
    </div>
  )
}

ShowLoading.defaultProps = {
  showLoading: true,
};

ShowLoading.propTypes = {
  showLoading: PropTypes.bool
};

export default ShowLoading;