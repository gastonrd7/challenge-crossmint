# Api service

## Technology used
- Node
- TypeScript
- Jest
- Express

I decided to create an api with a single endpoint which receives only 1 parameter: candidateId

http://localhost:3000/createConstelation

In the body send for example:
`{
    "candidateId": "9385ec1d-8687-4e1b-a893-5399fff741ad"
}`

## To run the API type service you must follow the following steps:
- Install
  `npm i`
- compile
  `npm run build`
- execute
  `npm start`

Some tests were also added as an example of code coverage.

To run them you must execute:
  `npm run test`
