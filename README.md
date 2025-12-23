In the program before us, there is an option to receive and update information from an existing file of targets.

The file contains the following paths:

**/health** - to check the server.

**/briefing** - to verify that the user is indeed sending with an approved header.

**/targets** - contains all the targets.

This path can be used with the following methods

**GET** - plus an id number to get details of the requested item.

Queries can be added to filter according to region, code name and urgency level.

**POST** - to insert a new user.

**PUT** - to update a user.

**DELETE** - to delete a user.



The following logs will be attached to each action: method, path, request status and response time.

In addition, a token will be added to the header to verify the connection.



**example:**



curl -X DELETE -d '{"codeName":1587, "region":"center", "priority":8}' -H "Content-Type: application/json"  http://localhost:3000/targets/t-102



curl -X PUT -d '{"codeName":1587, "region":"center", "priority":8}' -H "Content-Type: application/json"  http://localhost:3000/targets/t-102



curl -X POST -d '{"id":"t-102", "codeName":1587, "region":"north", "priority":4}' -H "Content-Type: application/json"  http://localhost:3000/targets



curl -X GET -H "Client-Unit":"Golani" http://localhost:3000/briefing



