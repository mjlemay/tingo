import React from 'react';

interface ImageButtonProps {
    children?: React.ReactNode;
    height?: number;
    image?: string;
    label?: string;
    width?: number;
    handleAction?: Function;
  }
  
  export default function ImageButton(props:ImageButtonProps):JSX.Element {
    const {image, handleAction, height, label, width } = props;
    const imgWidth = width || '100%';
    const imgHeight = height || '100%';
  
    return (
      <div className={`rounded-lg bg-neutral-500 m-2 flex drop-shadow-lg overflow-hidden bg-cover cursor-pointer`}
        style={{
          width: imgWidth,
          height: imgHeight,
          backgroundImage: `url('${image}')`
        }}
        onClick={() => handleAction && handleAction()}
      >
        <div className='bg-gradient-to-t from-slate-800 via-transparent overflow-hidden absolute min-h-fit min-w-fit'
          style={{
            width: imgWidth,
            height: imgHeight,
          }}
        />
          <div className="flex align-bottom items-end flex-row-reverse min-h-fit">
            {label && <div className="relative text-white text-2xl leading-5 font-medium p-2">{label}</div>}
        </div>
      </div>
    )
  }