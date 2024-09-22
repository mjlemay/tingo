import React from 'react';
import { 
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/base.css';


// import FGNode from './flowGraphNode';

interface FlowGraphProps {
  height?: string;
  width?: string;
}

const snapGrid:[number, number] = [20, 20];
// const nodeTypes = {
//   selectorNode: FGNode,
// };

// const initialNodes = [
//   { id: '1', data: { label: 'Node 1' }, style: {color: 'black'}, position: { x: 100, y: 100 } },
//   { id: '2', data: { label: 'Node 2' }, style: {color: 'black'}, position: { x: 400, y: 100 } },
//   ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
  
export default function FlowGraph(props:FlowGraphProps):JSX.Element {
  const { height = "100%", width = "100%" } = props;
  // const reactFlowInstance = useReactFlow();
  const [nodes, ] = useNodesState([]);
  const [edges, ] = useEdgesState([]);

  return (
  <div style={{width, height, display:'block'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        snapToGrid={true}
        snapGrid={snapGrid}
        attributionPosition="top-right"
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}