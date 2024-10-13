import { useCallback } from 'react';
import { 
  ReactFlow,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/base.css';


import FGNode from './flowGraphNode';

interface FlowGraphProps {
  height?: string;
  width?: string;
}

const snapGrid:[number, number] = [20, 20];
const nodeTypes = {
  custom: FGNode,
};

const initialNodes = [
  { id: '1', type: 'custom', data: { label: 'Node 1', format: 'input' }, style: {color: 'black'}, position: { x: 100, y: 100 } },
  { id: '2', type: 'custom', data: { label: 'Node 2', format: 'action' }, style: {color: 'black'}, position: { x: 400, y: 100 } },
  { id: '3', type: 'custom', data: { label: 'Node 3', format: 'output' }, style: {color: 'black'}, position: { x: 700, y: 100 } },
  ];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' }
];
  
export default function FlowGraph(props:FlowGraphProps):JSX.Element {
  const { height = "100%", width = "100%" } = props;
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    //todo  write out this as a proper type --- edgeParams: EdgeType | Connection, edges: EdgeType[]
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
  <div style={{width, height, display:'block'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        snapToGrid={true}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        snapGrid={snapGrid}
        attributionPosition="top-right"
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}