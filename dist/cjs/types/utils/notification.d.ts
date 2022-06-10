export declare const notify: {
    error(message: string): void;
    success({ message, title }: {
        message: string;
        title?: string | undefined;
    }): void;
};
