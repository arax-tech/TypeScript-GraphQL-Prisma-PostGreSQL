export const typeDefs = `
    type Todo  {
        id : ID!
        title: String
        completed: Boolean
        user: User
        createdAt : String!  
    }
`