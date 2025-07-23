export type User = {
  id: string;
  username?: string;
  name: string;
  email: string;
  image?: string;
  emailVerified: boolean;
  createdAt: Date;
  role: string;
  bio?: string;
};

export type Note = {
  id: string;
  body: string;
  authorId: string;
  author: User;
  likes?: [string | User];
  parent?: Note | null;
  isReply?: boolean;
  replies?: [Note];
  views?: number;
  createdAt?: string;
  media?: [Media];
  likedByCurrentUser?: boolean;
  likeCount: number;
  replyCount: number;
};

type Media = {
  id: string;
  url: string;
  alt?: string;
  type: string;
  userId: string | User;
};

export type APIResponse = {
  message?: string;
  error?: string;
  success: boolean;
};

export type NewNotePayload = {
  body: string;
  authorId: string;
  parentId?: string;
  mediaUrls?: string[];
  media?: {
    url: string;
    type: "image" | "video";
  }[];
};
