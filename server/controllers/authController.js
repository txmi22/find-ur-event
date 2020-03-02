
const bcrypt = require('bcryptjs');
const EMAIL = process.env.EMAIL

const mailOptions = {
    from: EMAIL,
    to: '',
    subject: 'Thanks you for registering',
    text: ''
 }

module.exports = {
    register: async(req, res) => {
        const {email , f_name, l_name, password} = req.body,
              db = req.app.get('db'),
              {session} = req;
              transporter = req.app.get('transporter')


        let user = await db.user.check_user(email);
       
        if(user[0]){
            return res.status(400).send('Email already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.user.register_user([email, f_name, l_name, hash]);

        const customMailOptions = {...mailOptions, to: email, text: `Thank you for registering ${f_name} ${l_name}.`}
                    transporter.sendMail(customMailOptions, (err, data) => {
                       if(err) {
                          console.log(err)
                       } else {
                          console.log('email confirmation sent')
                          console.log(data)
                       }
                    })
                    
        session.user = newUser[0]
        res.status(201).send(session.user);
    },
    login: async(req, res) => {
        const {email, password} = req.body
            console.log(email, password)
              db = req.app.get('db'),
              {session} = req;

        let user = await db.user.check_user(email);

        if(!user[0]){
            return res.status(400).send('User not found')
        }
       
        const authorized = bcrypt.compareSync(password, user[0].password);
        if(!authorized){
            return res.status(401).send('Incorrect password')
        }
        delete user[0].password;
        session.user = user[0];
        res.status(202).send(session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}