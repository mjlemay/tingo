import { useCallback, useEffect, useState } from 'react';
import { 
  ReactFlow,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/base.css';
import FGNode from './flowGraphNode';

interface FlowGraphProps {
  height?: string;
  width?: string;
  initialNodes?: Node[];
  initialEdges?: Edge[];
  latestCommand?: string;
}

const snapGrid:[number, number] = [20, 20];
const nodeTypes = {
  connection: FGNode,
};


export default function FlowGraph(props:FlowGraphProps):JSX.Element {
  const { height = "100%", width = "100%", latestCommand = '', initialNodes = [], initialEdges =[] } = props;
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeIDCount, setNodeIDCount] = useState(initialNodes.length + 1);
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
        "y": 300,
      });
      const newNode = {
        id: `Node_${nodeIDCount}`,
        "type": "connection",
        position,
        data: { label: `Node ${nodeIDCount}`, format: formatValue },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodeIDCount],
  );

  useEffect(()=> {
    const nodeFormat = latestCommand.split('_')[0];
    if (latestCommand !== '') {
      createNode(nodeFormat);
    }
    if (nodeFormat === 'setFlow') {
      setEdges(initialEdges);
      setNodes(initialNodes);
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