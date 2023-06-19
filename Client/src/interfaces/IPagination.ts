export interface IPagination {
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextLink: number | null;
    nextPage: number | null;
    page: number;
    prevLink: number | null;
    prevPage: number | null;
    status: string;
    totalPages: number;
}
