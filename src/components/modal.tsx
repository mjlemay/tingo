import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Cross2Icon } from '@radix-ui/react-icons';
import Block from './block';



interface ModalProps {
    children?: React.ReactNode;
    closeHandler?: Function;
    description?: string | null;
    icon?: React.ReactNode;
    open?: boolean;
    title?: string;
}
  
export default function Modal(props:ModalProps):JSX.Element {
    const {
        children,
        closeHandler = ()=>{},
        description = '',
        icon,
        open = false,
        title} = props;

    const closeBtn = (
        <button
            className="w-[40px] h-[40px] p-0 inline-flex items-center justify-center border-none cursor-pointer outline-none bg-transparent"
            aria-label="Close"
            onClick={() => closeHandler()}
        >
            <Cross2Icon />
        </button>
        );
    
        return (
        <Dialog.Root open={open} >
            <Dialog.Trigger></Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay
                    onClick={() => closeHandler()}
                    className="data-[state=open]:animate-overlayShow fixed inset-0"
                />
                <Dialog.Content 
                    aria-describedby={undefined}
                    className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-neutral-800 p-2 m-2 drop-shadow-lg focus:outline-none text-white"
                >
                    <VisuallyHidden.Root><Dialog.Title /></VisuallyHidden.Root>
                    <Block title={title} menu={closeBtn} icon={icon} noMargin>
                    {description && (<p>{description}</p>)}
                    { children }
                    </Block>
                    <Dialog.Close asChild>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
      </Dialog.Root>
    )
}