import React from 'react';
import { css } from '@emotion/core';
import PulseLoader from 'react-spinners/PulseLoader';

const override = css`
    display: inline-block;
    margin-left: 5px;
    _border-color: red;
`;

export default (props) => (
  <PulseLoader
    css={override}
    sizeUnit={"px"}
    size={8}
    color={'#123abc'}
    loading={props.isLoading}
    />
)

