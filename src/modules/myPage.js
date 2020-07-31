const initailState = {
    bidList : [],
    roomList : [],
}

const myPage_reducer = (state = initailState, action) => {
    switch(action.type){
        case 'SET_BIDLIST':
            return {
                bidList : action.payload.data,
            }
        case 'SET_ROOMLIST':
            return{
                roomList : action.payload.data,
            }
        default:
            return state;
    }
}


export default myPage_reducer;