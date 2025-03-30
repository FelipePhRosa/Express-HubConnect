
import { RouteGenericInterface } from 'fastify';

export interface StoreProductParams extends RouteGenericInterface {
  Params: {
    storeId: string;
  };
  Body: any;
}