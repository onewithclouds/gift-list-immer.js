// import { addGift, toggleReservation } from './gifts'; 
import produce from "immer"

const initialState = {

    users: [
	{
	    id: 1,
	    name: "Test user"
	},
	
	{
	    id: 2,
	    name: "Someone else"
	}

    ],

    currentUser: {
	id: 1,
	name: "Test user"
    },

    gifts: [
	{
	    id: "immer_license",
	    description: "Immer license",
	    image: "https://raw.githubusercontent.com/immerjs/immer/master/images/immer-logo.png",
	    reservedBy: 2
	},
	{
	    id: "egghead_subscription",
	    description: "Egghead.io subscription",
	    image: "https://pbs.twimg.com/profile_images/735242324293210112/H8YfgQHP_400x400.jpg",
	    reservedBy: undefined
	}
    ]
}

function addGift(state, id, description, image) {
    return produce(state, draft => {
	draft.gifts.push({
	    id,
	    description,
	    image,
	    reservedBy: undefined
	})
    })
}


function toggleReservation(state, giftId) {
    return produce(state, draft => {
	const gift = draft.gifts.find(gift => gift.id == giftId)
	gift.reservedBy =
	    gift.reservedBy === undefined
	    ?
	    state.currentUser.id
	    :
	    gift.reservedBy === state.currentUser.id
	    ?
	    undefined
	    :
	    gift.reservedBy
    })
}


//const addGift = require('./gifts')
//const toggleReservation = require('./gifts')

/*

function addGift(state, id, description, image) {
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

		

function toggleReservation(state, giftId) {
    return {
	...state,
	gifts: state.gifts.map( gift => {
	    if (gift.id !== giftId) return gift
	    return {
		...gift,
		reservedBy:
		  gift.reservedBy === undefined ? state.currentUser.id
		    : gift.reservedBy === state.currentUser.id ? undefined
		    : gift.reservedBy 
	    }
	    
	}
			      )
    }
}

*/

describe("Reserving an unreserved gift", () => {
    const nextState = addGift(initialState, "mug", "Coffee mug", "");

    test("added a gift to the collection", () => {
	expect(nextState.gifts.length).toBe(3)
    })

    test("didn't modify the original state", () => {
	expect(initialState.gifts.length).toBe(2)
    })  
})


describe("Reserving an unreserved gift", () => {
    const nextState = toggleReservation(initialState, "egghead_subscription")

    test("correctly stores reservedBy", () => {
	expect(nextState.gifts[1].reservedBy).toBe(1)
    })
    
    test("didn't modify the original state", () => {
	expect(initialState.gifts[1].reservedBy).toBe(undefined)
    })
})

describe("Reserving an already reserved gift", () => {
    const nextState = toggleReservation(initialState, "immer_license")
    
    test("preserved stored reservedBy", () => {
	expect(nextState.gifts[0].reservedBy).toBe(2)
    })
})
