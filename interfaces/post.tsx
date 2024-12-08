export interface IPost {
    id: string,
    createdAt: string | Date,
    updatedAt: string | Date,
    published: boolean,
    title: string,
    content: string,
    authorId: string
}
export interface IAddPost {
    title: string,
    content: string
}

export interface IModal {
    editProduct?: IPost;
}

export interface IPostState {
    postsState: IPost[];
    loading:boolean;
    showModal: boolean;
}
