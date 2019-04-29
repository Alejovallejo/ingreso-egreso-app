import { Action } from '@ngrx/store';
import { IngresoEgreso } from './ingreso-egreso-model';
export const SET_ITEMS = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS = '[Ingreso Egreso] Unset Items';


export class SetItemsActions implements Action{
    readonly type = SET_ITEMS;

    constructor(public item: IngresoEgreso[]){

    }
}

export class UnSetItemsActions implements Action{
    readonly type = UNSET_ITEMS;
}

export type acciones = SetItemsActions | UnSetItemsActions;