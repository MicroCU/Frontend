import "./NavToolTip.css";
export interface NavToolTipProps {
    mainText: string
    subText: string
}
export default function NavToolTip({ mainText, subText }: NavToolTipProps) {
    return (
        <div className="text-center">
            <div className="tooltip">
                { mainText }
                <div className="tooltiptext"> 
                    <p className="bg-grayMain text-grayLight"> {subText} </p> 
                </div>
            </div>
        </div>
    )
}