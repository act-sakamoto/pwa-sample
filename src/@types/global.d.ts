declare type Todo = {
    value: string;
    id: number;
    checked: boolean;
    removed: boolean;
};
declare type Filter = 'all' | 'checked' | 'unchecked' | 'removed';