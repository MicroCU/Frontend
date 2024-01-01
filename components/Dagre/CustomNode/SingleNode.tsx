import { Handle, Position } from 'reactflow';
import { defaultSettings, groupSettings } from '../setting';

export default function SingleNode({ id, data, isConnectable }: { id: string, data: { label: string }, isConnectable: boolean }) {
    return (
            <div style={{ width: groupSettings.width, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
                <div style={{ backgroundColor: '#85ffdc', width: `${defaultSettings.singleWidth}px`, height: `${defaultSettings.singleHeight}px`, marginBottom: '' }} key={id}> {data.label} </div>
                <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
            </div>
    );
}