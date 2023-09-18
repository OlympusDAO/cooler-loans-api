import { Query, Request } from "express-serve-static-core";

export interface TypedRequest<T extends Query> extends Request {
  query: T;
}
