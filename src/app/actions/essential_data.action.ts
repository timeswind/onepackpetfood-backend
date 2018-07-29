// Section 1
import { Action } from '@ngrx/store'
// import { essentialData } from './../models/essential_data.model'

// Section 2
export enum EssentialDataActionTypes {
    SET_ROOT_CATEGORIES = '[ESSENTIAL DATA] SET_ROOT_CATEGORIES',
    SET_CHILD_CATEGORIES_COLLECTION = '[ESSENTIAL DATA] SET_CHILD_CATEGORIES_COLLECTION',
}

// Section 3
export class SetRootCategories implements Action {
    readonly type = EssentialDataActionTypes.SET_ROOT_CATEGORIES

    constructor(public payload: { rootCategories: any[] }) { }
}

export class SetChildCategoriesCollection implements Action {
    readonly type = EssentialDataActionTypes.SET_CHILD_CATEGORIES_COLLECTION

    constructor(public payload: { childCategoriesCollection: any[] }) { }
}

// Section 4
export type Actions = SetRootCategories | SetChildCategoriesCollection