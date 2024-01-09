import Image from 'next/image'

export interface ITagProps {
    title: string
    imageURL: string
    className?: string
}
export default function Tag({ title, imageURL, className }: ITagProps) {
    return (
        <div className={`flex flex-row bg-graySmall gap-2 text-grayMain items-center rounded-2xl px-3 py-1 w-fit ${className}`}>
            <Image
                src={imageURL}
                width={16}
                height={16}
                alt="Category Image"
            />
            <p className="Medium12"> {title} </p>
        </div>
    )

}