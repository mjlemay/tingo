import React from 'react';
import Button from './button';
import { basicProjectType } from '../constants/defaults';

import { CircleBackslashIcon } from '@radix-ui/react-icons';

interface BlankProps {
    children?: React.ReactNode;
    confirmHandler: Function;
    confirmMessage?: String;
    denyHandler?: Function;
    defaultPayload?: basicProjectType;
  }
  
  export default function Blank(props:BlankProps):JSX.Element {
    const { children, confirmHandler = ()=>{}, confirmMessage, defaultPayload, denyHandler = ()=>{} } = props;

    const submitConfirm = () => {
        confirmHandler(defaultPayload);
    }
  
    return (
      <>
        <p className='p-4'>
        {confirmMessage}
        </p>
        <div className='flex flex-row gap-4 justify-end'>
          <Button suffix={<CircleBackslashIcon />} handleAction={() => denyHandler()}>Cancel</Button>
          <Button suffix={<img src="/images/thumbsDownIcon.svg" />}  handleAction={() => submitConfirm()}>Confirm</Button>
        </div>
        {children}
      </>
    )
  }