import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import { addReserveSuccess, updateAmountSuccess } from './actions';
import api from '../../../services/api';
import history from '../../../services/history';

function* adddToReserve({ id }){

    const tripExist = yield select(
        state => state.reserve.find(trip=> trip.id === id)
    );

    const myStock = yield call(api.get, `stock/${id}`);
    const stockAmount = myStock.data.amount;

    const courrentStock = tripExist ?  tripExist.amount : 0;
    const amount  = courrentStock + 1;
    
    if(amount > stockAmount) {
        alert('Quantidade máxima atingida');
        return;
    }

    if(tripExist){

        yield put(updateAmountSuccess(id, amount));

    } else {
        const response = yield call(api.get, `trips/${id}`);
        
        const data = {
            ...response.data,
            amount: 1,
        }
        yield put(addReserveSuccess(data));

        history.push('/reservas');
    }

}

function* updateAmount({id, amount}){
    if(amount <= 0) return;

    const myStock = yield call(api.get, `stock/${id}`);

    const stockAmount = myStock.data.amount;

    if (amount > stockAmount) {
        alert('Quantidade máxima atingida');
    }

    yield put(updateAmountSuccess(id, amount));
}

export default all([
    takeLatest('ADD_RESERVE_REQUEST',adddToReserve ),
    takeLatest('UPDATE_RESERVE_REQUEST',updateAmount )

])