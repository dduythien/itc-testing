declare namespace COMMON {
  interface ApiResponse<P> {
    results: P;
    count: number;
  }

  interface PagingParams {
    limit: number;
    offset: number;
  }

  interface PaginagtionParams<P> {
    data: P;
    currentPage: number;
    pageSize?: number;
  }
  interface PaginagtionInfo {
    totalCount: number;
    totalPages: number;
    pageSize: number;
  }
}
