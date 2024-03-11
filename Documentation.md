# Le 5 de Titi

## Architecture of a web application
The basic model for a web application consists often in three different items that work together

### 1- Models
The models are objects that map with resources we want to manipulate. For instance, if we try to model a school, a room would be a model object, as it would be a student.

Each model has its own attributes. In javascript often such models are simple objects.
For instance, this could be a very simple model of a student:

```javascript
const Student = {
  firstName: "Thibaud",
  lastName: "Racine",
}
```

### 2- Services
Services are a collection of methods that allows the operation on models. If we want to store in a DB a Student, a method for doing so would exist in the database service.

### 3- Routes
In a web application routes define the entry points from the world. A user can call a specific url and pass some parameters to get an operation to be done. For instance, an endpoint to store a student would call the appropriate service with the supplied parameters.

## Models and read/write/update/delete from DB
As mentioned in the previous section, the first thing to do when playing with a database is to define a model.

In Sequelize, this is documented [here](https://sequelize.org/docs/v6/core-concepts/model-basics/).

For our student we would do something like

```javascript
const Student = sequelize.define('student', {
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  }
},{});
```

Then we would define **4 methods** to cover the CRUD operations for the student in the corresponding DB service.

For instance, the create method inside the service could be:

```javascript
export const createStudent = async (firstName, lastName) => {
  const std = await Student.create({
    firstName : firstNAme, 
    lastName: lastName
  })
  return std;
}
```

Basic operations for sequelize are defined [here](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/).

## Endpoints
Routes in express.js define the endpoints that can be called by a user in the web.
Basic information on how to configure the routes can be found [here](https://expressjs.com/en/guide/routing.html).

Rest APIs have specific roules on how operations are mapped to specific HTTP methods:
- GET methods are for retrieving data
- POST methods are for creating new entries
- PUT methods are for updating existing entries
- DELETE methods are for removing entries.

More information [here](https://dev.to/colinmcdermott/restful-api-design-cheatsheet-2ji6).

To create a user from the previous example, a route could be:

```javascript
app.post('/', async (req, res, next) => {
  const std = await createStudent("Thibaud", "Racine");
  res.json({firstName: std.firstName, lastName: std.lastName});
})
```

### Note on parameters and routes
We can send parameters to web endpoints in three different ways.

#### Get parameters
These are the parameters sent in an url like ``?key=value``.
In express.js, these are stored in the ``req.query`` object

#### Path parameters
These are the parameters passed in the url like ```/:param-name``. These can be found in the ``req.params`` object.

#### Post parameters (body)
These can be sent only on a POST or PUT method, and can be found in ``req.body`` object.

### Error handling
A good we application always handles errors. In express.js, we can handle the errors by setting the corresponding status to the response.

Common response status are:
- 20x: Success. 200 is the standard status for OK.
- 40x: Expected errors from the client (400 is the most used, which means "bad request": parameters sent were wrong).
- 50x: Server error. The most used is code 500 for unexpected errors.

More information can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

In our little example, some basic error handling could be:

```javascript
app.post('/', async (req, res, next) => {
  try {

    // Check that first name and last name were supplied
    if(!req.body.firstName || !req.body.lastName) {
      return res.status(400).message("Missing required parameters");
    }

    const std = await createStudent("Thibaud", "Racine");
    if(!std) {
      // The object was not created correctly. This should have triggered an exception and the following catch should have handled this. This should never happen, but if it's the case send an error.
      return res.status(500).message("Could not create the student");
    }

    res.json({firstName: std.firstName, lastName: std.lastName});
  } catch {
    // An unexpected error happened. Fail.
    res.status(500).message("Internal server error.")
  }
})
```

## The end
Now get that good grade and let's have plenty of 🍺!!
