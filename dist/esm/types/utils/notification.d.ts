import React from 'react';
export declare const notify: {
    error(message: React.ReactNode | string): void;
    success({ message, title, }: {
        message: React.ReactNode | string;
        title?: React.ReactNode;
    }): void;
};
