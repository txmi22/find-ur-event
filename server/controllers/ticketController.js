module.exports = {
    getTickets: (req, res) => {
        const db = req.app.get("db");
        const {user_id, event_id, name, date, image, venue, city, state} = req.body;

        db.tickets.get_tickets([user_id, event_id, name, date, image, venue, city, state]).then(tickets => {
            res.status(200).send(tickets)
        })
        .catch(err => console.log(err))
    }
}