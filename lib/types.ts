export type CommentType = {
  id: number;
  body: string;
  parent_comment_id: number;
  post_id: number;
  child_comment?: Array<CommentType>;
  created_at: string;
  dislikes: number;
};

export type CommunityType = {
  id: number;
  name: string;
  subscribers?: number;
};

export interface PostProps {
  id: number;
  likes: number;
  dislikes: number;
  title: string;
  community: CommunityType;
}

export type UserContextType = {
  user: any | null;
  updateUser: any;
}

export interface AuthInterface {
  username: string;
  email?: string | null;
  password: string;
}

export interface PostInterface {
  title: string;
  body: string;
}