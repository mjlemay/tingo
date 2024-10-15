import React from 'react';
import * as ScrollArea from "@radix-ui/react-scroll-area";

interface BlankProps {
    height?: number;
    width?: number;
    children?: React.ReactNode;
}
  
export default function ScrollBox(props:BlankProps):JSX.Element {
  const { children, height, width } = props;

  return (
    <ScrollArea.Root style={{height, width}} className={` overflow-hidden`}>
		<ScrollArea.Viewport className="size-full">
			<div>
				{children}
			</div>
		</ScrollArea.Viewport>
		<ScrollArea.Scrollbar
			className="flex touch-none select-none  p-0.5 transition-colors duration-[80ms] ease-out hover:cursor-pointer data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
			orientation="vertical"
		>
			<ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-zinc-500 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
		</ScrollArea.Scrollbar>
		<ScrollArea.Scrollbar
			className="flex touch-none select-none p-0.5 transition-colors duration-[160ms] ease-out  hover:cursor-pointer data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
			orientation="horizontal"
		>
			<ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-zinc-500 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-[44px] before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2" />
		</ScrollArea.Scrollbar>
		<ScrollArea.Corner />
	</ScrollArea.Root>
  )
}