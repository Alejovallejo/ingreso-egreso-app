import { Action } from '@ngrx/store';
import { User } from './user.model';
import { acciones } from '../shared/ui.accions';
export const SET_USER = '[Auth] Set USe';
export const UNSET_USER = '[Auth] Set User';



export class SetUSerAction implements Action {
        
    readonly type = SET_USER;

    constructor(public user: User){

    }
}

    
export class UnSetUSerAction implements Action {
    
    readonly type = UNSET_USER;

}



export type acciones = SetUSerAction | UnSetUSerAction;