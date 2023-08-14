const { ApolloServer, gql } = require("apollo-server");

const students = [
  { ID: 1, name: "John Doe", age: 18, grade: "A" },
  { ID: 2, name: "Jane Smith", age: 17, grade: "B" },
  { ID: 3, name: "David Johnson", age: 16, grade: "A-" },
  { ID: 4, name: "Emily Williams", age: 18, grade: "B+" },
  { ID: 5, name: "Michael Brown", age: 17, grade: "A+" },
];

const typeDefs = gql`
  type Student {
    ID: Int
    name: String
    age: Int
    grade: String
  }

  type Query {
    students: [Student]
    studentByID(ID: Int!): Student
  }
`;

const resolvers = {
  Query: {
    students: () => students,
    studentByID: (_, { ID }) => students.find((student) => student.ID === ID),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
