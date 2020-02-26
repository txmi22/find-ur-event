const stripe = require('stripe')(process.env.REACT_APP_SECRET_STRIPE_KEY)

module.exports = {
    pay: (req, res) => {
        const db = req.app.get('db')
        const { token: {id}, amount, user_id, event_id, name, date, image, venue, city, state  } = req.body 
        stripe.charges.create({
            amount: amount, 
            currency: 'USD',
            source: id,
            description: 'Event ticket is paid '
        },
        async (err) => {
            if (err) {
    
                return res.status(500).send(err)
            } else {
                db.tickets.add_ticket([])
    
                db.tickets.add_ticket([user_id, event_id, name, date, image, venue, city, state])
                .then(() => {
                    res.sendStatus(200)
                })
                .catch(err => console.log(err))
            }
        })
    }
}