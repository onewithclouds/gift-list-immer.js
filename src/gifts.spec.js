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


describe("Reserving an unreserved gift", () => {
    const nextState = addGift(initialState, "mug", "Coffee mug", "")

    test("added a gift to the collection", () => {
	expect(nextState.gifts.length).toBe(3)
    })

    test("didn't modify the original state", () => {
	expect(initialState.gifts.length).toBe(2)
    })
})
    
