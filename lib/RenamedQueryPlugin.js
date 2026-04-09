module.exports = {
  name: "RenamedQueryPlugin",
  version: "1.0.0",
  schema: {
    hooks: {
      init: {
        callback(_, build) {
          build.registerObjectType(
            "PostGraphileQuery",
            { isRootQuery: true },
            () => ({
              description:
                "PostGraphile Query type, gives access to data from PostgreSQL",
            }),
            "gatsby-source-pg override",
          );
          return _;
        },
        provides: ["PostGraphileQuery"],
      },
      GraphQLSchema: {
        callback(schema, build) {
          const { getTypeByName, extend } = build;
          const PostGraphileQuery = getTypeByName("PostGraphileQuery");
          if (!PostGraphileQuery) {
            throw new Error(
              "gatsby-source-pg: PostGraphileQuery type was not registered",
            );
          }
          return extend(
            schema,
            { query: PostGraphileQuery },
            "Setting PostGraphileQuery as root query type",
          );
        },
        provides: ["PostGraphileQuery"],
      },
    },
  },
};
