# Claims Management System  - API
* Claims Management System is a platform used to create, read, update delete, and manage claims. This is the API that communicates only on a data layer.

# Instructions
1. Navigate to your desired folder(it should be blank), or create a new folder for this project (i.e. cmp-api)
2. cd into the folder: `cd cmp-api`
3. Clone the repo into this folder: `git clone https://github.com/carlngan/cmp-api .`
4. `npm install` or `sudo npm install`
5. Make a file called ".env" -- `vim .env`
6. Paste the following content:
```

EXPRESS_SECRET=CARL
NODE_ENV=development
PORT=3001

```
7. `npm start`

8.  You can test locally by making HTTP requests to  "localhost:3001"

# Project in production
http://api.cmp.carlngan.com

# Swagger API documentation
http://api-docs.cmp.carlngan.com