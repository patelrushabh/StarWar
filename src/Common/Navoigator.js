import * as React from 'react';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params = {}) {
    navigationRef.current?.navigate(name, params);
}

function goBack() {
    navigationRef.current?.dispatch(CommonActions.goBack());
}

export default {
    navigate,
    goBack,
    navigationRef
}