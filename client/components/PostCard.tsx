import { debug } from "console"
import { ComponentProps } from "react"

const PostCard = ({post}: ComponentProps<any>) => {
  return (
    <div>
        <ol>
            <li>{post.likes}</li>
            <li>{post.dislikes}</li>
            <li>{post.title}</li>
            <li>{post.community.name}</li>
        </ol>
        <br/>
    </div>
  )
}

export default PostCard