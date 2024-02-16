export const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
export const FORM_INPUT_ON_BLUR = 'FORM_INPUT_ON_BLUR';

export const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input] : action.isValid
        }
        let updatedFormIsValid = true;
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            ...state,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    }
    if(action.type === FORM_INPUT_ON_BLUR){
        return {
            ...state,
            touches: {
                ...state.touches,
                [action.input]: true
            }
        }
    }
    return state;
}