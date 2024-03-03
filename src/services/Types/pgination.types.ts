export interface IPaginationRequest {
    PageIndex: number;
    PageSize: number;
    Sort: ISortRequest;
  }
  
  export interface ISortRequest {
    SortBy: string;
    SortDirection: string;
  }
  