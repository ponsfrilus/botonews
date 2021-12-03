import { Request, Response } from 'express';

const protected_page = (req: any, res: Response) => {
  console.log(req.session.passport.user.google.displayName);
  res.end(`
    <p>This is protected page!!!!!</p>
    <p>${req.session.passport.user.google.displayName}</p>
    <p>Your username is : ${req.session.passport.user.google.username}</p>`);
};

export default protected_page;
