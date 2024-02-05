import { PathData } from "@/types/type";

const mockGroupDB: PathData = {
    id: "path-1",
    name: "Introduction Python 101",
    description: `Python is an easy to learn, powerful programming language. It has
    efficient high-level data structures and a simple but effective
    approach to object-oriented programming. Python’s elegant syntax and
    dynamic typing, together with its interpreted nature, make it an ideal
    language for scripting and rapid application development in many areas
    on most platforms.`,
    tags: [
        {
            id: "tag-1",
            name: "Programming",
            icon:
                "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110499_1550453917.png"
        },
        {
            id: "tag-2",
            name: "Software Architecture",
            icon:
                "https://www.mycourseville.com/sites/all/modules/courseville/files/thumbs/2110521.svg"
        }
    ],
    groups: []
}