export function addGift(state, id, description, image) {
    return {
	...state,
	gifts: [
	    ...state.gifts,
	    {
		id,
		description,
		image,
		reservedBy: undefined
	    }
	]
    }
}

export function toggleReservation(state, giftId) {
    return state
}
