export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems : number;
    totalPages : number;  
}
export class PaginatedReslt<T>{
    items?:T;
    pagination?: Pagination
}