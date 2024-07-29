import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';

export function adminDirective(directiveName) {
    return {
        adminDirectiveTypeDefs: `
      directive @${directiveName} on FIELD_DEFINITION
    `,
        adminDirectiveTransformer: (schema) => mapSchema(schema, {
            [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
                const adminDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

                if (adminDirective) {
                    const { resolve = defaultFieldResolver } = fieldConfig;
                    fieldConfig.resolve = async function (source, args, context, info) {
                        if (context.user.role !== 'ADMIN') {
                            throw new Error('You are not authorized to access this resource');
                        }
                        return resolve(source, args, context, info);
                    };
                    return fieldConfig;
                }
            }
        })
    };
}
