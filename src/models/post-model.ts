export interface Post{
    id:number,
    title:string,
    content:string,
}

export const posts:Post[]=[
    {id:1, title:"Post pertama", content:"Content 1"},
    {id:2, title:"Post kedua", content:"Content 2"},
    {id:3, title:"Post ketiga", content:"Content 3"}
]