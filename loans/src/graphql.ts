
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface FeeBase {
    id: string;
    type: string;
}

export class Loan {
    id: string;
    name: string;
    date: string;
    fee: FeeBase[];
    documents: Document[];
}

export class Fee implements FeeBase {
    id: string;
    type: string;
    value: number;
}

export class Fees implements FeeBase {
    id: string;
    type: string;
    value: number[];
}

export abstract class IQuery {
    abstract loans(): Loan[] | Promise<Loan[]>;
}

export class Document {
    id: string;
}

type Nullable<T> = T | null;
