export type BookProps = {
    id: string,
    title: string,
    year: string,
    author: string,
    img: string,
    type: string,
    description: string
}

export interface ShowModalProps {
    show: boolean;
    onHide: () => void;
}

export interface BookModalProps extends BookProps {
    onHide: () => void;
}

export interface BooksContextProps {
books: BookProps[];
setBooks: React.Dispatch<React.SetStateAction<BookProps[]>>;
}
