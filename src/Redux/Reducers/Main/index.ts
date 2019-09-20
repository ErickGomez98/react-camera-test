
import { IAllState } from '../../../Util/Types/Types-Interfaces';

type TMainActions =
    'MainAction' |
    'Action';


export interface IMainAction {
    type: TMainActions,
    payload: Partial<IAllState['Main']>,
    _reponse?: any
}

export const initialMainState: IAllState['Main'] = { main: 'main' };

export const MainReducer = (state = initialMainState, action: IMainAction) => {
    const { type, payload, _reponse = {} } = action;
    switch (type) {
        case 'MainAction':
        case 'Action':
        default:
            return state;
    }
}