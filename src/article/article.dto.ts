export class ArticlePostInDTO {
    content: string;
    title: string;
    likes: number;
    dislikes: number;
    author_id: string;
}

export class ArticlePostOutDTO {
    content: string;
}

export class ArticlePutInDTO {
  content: string;
}

export class ArticlePutOutDTO {
    content: string;
}
