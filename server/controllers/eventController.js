module.exports = {
    addEvent: ( req, res) => {
        const db = req.app.get("db");
        const {event_id, id, name, date, image} = req.body;

        db.bookmark.add_event([event_id, id, name, date, image]).then(bookmarks => {
            console.log('line 7 ', bookmarks)
            res.status(200).send(bookmarks)
        })
        .catch(err => console.log(err))
    },
    deleteEvent: (req, res) => {
        const db = req.app.get("db");
        const {event_id} = req.params;
        db.bookmark.delete_event(event_id).then(() => res.sendStatus(200))
        .catch(err => console.log(err))

    },
    getBookmarks: (req, res) => {
        const db = req.app.get("db");
        const {event_id, id, name, date, image} = req.body;

        db.bookmark.get_bookmarks([event_id, id, name, date, image]).then(bookmarks => {
            res.status(200).send(bookmarks)
        })
        .catch(err => console.log(err))
    }
}