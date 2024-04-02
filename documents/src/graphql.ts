
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Document {
    id: string;
    name: string;
    type: string;
}

export abstract class IQuery {
    abstract documents(): Document[] | Promise<Document[]>;
}

type Nullable<T> = T | null;
