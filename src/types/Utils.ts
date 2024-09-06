export type Styled<T> = {
    [K in keyof T as `$${K & string}`]?: T[K]
};

export type Nullable<T> = T | null;
