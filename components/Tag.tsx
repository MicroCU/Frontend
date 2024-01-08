import Image from 'next/image'

export interface ITagProps {
    title: string
    imageURL: string
    className?: string
}
export default function Tag({ title, imageURL, className }: ITagProps) {
    return (
        <div className={`${className} flex flex-row bg-graySmall gap-2 text-grayMain items-center rounded-2xl px-3 py-1 w-fit h-fit`}>
            <Image
                src={imageURL}
                width={16}
                height={16}
                alt="Category Image"
            />
            <p className="text-Medium12"> {title} </p>
        </div>
    )

}