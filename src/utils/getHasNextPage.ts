export const getHasNextPage = (currentPage: number, totalResults: number ) => {
    return 20 * currentPage < totalResults;
}