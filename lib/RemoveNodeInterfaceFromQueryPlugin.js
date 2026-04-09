module.exports = {
  name: "RemoveNodeInterfaceFromQueryPlugin",
  version: "1.0.0",
  schema: {
    hooks: {
      GraphQLObjectType_interfaces(interfaces, _build, context) {
        if (!context.scope.isRootQuery) {
          return interfaces;
        }
        return [];
      },
      GraphQLObjectType(obj, _build, context) {
        if (!context.scope.isRootQuery) {
          return obj;
        }
        const { isTypeOf: _deleteIsTypeOf, ...rest } = obj;
        return rest;
      },
    },
  },
};
