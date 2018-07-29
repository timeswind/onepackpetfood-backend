import { Action, createSelector } from '@ngrx/store'
import * as EssentialDataActions from '../actions/essential_data.action';
import { selectEssentialData } from '../app.state';
import { essentialData } from '../models/essential_data.model';
// Section 1
const initialState: essentialData = {
    rootCategories: [],
    childCategoriesCollection: []
}

// Section 2
export function reducer(state: essentialData = initialState, action: EssentialDataActions.Actions) {

    // Section 3
    switch (action.type) {
        case EssentialDataActions.EssentialDataActionTypes.SET_ROOT_CATEGORIES:
            return Object.assign({}, state, { rootCategories: action.payload.rootCategories })
        case EssentialDataActions.EssentialDataActionTypes.SET_CHILD_CATEGORIES_COLLECTION:
            return Object.assign({}, state, { childCategoriesCollection: action.payload.childCategoriesCollection })
        default:
            return state;
    }
}

export const selectEssentialDataRootCategories = createSelector(
    selectEssentialData,
    (essential_data: essentialData) => essential_data.rootCategories
);

export const selectEssentialDataChildCategoriesCollection = createSelector(
    selectEssentialData,
    (essential_data: essentialData) => essential_data.childCategoriesCollection
);
