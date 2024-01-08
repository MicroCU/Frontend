import { ArrowRight } from 'lucide-react';
export default function Next( {className}: {className?: string} ) {
    return (
        <div className={`w-6 h-6 ${className}`}>
            <ArrowRight />
        </div>
    )
}