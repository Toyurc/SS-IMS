import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import staffReducer from './staffReducer';
import studentReducer from './studentReducer';

export default combineReducers({
    admin: adminReducer,
    staff: staffReducer,
    student: studentReducer
});
