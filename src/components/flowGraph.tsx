import { useCallback, useEffect, useState } from 'react';
import { 
  ReactFlow,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/base.css';


import FGNode from './flowGraphNode';
import EventEmitter from 'events';

interface FlowGraphProps {
  height?: string;
  width?: string;
  latestCommand?: string;
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
  const { height = "100%", width = "100%", latestCommand = '' } = props;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeIDCount, setNodeIDCount] = useState(initialNodes.length + 1)
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    //todo  write out this as a proper type --- edgeParams: EdgeType | Connection, edges: EdgeType[]
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
  const createNode = useCallback(
    (formatValue:string) => {
      const newNodeCount = nodeIDCount + 1;
      setNodeIDCount(newNodeCount);
      const position = screenToFlowPosition({
        x: 500,
        y: 300,
      });
      const newNode = {
        id: `Node_${nodeIDCount}`,
        type: 'custom',
        position,
        style: { color: 'black'},
        data: { label: `Node ${nodeIDCount}`, format: formatValue },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodeIDCount],
  );

  useEffect(()=> {
    if (latestCommand !== '') {
      const nodeFormat = latestCommand.split('_')[0];
      createNode(nodeFormat);
    }
  }, [latestCommand]);

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