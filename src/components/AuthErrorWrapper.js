import { useIonAlert } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_SUCCESS, REMOVE_AUTH_ERROR } from '../actions/types';

const AuthErrorWrapper = () => {
    let showAuthError = useSelector(({ auth }) => auth.showAuthError);
    const dispatch = useDispatch();

    const [present] = useIonAlert()

    if (showAuthError == "true") {
        present('Your login session appears to be expired.', [
            {
                text: 'Ignore', handler: () => {
                    dispatch({
                        type: REMOVE_AUTH_ERROR
                    });
                }
            },
            {
                text: 'Logout', handler: () => {
                    dispatch({
                        type: LOGOUT_SUCCESS
                    });
                }
            }
        ])
    }
    return <></>;
};
export default AuthErrorWrapper;
