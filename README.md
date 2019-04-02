## Mongoose-crud

#### List of basic routes:

| Route          | HTTP | Header(s) | Body                                | Description                                                  |
| -------------- | ---- | --------- | ----------------------------------- | ------------------------------------------------------------ |
| /registerAdmin | POST | none      | email: String<br />password: String | Create a user (role auto admin)<br />success:<br />(201), example: {"_id": String, "email": String, "password": String, "role": String}<br />errors:<br />(500), error |
| /register      | POST | none      | email: String<br />password: String | Create a user (role auto user)<br />success:<br />(201), example: {"_id": String, "email": String, "password": String, "role": String}<br />errors:<br />(500), error |
| /login         | POST | none      | email: String<br />password: String | Login and get token based on credentials<br />success:<br />(200), example: {"_id": String, "email": String, "password": String, "role": String, "token": String}<br />errors:<br />(400), {message: 'Invalid email/password'}<br />(500), error |



#### List of member routes:

| Route        | HTTP   | Header(s)                                                    | Body                                                  | Description                                                  |
| ------------ | :----- | :----------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| /members     | GET    | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | none                                                  | Get all members info (Admin only)<br />success:<br />(200), example: [{"_id": String, "email": String, "password": String, "role": String}, {"_id": String, "email": String, "password": String, "role": String}, etc]<br />errors:<br />(500), error |
| /members/:id | GET    | Authenticated:<br />(token)                                  | none                                                  | Get a single member info (Admin and authenticated member)<br />success:<br />(200), example: {"_id": String, "email": String, "password": String, "role": String}<br />errors:<br />(404), example: {message: 'Member not found'}<br />(500), error |
| /members     | POST   | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | email: String<br />password: String<br />role: String | Create a member (admin only)<br />success:<br />(201), example: {"_id": String, "email": String, "password": String, "role": String}<br />errors:<br />(500), error |
| /members/:id | PUT    | Authenticated:<br />(token)                                  | email: String                                         | Update a member with new info (admin and authenticated member)<br />success:<br />(200), example: {message: 'Updated'}<br />errors:<br />(404), example: {message: 'Member not found'}<br />(500), error |
| /members/:id | DELETE | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | none                                                  | Delete a member (admin only)<br />success:<br />(200), example: {message: 'Deleted'}<br />errors:<br />(404), example: {message: 'Member not found'}<br />(500), error |



#### List of book routes:

| Route      | HTTP   | Header(s)                                                    | Body                                                  | Description                                                  |
| ---------- | :----- | :----------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| /books     | GET    | Authenticated:<br />(token)                                  | none                                                  | Get all books info<br />success:<br />(200), example: [{"_id": String, "isbn": String, "title": String, "author": String, "category": String, "stock": String}, {"_id": String, "isbn": String, "title": String, "author": String, "category": String, "stock": String}, etc]<br />errors:<br />(500), error |
| /books/:id | GET    | Authenticated:<br />(token)                                  | none                                                  | Get a single book info<br />success:<br />(200), example: {"_id": String, "isbn": String, "title": String, "author": String, "category": String, "stock": String}<br />errors:<br />(404), example: {message: 'Book not found'}<br />(500), error |
| /books     | POST   | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | email: String<br />password: String<br />role: String | Create a book (admin only)<br />success:<br />(201), example: {"_id": String, "isbn": String, "title": String, "author": String, "category": String, "stock": String}<br />errors:<br />(500), error |
| /books/:id | PUT    | Authenticated:<br />(token)<br />Authorized:<br />(role: admin) | email: String                                         | Update a book with new info (admin only)<br />success:<br />(200), example: {message: 'Updated'}<br />errors:<br />(404), example: {message: 'Book not found'}<br />(500), error |
| /books/:id | DELETE | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | none                                                  | Delete a book (admin only)<br />success:<br />(200), example: {message: 'Deleted'}<br />errors:<br />(404), example: {message: 'Book not found'}<br />(500), error |



#### List of transaction routes:

| Route             | HTTP   | Header(s)                                                    | Body                                                  | Description                                                  |
| ----------------- | :----- | :----------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| /transactions     | GET    | Authenticated:<br />(token)<br />Authorized:<br />(role: admin) | none                                                  | Get all transaction info (admin only)<br />success:<br />(200), example: [{"_id": String, "member": String, "in_date": String, "out_date": String, "due_date": String, "fine": Number, "booklist": [{book1}, {book2}]}, {"_id": String, "member": String, "in_date": String, "out_date": String, "due_date": String, "fine": Number, "booklist": [{book1}, {book2}]}, etc]<br />errors:<br />(500), error |
| /transactions/:id | GET    | Authenticated:<br />(token)<br />Authorized:<br />(role: admin) | none                                                  | Get a single transaction info (admin only)<br />success:<br />(200), example: {"_id": String, "member": String, "in_date": String, "out_date": String, "due_date": String, "fine": Number, "booklist": [{book1}, {book2}]}<br />errors:<br />(404), example: {message: 'Transaction not found'}<br />(500), error |
| /transactions     | POST   | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | email: String<br />password: String<br />role: String | Create a transaction (admin only)<br />success:<br />(201), example: {"_id": String, "member": String, "in_date": String, "out_date": String, "due_date": String, "fine": Number, "booklist": [{book1}, {book2}]}<br />errors:<br />(404), example: {"message": "Transaction failed"}<br />(500), error |
| /transactions/:id | PUT    | Authenticated:<br />(token)<br />Authorized:<br />(role: admin) | email: String                                         | Update a transaction with new info (admin only)<br />success:<br />(200), example: {"_id": String, "member": String, "in_date": String, "out_date": String, "due_date": String, "fine": Number, "booklist": [{book1}, {book2}]}<br />errors:<br />(404), example: {message: 'Transaction not found'}<br />(500), error |
| /transactions/:id | DELETE | Authenticated:<br />(token),<br />Authorized:<br />(role: admin) | none                                                  | Delete a transaction (admin only)<br />success:<br />(200), example: {message: 'Transaction successfully deleted'}<br />errors:<br />(404), example: {message: 'Transaction not found'}<br />(500), error |



#### List of filter routes:

| Route                           | HTTP | Description                                                  |
| ------------------------------- | ---- | ------------------------------------------------------------ |
| /books?`<key>`=`<value>`        | GET  | Get books by spesific key and value<br />Example:<br />http://localhost:3000/books/?title=Dora<br />http://localhost:3000/books/?author=Willy<br />http://localhost:3000/books/?category=fantasy<br />success:<br />(200), example: [{"_id": String, "isbn": String, "title": String, "author": String, "category": String, "stock": String}, {"_id": String, "isbn": String, "title": String, "author": String, "category": String, "stock": String}, etc]<br />errors:<br />(500), error |
| /transactions?`<key>`=`<value>` | GET  | Get transactions by spesific key and value from book<br />Example:<br />http://localhost:3000/transactions/?_id=`<bookId>`<br />http://localhost:3000/transactions/?isbn=`<isbnNumber>`<br />http://localhost:3000/transactions/?category=`<category>`<br />success:<br />(200), example: [{"_id": String, "member": String, "in_date": String, "out_date": String, "due_date": String, "fine": Number, "booklist": [{book1}, {book2}]}, {"_id": String, "member": String, "in_date": String, "out_date": String, "due_date": String, "fine": Number, "booklist": [{book1}, {book2}]}, etc]<br />errors:<br />(500), error |