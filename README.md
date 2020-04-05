# MySQL web shell (REPL)

A (very) simple online DBMS interface. 
Supports running queries and uploading files (to be used with `LOAD DATA`). 
It requires a thin server API for actually running the queries.

### Debugging (assumes vue-cli)
```
npm install
npm run serve
```

### Building (frontend files in /dist, example backend in /server)
```
npm install
npm run build
```

### Setting up
It is not completely trivial to set this up since it was made for a very specific purpose (as an educational tool at my university). If you're interested in using this, please contact me. Basically, `.env` has to be filled with the correct information, in particular `VUE_APP_BASE_URL`, `VUE_APP_API_URL` and `VUE_APP_FILES_URL` should point to the correct locations. Furthermore, you would need to set up an API with two endpoints: one which I refer to simply as API, and FILES. Both are CRUD JSON API's, both only support POST requests, and both require CORS by default. 

API accepts an object `{ query, db }` where `query` is an arbitrary MySQL command, and `db` is either `"public"` or `"private"`. The default setup offers users two databases, referred to by these two strings. This endpoint returns a single object of form `{ status, rows: [ [ { key, value }, ... ], ... ] }` where both `key`'s and `values`'s are strings and each pair corresponds to a single cell.

FILES accepts an object of form `{ fs: [ { filename, content }, ... ] }`, where both `filename`'s and `content`'s are strings. It returns a single object `{ status, rows }` where `rows` is an array of strings listing the filenames of files available to the current user. 

Error reporting is done through the `status` field which is either `"ok"` or `"error"`. In the latter case, there is also an `error_msg` field with values `"mm_auth"` in case of authentication issues, or a MySQL error message, or `"other"`.
