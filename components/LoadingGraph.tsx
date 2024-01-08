export default function LoadingGraph() {
    return (
        <div className="flex flex-col justify-center items-center">
            <svg width="355" height="307">
                <circle cx="70" cy="70" r="30" className="fill-graySmall" />
                <circle cx="270" cy="30" r="30" className="fill-graySmall" />
                <circle cx="180" cy="170" r="30" className="fill-graySmall" />
                <circle cx="30" cy="230" r="30" className="fill-graySmall" />
                <circle cx="320" cy="270" r="30" className="fill-graySmall" />

                <line x1="70" y1="70" x2="180" y2="170" className="stroke-graySmall" strokeWidth="2" />
                <line x1="270" y1="30" x2="180" y2="170" className="stroke-graySmall" strokeWidth="2" />
                <line x1="30" y1="230" x2="180" y2="170" className="stroke-graySmall" strokeWidth="2" />
                <line x1="320" y1="270" x2="180" y2="170" className="stroke-graySmall" strokeWidth="2" />
            </svg>
            <p className="Bold24 text-grayMedium"> Loading Graph </p>
        </div>
    );
}