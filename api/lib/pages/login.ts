import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });

const login = (req:any, res:any, next:any) => {
  req.user ? res.redirect('/profile') : res.end(`
  <html>
    <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </head>
    <body>

    <section class="vh-100 bg-dark">
      <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img src="images/secure_login.svg" class="img-fluid" alt="Phone image">
          </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">

          <a class="btn btn-light btn-lg btn-block" href="/auth/google" role="button" height="200px" style="text-transform:none">
            <img width="25px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
            Login with Google
          </a>
          <a class="btn btn-dark btn-lg btn-block" href="/auth/github" role="button" height="200px" style="text-transform:none; background-color: #2d2e2e;">
            <img width="25px" style="margin-bottom:3px; margin-right:5px" alt="Github sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/512px-Octicons-mark-github.svg.png" />
            Login with Github
          </a>

        </div>
      </div>
    </section>

    </body>
  </html>`);
};

export default login;
