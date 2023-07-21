# Seenit
Seenit is an open-source social media website built using Flask, a Python web framework, and Next.js, a React framework for building user interfaces. The project aims to provide a platform for users to connect, share posts, and interact with each other in a friendly and secure environment.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- User Registration and Authentication: Users can sign up and log in securely to access the platform's features. User's can also edit their email or delete their account

- Users can create text posts, comments replying to posts, and new communities

- Users are able to save, like, and dislike posts

## Cloning the Project
```bash
# Cloning the repo locally
$ git clone git@github.com:montaguehb/seenit.git

# Installing frontend dependencies
$ npm i

# Creating the python virtual environment and installing dependencies
$ pipenv install && pipenv shell

# Generating the secret key
$ python -c 'import secrets; print(secrets.token_hex())'
# Creating the dotenv file
$ touch .env
$ echo "FLASK_APP=index.py" >> .env
$ echo "SECRET_KEY=<your-secret-key>" >> .env

# If you're using an external postgres database
$ echo "POSTGRES_URL=<your-postgres-url>" >> .env

# Creating the database
$ cd api
$ flask db init
$ flask db migrate
$ flask db upgrade

# Starting the backend flask server
$ flask run

# Starting the frontend next server
$ cd ..
$ npm run dev

```

If you would like to use an external debugger pass the following arguments to app.run() at the bottom of the index.py file use_debugger=False, use_reloader=False

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Packages Used

- Node Modules
    - MUI
        - @emotion/react
        - @emotion/styled
        - @mui/icons-material
        - @mui/material
    - next
        - @types/node
        - @types/react
        - @types/react-dom
        - react
        - react-dom
    - eslint
    - formik
    - swr
    - typescript
    - yup


- Python Packages
    - faker
    - flask
        - flask-migrate
        - flask-sqlalchemy
        - flask-cors
        - flask-restful
        - flask-bcrpyt
        - flask-marshmallow
        - flask jwt-extended
    - sqlalchemy
    - marshmallow-sqlalchemy  
    - sqlalchemy-serializer
    - importlib
        - importlib-metadata
        - importlib-resources
    - python-dotenv
    - psycopg2-binary

## Contributing

Contributions are more than welcome. Please follow the below 

- Fork the repo on GitHub
- Clone the project to your own machine
- Commit changes to your own branch
- Push your work back up to your fork
- Submit a Pull request so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!
## License

MIT License

Copyright (c) 2023 Historia Montague, Ren Blake, Ryan Salvato

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CO
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

Learn more about MUI:

- [Material UI](https://mui.com/material-ui/getting-started/) - learn more about MUI and Material Design

To learn more about Flask and sqlalchemy, take a look at the following resources:

- [Flask documentation](https://flask.palletsprojects.com/en/2.3.x/) - learn more about Flask
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/en/20/) - learn more about the SQLAlchemy ORM

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
