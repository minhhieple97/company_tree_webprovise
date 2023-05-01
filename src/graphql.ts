
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Company {
    id: string;
    createdAt: string;
    name: string;
    parentId: string;
    children?: Nullable<Nullable<Company>[]>;
}

export abstract class IQuery {
    abstract getCompany(): Company | Promise<Company>;
}

type Nullable<T> = T | null;
