import { NextFunction, Request, Response } from 'express';
import { getUserByEmail, updateUser } from './DB';
const user_edit = async (req: Request, res: Response, next: NextFunction) => {
  switch (req.method) {
    case 'POST':
      var error =
        '{\
            "status_code": 400,\
            "error": "Please specify a username and email."\
        }';
      if (!req.body || !req.body.username || !req.body.email) {
        return res.status(400) && res.send(JSON.parse(error));
      }
      let user:any = await getUserByEmail(req.body.email)
      if(!user.length) {
        var noUser = `{"status_code" : 404, "message": "There is no user with email ${req.body.email}."}`
        return res.status(404) && res.send(JSON.parse(noUser))
      }
      var insertedUser:any = await updateUser(req.body.username, user[0].email, user[0].user);
      var success = `{"status_code" : 201, "message": "User ${req.body.username} has been edited.", "affected_rows" : ${insertedUser.affectedRows}}`;
      res.status(201) && res.send(JSON.parse(success));
    break;
  }
};

export default user_edit;