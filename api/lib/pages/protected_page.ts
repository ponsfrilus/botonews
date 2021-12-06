import { Request, Response } from 'express';

const protected_page = (req: any, res: Response) => {
  res.end(`
    <p>This is protected page!!!!!</p>
    <p>${req.session.passport.user.provider.username}</p>
    <p>Your username is : ${req.session.passport.user.provider.username}</p>`);
};

export default protected_page;
