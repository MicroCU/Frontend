"use client"
import Dagre from "@/components/Dagre";
import Item from "@/components/Item";
import { useScreenContext } from "@/components/Playground/context/ScreenContext";
import { ReactFlowProvider } from 'reactflow'

export default function Explore() {
    const { screenWidth, screenHeight } = useScreenContext();

    return (
        <Item>
            <div style={{ width: '100vw', height: '5vh', backgroundColor: 'blue' }}>
                <h1 style={{ textAlign: 'center', backgroundColor: 'pink' }}> 1 </h1>
            </div>
            <div style={{ width: '100vw', height: '95vh' }}>
                {screenWidth !== null && screenHeight != null &&
                    <ReactFlowProvider>
                        <Dagre screenWidth={screenWidth} screenHeight={screenHeight} />
                    </ReactFlowProvider>
                }
                {(screenWidth === null || screenHeight == null) && <p>Loading...</p>}
            </div>
        </Item>
    )
}