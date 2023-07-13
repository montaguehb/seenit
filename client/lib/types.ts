export type CommentType = {
    id: number;
    body: string;
    child_comment?: Array<CommentType>;
    created_at: string;
    dislikes: number;
  }