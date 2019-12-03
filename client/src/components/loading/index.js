import React from 'react';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

const override = css`
    display: block;
    margin: 150px auto;
    border-color: red;
`;

export default (props) => (
  <div className='sweet-loading'>
  <BarLoader
    css={override}
    height={6}
    width={200}
    color={'#123abc'}
    loading={props.isLoading}
    />
  </div>
)
