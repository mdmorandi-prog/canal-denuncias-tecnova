
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Complaint
 * 
 */
export type Complaint = $Result.DefaultSelection<Prisma.$ComplaintPayload>
/**
 * Model ComplaintAttachment
 * 
 */
export type ComplaintAttachment = $Result.DefaultSelection<Prisma.$ComplaintAttachmentPayload>
/**
 * Model ComplaintMessage
 * 
 */
export type ComplaintMessage = $Result.DefaultSelection<Prisma.$ComplaintMessagePayload>
/**
 * Model CommitteeMember
 * 
 */
export type CommitteeMember = $Result.DefaultSelection<Prisma.$CommitteeMemberPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Complaints
 * const complaints = await prisma.complaint.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Complaints
   * const complaints = await prisma.complaint.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.complaint`: Exposes CRUD operations for the **Complaint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Complaints
    * const complaints = await prisma.complaint.findMany()
    * ```
    */
  get complaint(): Prisma.ComplaintDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.complaintAttachment`: Exposes CRUD operations for the **ComplaintAttachment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplaintAttachments
    * const complaintAttachments = await prisma.complaintAttachment.findMany()
    * ```
    */
  get complaintAttachment(): Prisma.ComplaintAttachmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.complaintMessage`: Exposes CRUD operations for the **ComplaintMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ComplaintMessages
    * const complaintMessages = await prisma.complaintMessage.findMany()
    * ```
    */
  get complaintMessage(): Prisma.ComplaintMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.committeeMember`: Exposes CRUD operations for the **CommitteeMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommitteeMembers
    * const committeeMembers = await prisma.committeeMember.findMany()
    * ```
    */
  get committeeMember(): Prisma.CommitteeMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Complaint: 'Complaint',
    ComplaintAttachment: 'ComplaintAttachment',
    ComplaintMessage: 'ComplaintMessage',
    CommitteeMember: 'CommitteeMember',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "complaint" | "complaintAttachment" | "complaintMessage" | "committeeMember" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Complaint: {
        payload: Prisma.$ComplaintPayload<ExtArgs>
        fields: Prisma.ComplaintFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          findFirst: {
            args: Prisma.ComplaintFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          findMany: {
            args: Prisma.ComplaintFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>[]
          }
          create: {
            args: Prisma.ComplaintCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          createMany: {
            args: Prisma.ComplaintCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>[]
          }
          delete: {
            args: Prisma.ComplaintDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          update: {
            args: Prisma.ComplaintUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          deleteMany: {
            args: Prisma.ComplaintDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComplaintUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>[]
          }
          upsert: {
            args: Prisma.ComplaintUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintPayload>
          }
          aggregate: {
            args: Prisma.ComplaintAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaint>
          }
          groupBy: {
            args: Prisma.ComplaintGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintCountAggregateOutputType> | number
          }
        }
      }
      ComplaintAttachment: {
        payload: Prisma.$ComplaintAttachmentPayload<ExtArgs>
        fields: Prisma.ComplaintAttachmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintAttachmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintAttachmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          findFirst: {
            args: Prisma.ComplaintAttachmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintAttachmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          findMany: {
            args: Prisma.ComplaintAttachmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>[]
          }
          create: {
            args: Prisma.ComplaintAttachmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          createMany: {
            args: Prisma.ComplaintAttachmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintAttachmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>[]
          }
          delete: {
            args: Prisma.ComplaintAttachmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          update: {
            args: Prisma.ComplaintAttachmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          deleteMany: {
            args: Prisma.ComplaintAttachmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintAttachmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComplaintAttachmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>[]
          }
          upsert: {
            args: Prisma.ComplaintAttachmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintAttachmentPayload>
          }
          aggregate: {
            args: Prisma.ComplaintAttachmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaintAttachment>
          }
          groupBy: {
            args: Prisma.ComplaintAttachmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintAttachmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintAttachmentCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintAttachmentCountAggregateOutputType> | number
          }
        }
      }
      ComplaintMessage: {
        payload: Prisma.$ComplaintMessagePayload<ExtArgs>
        fields: Prisma.ComplaintMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComplaintMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComplaintMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintMessagePayload>
          }
          findFirst: {
            args: Prisma.ComplaintMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComplaintMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintMessagePayload>
          }
          findMany: {
            args: Prisma.ComplaintMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintMessagePayload>[]
          }
          create: {
            args: Prisma.ComplaintMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintMessagePayload>
          }
          createMany: {
            args: Prisma.ComplaintMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComplaintMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintMessagePayload>[]
          }
          delete: {
            args: Prisma.ComplaintMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintMessagePayload>
          }
          update: {
            args: Prisma.ComplaintMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintMessagePayload>
          }
          deleteMany: {
            args: Prisma.ComplaintMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComplaintMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComplaintMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintMessagePayload>[]
          }
          upsert: {
            args: Prisma.ComplaintMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComplaintMessagePayload>
          }
          aggregate: {
            args: Prisma.ComplaintMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComplaintMessage>
          }
          groupBy: {
            args: Prisma.ComplaintMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComplaintMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComplaintMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ComplaintMessageCountAggregateOutputType> | number
          }
        }
      }
      CommitteeMember: {
        payload: Prisma.$CommitteeMemberPayload<ExtArgs>
        fields: Prisma.CommitteeMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommitteeMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitteeMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommitteeMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitteeMemberPayload>
          }
          findFirst: {
            args: Prisma.CommitteeMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitteeMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommitteeMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitteeMemberPayload>
          }
          findMany: {
            args: Prisma.CommitteeMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitteeMemberPayload>[]
          }
          create: {
            args: Prisma.CommitteeMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitteeMemberPayload>
          }
          createMany: {
            args: Prisma.CommitteeMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommitteeMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitteeMemberPayload>[]
          }
          delete: {
            args: Prisma.CommitteeMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitteeMemberPayload>
          }
          update: {
            args: Prisma.CommitteeMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitteeMemberPayload>
          }
          deleteMany: {
            args: Prisma.CommitteeMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommitteeMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommitteeMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitteeMemberPayload>[]
          }
          upsert: {
            args: Prisma.CommitteeMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommitteeMemberPayload>
          }
          aggregate: {
            args: Prisma.CommitteeMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommitteeMember>
          }
          groupBy: {
            args: Prisma.CommitteeMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommitteeMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommitteeMemberCountArgs<ExtArgs>
            result: $Utils.Optional<CommitteeMemberCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    complaint?: ComplaintOmit
    complaintAttachment?: ComplaintAttachmentOmit
    complaintMessage?: ComplaintMessageOmit
    committeeMember?: CommitteeMemberOmit
    auditLog?: AuditLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ComplaintCountOutputType
   */

  export type ComplaintCountOutputType = {
    attachments: number
    messages: number
  }

  export type ComplaintCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | ComplaintCountOutputTypeCountAttachmentsArgs
    messages?: boolean | ComplaintCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * ComplaintCountOutputType without action
   */
  export type ComplaintCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintCountOutputType
     */
    select?: ComplaintCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ComplaintCountOutputType without action
   */
  export type ComplaintCountOutputTypeCountAttachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintAttachmentWhereInput
  }

  /**
   * ComplaintCountOutputType without action
   */
  export type ComplaintCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Complaint
   */

  export type AggregateComplaint = {
    _count: ComplaintCountAggregateOutputType | null
    _min: ComplaintMinAggregateOutputType | null
    _max: ComplaintMaxAggregateOutputType | null
  }

  export type ComplaintMinAggregateOutputType = {
    id: string | null
    protocol: string | null
    type: string | null
    unit: string | null
    sector: string | null
    shift: string | null
    occurrenceDate: Date | null
    accusedName: string | null
    accusedPosition: string | null
    description: string | null
    witnesses: string | null
    isAnonymous: boolean | null
    reporterName: string | null
    reporterEmail: string | null
    reporterPhone: string | null
    wantsResponse: boolean | null
    status: string | null
    priority: string | null
    createdAt: Date | null
    updatedAt: Date | null
    closedAt: Date | null
    assignedTo: string | null
  }

  export type ComplaintMaxAggregateOutputType = {
    id: string | null
    protocol: string | null
    type: string | null
    unit: string | null
    sector: string | null
    shift: string | null
    occurrenceDate: Date | null
    accusedName: string | null
    accusedPosition: string | null
    description: string | null
    witnesses: string | null
    isAnonymous: boolean | null
    reporterName: string | null
    reporterEmail: string | null
    reporterPhone: string | null
    wantsResponse: boolean | null
    status: string | null
    priority: string | null
    createdAt: Date | null
    updatedAt: Date | null
    closedAt: Date | null
    assignedTo: string | null
  }

  export type ComplaintCountAggregateOutputType = {
    id: number
    protocol: number
    type: number
    unit: number
    sector: number
    shift: number
    occurrenceDate: number
    accusedName: number
    accusedPosition: number
    description: number
    witnesses: number
    isAnonymous: number
    reporterName: number
    reporterEmail: number
    reporterPhone: number
    wantsResponse: number
    status: number
    priority: number
    createdAt: number
    updatedAt: number
    closedAt: number
    assignedTo: number
    _all: number
  }


  export type ComplaintMinAggregateInputType = {
    id?: true
    protocol?: true
    type?: true
    unit?: true
    sector?: true
    shift?: true
    occurrenceDate?: true
    accusedName?: true
    accusedPosition?: true
    description?: true
    witnesses?: true
    isAnonymous?: true
    reporterName?: true
    reporterEmail?: true
    reporterPhone?: true
    wantsResponse?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    assignedTo?: true
  }

  export type ComplaintMaxAggregateInputType = {
    id?: true
    protocol?: true
    type?: true
    unit?: true
    sector?: true
    shift?: true
    occurrenceDate?: true
    accusedName?: true
    accusedPosition?: true
    description?: true
    witnesses?: true
    isAnonymous?: true
    reporterName?: true
    reporterEmail?: true
    reporterPhone?: true
    wantsResponse?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    assignedTo?: true
  }

  export type ComplaintCountAggregateInputType = {
    id?: true
    protocol?: true
    type?: true
    unit?: true
    sector?: true
    shift?: true
    occurrenceDate?: true
    accusedName?: true
    accusedPosition?: true
    description?: true
    witnesses?: true
    isAnonymous?: true
    reporterName?: true
    reporterEmail?: true
    reporterPhone?: true
    wantsResponse?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    closedAt?: true
    assignedTo?: true
    _all?: true
  }

  export type ComplaintAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Complaint to aggregate.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Complaints
    **/
    _count?: true | ComplaintCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintMaxAggregateInputType
  }

  export type GetComplaintAggregateType<T extends ComplaintAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaint[P]>
      : GetScalarType<T[P], AggregateComplaint[P]>
  }




  export type ComplaintGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintWhereInput
    orderBy?: ComplaintOrderByWithAggregationInput | ComplaintOrderByWithAggregationInput[]
    by: ComplaintScalarFieldEnum[] | ComplaintScalarFieldEnum
    having?: ComplaintScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintCountAggregateInputType | true
    _min?: ComplaintMinAggregateInputType
    _max?: ComplaintMaxAggregateInputType
  }

  export type ComplaintGroupByOutputType = {
    id: string
    protocol: string
    type: string
    unit: string | null
    sector: string | null
    shift: string | null
    occurrenceDate: Date | null
    accusedName: string | null
    accusedPosition: string | null
    description: string
    witnesses: string | null
    isAnonymous: boolean
    reporterName: string | null
    reporterEmail: string | null
    reporterPhone: string | null
    wantsResponse: boolean
    status: string
    priority: string
    createdAt: Date
    updatedAt: Date
    closedAt: Date | null
    assignedTo: string | null
    _count: ComplaintCountAggregateOutputType | null
    _min: ComplaintMinAggregateOutputType | null
    _max: ComplaintMaxAggregateOutputType | null
  }

  type GetComplaintGroupByPayload<T extends ComplaintGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    protocol?: boolean
    type?: boolean
    unit?: boolean
    sector?: boolean
    shift?: boolean
    occurrenceDate?: boolean
    accusedName?: boolean
    accusedPosition?: boolean
    description?: boolean
    witnesses?: boolean
    isAnonymous?: boolean
    reporterName?: boolean
    reporterEmail?: boolean
    reporterPhone?: boolean
    wantsResponse?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    assignedTo?: boolean
    attachments?: boolean | Complaint$attachmentsArgs<ExtArgs>
    messages?: boolean | Complaint$messagesArgs<ExtArgs>
    _count?: boolean | ComplaintCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaint"]>

  export type ComplaintSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    protocol?: boolean
    type?: boolean
    unit?: boolean
    sector?: boolean
    shift?: boolean
    occurrenceDate?: boolean
    accusedName?: boolean
    accusedPosition?: boolean
    description?: boolean
    witnesses?: boolean
    isAnonymous?: boolean
    reporterName?: boolean
    reporterEmail?: boolean
    reporterPhone?: boolean
    wantsResponse?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    assignedTo?: boolean
  }, ExtArgs["result"]["complaint"]>

  export type ComplaintSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    protocol?: boolean
    type?: boolean
    unit?: boolean
    sector?: boolean
    shift?: boolean
    occurrenceDate?: boolean
    accusedName?: boolean
    accusedPosition?: boolean
    description?: boolean
    witnesses?: boolean
    isAnonymous?: boolean
    reporterName?: boolean
    reporterEmail?: boolean
    reporterPhone?: boolean
    wantsResponse?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    assignedTo?: boolean
  }, ExtArgs["result"]["complaint"]>

  export type ComplaintSelectScalar = {
    id?: boolean
    protocol?: boolean
    type?: boolean
    unit?: boolean
    sector?: boolean
    shift?: boolean
    occurrenceDate?: boolean
    accusedName?: boolean
    accusedPosition?: boolean
    description?: boolean
    witnesses?: boolean
    isAnonymous?: boolean
    reporterName?: boolean
    reporterEmail?: boolean
    reporterPhone?: boolean
    wantsResponse?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    closedAt?: boolean
    assignedTo?: boolean
  }

  export type ComplaintOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "protocol" | "type" | "unit" | "sector" | "shift" | "occurrenceDate" | "accusedName" | "accusedPosition" | "description" | "witnesses" | "isAnonymous" | "reporterName" | "reporterEmail" | "reporterPhone" | "wantsResponse" | "status" | "priority" | "createdAt" | "updatedAt" | "closedAt" | "assignedTo", ExtArgs["result"]["complaint"]>
  export type ComplaintInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attachments?: boolean | Complaint$attachmentsArgs<ExtArgs>
    messages?: boolean | Complaint$messagesArgs<ExtArgs>
    _count?: boolean | ComplaintCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ComplaintIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ComplaintIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ComplaintPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Complaint"
    objects: {
      attachments: Prisma.$ComplaintAttachmentPayload<ExtArgs>[]
      messages: Prisma.$ComplaintMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      protocol: string
      type: string
      unit: string | null
      sector: string | null
      shift: string | null
      occurrenceDate: Date | null
      accusedName: string | null
      accusedPosition: string | null
      description: string
      witnesses: string | null
      isAnonymous: boolean
      reporterName: string | null
      reporterEmail: string | null
      reporterPhone: string | null
      wantsResponse: boolean
      status: string
      priority: string
      createdAt: Date
      updatedAt: Date
      closedAt: Date | null
      assignedTo: string | null
    }, ExtArgs["result"]["complaint"]>
    composites: {}
  }

  type ComplaintGetPayload<S extends boolean | null | undefined | ComplaintDefaultArgs> = $Result.GetResult<Prisma.$ComplaintPayload, S>

  type ComplaintCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComplaintFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComplaintCountAggregateInputType | true
    }

  export interface ComplaintDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Complaint'], meta: { name: 'Complaint' } }
    /**
     * Find zero or one Complaint that matches the filter.
     * @param {ComplaintFindUniqueArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintFindUniqueArgs>(args: SelectSubset<T, ComplaintFindUniqueArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Complaint that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComplaintFindUniqueOrThrowArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Complaint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindFirstArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintFindFirstArgs>(args?: SelectSubset<T, ComplaintFindFirstArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Complaint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindFirstOrThrowArgs} args - Arguments to find a Complaint
     * @example
     * // Get one Complaint
     * const complaint = await prisma.complaint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Complaints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Complaints
     * const complaints = await prisma.complaint.findMany()
     * 
     * // Get first 10 Complaints
     * const complaints = await prisma.complaint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintWithIdOnly = await prisma.complaint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintFindManyArgs>(args?: SelectSubset<T, ComplaintFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Complaint.
     * @param {ComplaintCreateArgs} args - Arguments to create a Complaint.
     * @example
     * // Create one Complaint
     * const Complaint = await prisma.complaint.create({
     *   data: {
     *     // ... data to create a Complaint
     *   }
     * })
     * 
     */
    create<T extends ComplaintCreateArgs>(args: SelectSubset<T, ComplaintCreateArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Complaints.
     * @param {ComplaintCreateManyArgs} args - Arguments to create many Complaints.
     * @example
     * // Create many Complaints
     * const complaint = await prisma.complaint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintCreateManyArgs>(args?: SelectSubset<T, ComplaintCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Complaints and returns the data saved in the database.
     * @param {ComplaintCreateManyAndReturnArgs} args - Arguments to create many Complaints.
     * @example
     * // Create many Complaints
     * const complaint = await prisma.complaint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Complaints and only return the `id`
     * const complaintWithIdOnly = await prisma.complaint.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Complaint.
     * @param {ComplaintDeleteArgs} args - Arguments to delete one Complaint.
     * @example
     * // Delete one Complaint
     * const Complaint = await prisma.complaint.delete({
     *   where: {
     *     // ... filter to delete one Complaint
     *   }
     * })
     * 
     */
    delete<T extends ComplaintDeleteArgs>(args: SelectSubset<T, ComplaintDeleteArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Complaint.
     * @param {ComplaintUpdateArgs} args - Arguments to update one Complaint.
     * @example
     * // Update one Complaint
     * const complaint = await prisma.complaint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintUpdateArgs>(args: SelectSubset<T, ComplaintUpdateArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Complaints.
     * @param {ComplaintDeleteManyArgs} args - Arguments to filter Complaints to delete.
     * @example
     * // Delete a few Complaints
     * const { count } = await prisma.complaint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintDeleteManyArgs>(args?: SelectSubset<T, ComplaintDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Complaints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Complaints
     * const complaint = await prisma.complaint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintUpdateManyArgs>(args: SelectSubset<T, ComplaintUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Complaints and returns the data updated in the database.
     * @param {ComplaintUpdateManyAndReturnArgs} args - Arguments to update many Complaints.
     * @example
     * // Update many Complaints
     * const complaint = await prisma.complaint.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Complaints and only return the `id`
     * const complaintWithIdOnly = await prisma.complaint.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComplaintUpdateManyAndReturnArgs>(args: SelectSubset<T, ComplaintUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Complaint.
     * @param {ComplaintUpsertArgs} args - Arguments to update or create a Complaint.
     * @example
     * // Update or create a Complaint
     * const complaint = await prisma.complaint.upsert({
     *   create: {
     *     // ... data to create a Complaint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Complaint we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintUpsertArgs>(args: SelectSubset<T, ComplaintUpsertArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Complaints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintCountArgs} args - Arguments to filter Complaints to count.
     * @example
     * // Count the number of Complaints
     * const count = await prisma.complaint.count({
     *   where: {
     *     // ... the filter for the Complaints we want to count
     *   }
     * })
    **/
    count<T extends ComplaintCountArgs>(
      args?: Subset<T, ComplaintCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Complaint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplaintAggregateArgs>(args: Subset<T, ComplaintAggregateArgs>): Prisma.PrismaPromise<GetComplaintAggregateType<T>>

    /**
     * Group by Complaint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComplaintGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComplaintGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Complaint model
   */
  readonly fields: ComplaintFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Complaint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attachments<T extends Complaint$attachmentsArgs<ExtArgs> = {}>(args?: Subset<T, Complaint$attachmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    messages<T extends Complaint$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Complaint$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Complaint model
   */
  interface ComplaintFieldRefs {
    readonly id: FieldRef<"Complaint", 'String'>
    readonly protocol: FieldRef<"Complaint", 'String'>
    readonly type: FieldRef<"Complaint", 'String'>
    readonly unit: FieldRef<"Complaint", 'String'>
    readonly sector: FieldRef<"Complaint", 'String'>
    readonly shift: FieldRef<"Complaint", 'String'>
    readonly occurrenceDate: FieldRef<"Complaint", 'DateTime'>
    readonly accusedName: FieldRef<"Complaint", 'String'>
    readonly accusedPosition: FieldRef<"Complaint", 'String'>
    readonly description: FieldRef<"Complaint", 'String'>
    readonly witnesses: FieldRef<"Complaint", 'String'>
    readonly isAnonymous: FieldRef<"Complaint", 'Boolean'>
    readonly reporterName: FieldRef<"Complaint", 'String'>
    readonly reporterEmail: FieldRef<"Complaint", 'String'>
    readonly reporterPhone: FieldRef<"Complaint", 'String'>
    readonly wantsResponse: FieldRef<"Complaint", 'Boolean'>
    readonly status: FieldRef<"Complaint", 'String'>
    readonly priority: FieldRef<"Complaint", 'String'>
    readonly createdAt: FieldRef<"Complaint", 'DateTime'>
    readonly updatedAt: FieldRef<"Complaint", 'DateTime'>
    readonly closedAt: FieldRef<"Complaint", 'DateTime'>
    readonly assignedTo: FieldRef<"Complaint", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Complaint findUnique
   */
  export type ComplaintFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint findUniqueOrThrow
   */
  export type ComplaintFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint findFirst
   */
  export type ComplaintFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Complaints.
     */
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint findFirstOrThrow
   */
  export type ComplaintFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaint to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Complaints.
     */
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint findMany
   */
  export type ComplaintFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter, which Complaints to fetch.
     */
    where?: ComplaintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Complaints to fetch.
     */
    orderBy?: ComplaintOrderByWithRelationInput | ComplaintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Complaints.
     */
    cursor?: ComplaintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Complaints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Complaints.
     */
    skip?: number
    distinct?: ComplaintScalarFieldEnum | ComplaintScalarFieldEnum[]
  }

  /**
   * Complaint create
   */
  export type ComplaintCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * The data needed to create a Complaint.
     */
    data: XOR<ComplaintCreateInput, ComplaintUncheckedCreateInput>
  }

  /**
   * Complaint createMany
   */
  export type ComplaintCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Complaints.
     */
    data: ComplaintCreateManyInput | ComplaintCreateManyInput[]
  }

  /**
   * Complaint createManyAndReturn
   */
  export type ComplaintCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * The data used to create many Complaints.
     */
    data: ComplaintCreateManyInput | ComplaintCreateManyInput[]
  }

  /**
   * Complaint update
   */
  export type ComplaintUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * The data needed to update a Complaint.
     */
    data: XOR<ComplaintUpdateInput, ComplaintUncheckedUpdateInput>
    /**
     * Choose, which Complaint to update.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint updateMany
   */
  export type ComplaintUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Complaints.
     */
    data: XOR<ComplaintUpdateManyMutationInput, ComplaintUncheckedUpdateManyInput>
    /**
     * Filter which Complaints to update
     */
    where?: ComplaintWhereInput
    /**
     * Limit how many Complaints to update.
     */
    limit?: number
  }

  /**
   * Complaint updateManyAndReturn
   */
  export type ComplaintUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * The data used to update Complaints.
     */
    data: XOR<ComplaintUpdateManyMutationInput, ComplaintUncheckedUpdateManyInput>
    /**
     * Filter which Complaints to update
     */
    where?: ComplaintWhereInput
    /**
     * Limit how many Complaints to update.
     */
    limit?: number
  }

  /**
   * Complaint upsert
   */
  export type ComplaintUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * The filter to search for the Complaint to update in case it exists.
     */
    where: ComplaintWhereUniqueInput
    /**
     * In case the Complaint found by the `where` argument doesn't exist, create a new Complaint with this data.
     */
    create: XOR<ComplaintCreateInput, ComplaintUncheckedCreateInput>
    /**
     * In case the Complaint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintUpdateInput, ComplaintUncheckedUpdateInput>
  }

  /**
   * Complaint delete
   */
  export type ComplaintDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
    /**
     * Filter which Complaint to delete.
     */
    where: ComplaintWhereUniqueInput
  }

  /**
   * Complaint deleteMany
   */
  export type ComplaintDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Complaints to delete
     */
    where?: ComplaintWhereInput
    /**
     * Limit how many Complaints to delete.
     */
    limit?: number
  }

  /**
   * Complaint.attachments
   */
  export type Complaint$attachmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    where?: ComplaintAttachmentWhereInput
    orderBy?: ComplaintAttachmentOrderByWithRelationInput | ComplaintAttachmentOrderByWithRelationInput[]
    cursor?: ComplaintAttachmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplaintAttachmentScalarFieldEnum | ComplaintAttachmentScalarFieldEnum[]
  }

  /**
   * Complaint.messages
   */
  export type Complaint$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageInclude<ExtArgs> | null
    where?: ComplaintMessageWhereInput
    orderBy?: ComplaintMessageOrderByWithRelationInput | ComplaintMessageOrderByWithRelationInput[]
    cursor?: ComplaintMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ComplaintMessageScalarFieldEnum | ComplaintMessageScalarFieldEnum[]
  }

  /**
   * Complaint without action
   */
  export type ComplaintDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Complaint
     */
    select?: ComplaintSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Complaint
     */
    omit?: ComplaintOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintInclude<ExtArgs> | null
  }


  /**
   * Model ComplaintAttachment
   */

  export type AggregateComplaintAttachment = {
    _count: ComplaintAttachmentCountAggregateOutputType | null
    _avg: ComplaintAttachmentAvgAggregateOutputType | null
    _sum: ComplaintAttachmentSumAggregateOutputType | null
    _min: ComplaintAttachmentMinAggregateOutputType | null
    _max: ComplaintAttachmentMaxAggregateOutputType | null
  }

  export type ComplaintAttachmentAvgAggregateOutputType = {
    size: number | null
  }

  export type ComplaintAttachmentSumAggregateOutputType = {
    size: number | null
  }

  export type ComplaintAttachmentMinAggregateOutputType = {
    id: string | null
    complaintId: string | null
    filename: string | null
    filepath: string | null
    mimetype: string | null
    size: number | null
    createdAt: Date | null
  }

  export type ComplaintAttachmentMaxAggregateOutputType = {
    id: string | null
    complaintId: string | null
    filename: string | null
    filepath: string | null
    mimetype: string | null
    size: number | null
    createdAt: Date | null
  }

  export type ComplaintAttachmentCountAggregateOutputType = {
    id: number
    complaintId: number
    filename: number
    filepath: number
    mimetype: number
    size: number
    createdAt: number
    _all: number
  }


  export type ComplaintAttachmentAvgAggregateInputType = {
    size?: true
  }

  export type ComplaintAttachmentSumAggregateInputType = {
    size?: true
  }

  export type ComplaintAttachmentMinAggregateInputType = {
    id?: true
    complaintId?: true
    filename?: true
    filepath?: true
    mimetype?: true
    size?: true
    createdAt?: true
  }

  export type ComplaintAttachmentMaxAggregateInputType = {
    id?: true
    complaintId?: true
    filename?: true
    filepath?: true
    mimetype?: true
    size?: true
    createdAt?: true
  }

  export type ComplaintAttachmentCountAggregateInputType = {
    id?: true
    complaintId?: true
    filename?: true
    filepath?: true
    mimetype?: true
    size?: true
    createdAt?: true
    _all?: true
  }

  export type ComplaintAttachmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintAttachment to aggregate.
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAttachments to fetch.
     */
    orderBy?: ComplaintAttachmentOrderByWithRelationInput | ComplaintAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplaintAttachments
    **/
    _count?: true | ComplaintAttachmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComplaintAttachmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComplaintAttachmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintAttachmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintAttachmentMaxAggregateInputType
  }

  export type GetComplaintAttachmentAggregateType<T extends ComplaintAttachmentAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaintAttachment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaintAttachment[P]>
      : GetScalarType<T[P], AggregateComplaintAttachment[P]>
  }




  export type ComplaintAttachmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintAttachmentWhereInput
    orderBy?: ComplaintAttachmentOrderByWithAggregationInput | ComplaintAttachmentOrderByWithAggregationInput[]
    by: ComplaintAttachmentScalarFieldEnum[] | ComplaintAttachmentScalarFieldEnum
    having?: ComplaintAttachmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintAttachmentCountAggregateInputType | true
    _avg?: ComplaintAttachmentAvgAggregateInputType
    _sum?: ComplaintAttachmentSumAggregateInputType
    _min?: ComplaintAttachmentMinAggregateInputType
    _max?: ComplaintAttachmentMaxAggregateInputType
  }

  export type ComplaintAttachmentGroupByOutputType = {
    id: string
    complaintId: string
    filename: string
    filepath: string
    mimetype: string
    size: number
    createdAt: Date
    _count: ComplaintAttachmentCountAggregateOutputType | null
    _avg: ComplaintAttachmentAvgAggregateOutputType | null
    _sum: ComplaintAttachmentSumAggregateOutputType | null
    _min: ComplaintAttachmentMinAggregateOutputType | null
    _max: ComplaintAttachmentMaxAggregateOutputType | null
  }

  type GetComplaintAttachmentGroupByPayload<T extends ComplaintAttachmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintAttachmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintAttachmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintAttachmentGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintAttachmentGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintAttachmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    filename?: boolean
    filepath?: boolean
    mimetype?: boolean
    size?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintAttachment"]>

  export type ComplaintAttachmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    filename?: boolean
    filepath?: boolean
    mimetype?: boolean
    size?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintAttachment"]>

  export type ComplaintAttachmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    filename?: boolean
    filepath?: boolean
    mimetype?: boolean
    size?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintAttachment"]>

  export type ComplaintAttachmentSelectScalar = {
    id?: boolean
    complaintId?: boolean
    filename?: boolean
    filepath?: boolean
    mimetype?: boolean
    size?: boolean
    createdAt?: boolean
  }

  export type ComplaintAttachmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "complaintId" | "filename" | "filepath" | "mimetype" | "size" | "createdAt", ExtArgs["result"]["complaintAttachment"]>
  export type ComplaintAttachmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }
  export type ComplaintAttachmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }
  export type ComplaintAttachmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }

  export type $ComplaintAttachmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplaintAttachment"
    objects: {
      complaint: Prisma.$ComplaintPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      complaintId: string
      filename: string
      filepath: string
      mimetype: string
      size: number
      createdAt: Date
    }, ExtArgs["result"]["complaintAttachment"]>
    composites: {}
  }

  type ComplaintAttachmentGetPayload<S extends boolean | null | undefined | ComplaintAttachmentDefaultArgs> = $Result.GetResult<Prisma.$ComplaintAttachmentPayload, S>

  type ComplaintAttachmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComplaintAttachmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComplaintAttachmentCountAggregateInputType | true
    }

  export interface ComplaintAttachmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplaintAttachment'], meta: { name: 'ComplaintAttachment' } }
    /**
     * Find zero or one ComplaintAttachment that matches the filter.
     * @param {ComplaintAttachmentFindUniqueArgs} args - Arguments to find a ComplaintAttachment
     * @example
     * // Get one ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintAttachmentFindUniqueArgs>(args: SelectSubset<T, ComplaintAttachmentFindUniqueArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ComplaintAttachment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComplaintAttachmentFindUniqueOrThrowArgs} args - Arguments to find a ComplaintAttachment
     * @example
     * // Get one ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintAttachmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintAttachmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintAttachment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentFindFirstArgs} args - Arguments to find a ComplaintAttachment
     * @example
     * // Get one ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintAttachmentFindFirstArgs>(args?: SelectSubset<T, ComplaintAttachmentFindFirstArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintAttachment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentFindFirstOrThrowArgs} args - Arguments to find a ComplaintAttachment
     * @example
     * // Get one ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintAttachmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintAttachmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ComplaintAttachments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplaintAttachments
     * const complaintAttachments = await prisma.complaintAttachment.findMany()
     * 
     * // Get first 10 ComplaintAttachments
     * const complaintAttachments = await prisma.complaintAttachment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintAttachmentWithIdOnly = await prisma.complaintAttachment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintAttachmentFindManyArgs>(args?: SelectSubset<T, ComplaintAttachmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ComplaintAttachment.
     * @param {ComplaintAttachmentCreateArgs} args - Arguments to create a ComplaintAttachment.
     * @example
     * // Create one ComplaintAttachment
     * const ComplaintAttachment = await prisma.complaintAttachment.create({
     *   data: {
     *     // ... data to create a ComplaintAttachment
     *   }
     * })
     * 
     */
    create<T extends ComplaintAttachmentCreateArgs>(args: SelectSubset<T, ComplaintAttachmentCreateArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ComplaintAttachments.
     * @param {ComplaintAttachmentCreateManyArgs} args - Arguments to create many ComplaintAttachments.
     * @example
     * // Create many ComplaintAttachments
     * const complaintAttachment = await prisma.complaintAttachment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintAttachmentCreateManyArgs>(args?: SelectSubset<T, ComplaintAttachmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplaintAttachments and returns the data saved in the database.
     * @param {ComplaintAttachmentCreateManyAndReturnArgs} args - Arguments to create many ComplaintAttachments.
     * @example
     * // Create many ComplaintAttachments
     * const complaintAttachment = await prisma.complaintAttachment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplaintAttachments and only return the `id`
     * const complaintAttachmentWithIdOnly = await prisma.complaintAttachment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintAttachmentCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintAttachmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ComplaintAttachment.
     * @param {ComplaintAttachmentDeleteArgs} args - Arguments to delete one ComplaintAttachment.
     * @example
     * // Delete one ComplaintAttachment
     * const ComplaintAttachment = await prisma.complaintAttachment.delete({
     *   where: {
     *     // ... filter to delete one ComplaintAttachment
     *   }
     * })
     * 
     */
    delete<T extends ComplaintAttachmentDeleteArgs>(args: SelectSubset<T, ComplaintAttachmentDeleteArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ComplaintAttachment.
     * @param {ComplaintAttachmentUpdateArgs} args - Arguments to update one ComplaintAttachment.
     * @example
     * // Update one ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintAttachmentUpdateArgs>(args: SelectSubset<T, ComplaintAttachmentUpdateArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ComplaintAttachments.
     * @param {ComplaintAttachmentDeleteManyArgs} args - Arguments to filter ComplaintAttachments to delete.
     * @example
     * // Delete a few ComplaintAttachments
     * const { count } = await prisma.complaintAttachment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintAttachmentDeleteManyArgs>(args?: SelectSubset<T, ComplaintAttachmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplaintAttachments
     * const complaintAttachment = await prisma.complaintAttachment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintAttachmentUpdateManyArgs>(args: SelectSubset<T, ComplaintAttachmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintAttachments and returns the data updated in the database.
     * @param {ComplaintAttachmentUpdateManyAndReturnArgs} args - Arguments to update many ComplaintAttachments.
     * @example
     * // Update many ComplaintAttachments
     * const complaintAttachment = await prisma.complaintAttachment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ComplaintAttachments and only return the `id`
     * const complaintAttachmentWithIdOnly = await prisma.complaintAttachment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComplaintAttachmentUpdateManyAndReturnArgs>(args: SelectSubset<T, ComplaintAttachmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ComplaintAttachment.
     * @param {ComplaintAttachmentUpsertArgs} args - Arguments to update or create a ComplaintAttachment.
     * @example
     * // Update or create a ComplaintAttachment
     * const complaintAttachment = await prisma.complaintAttachment.upsert({
     *   create: {
     *     // ... data to create a ComplaintAttachment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplaintAttachment we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintAttachmentUpsertArgs>(args: SelectSubset<T, ComplaintAttachmentUpsertArgs<ExtArgs>>): Prisma__ComplaintAttachmentClient<$Result.GetResult<Prisma.$ComplaintAttachmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ComplaintAttachments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentCountArgs} args - Arguments to filter ComplaintAttachments to count.
     * @example
     * // Count the number of ComplaintAttachments
     * const count = await prisma.complaintAttachment.count({
     *   where: {
     *     // ... the filter for the ComplaintAttachments we want to count
     *   }
     * })
    **/
    count<T extends ComplaintAttachmentCountArgs>(
      args?: Subset<T, ComplaintAttachmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintAttachmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplaintAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplaintAttachmentAggregateArgs>(args: Subset<T, ComplaintAttachmentAggregateArgs>): Prisma.PrismaPromise<GetComplaintAttachmentAggregateType<T>>

    /**
     * Group by ComplaintAttachment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintAttachmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComplaintAttachmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintAttachmentGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintAttachmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComplaintAttachmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintAttachmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplaintAttachment model
   */
  readonly fields: ComplaintAttachmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplaintAttachment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintAttachmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complaint<T extends ComplaintDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComplaintDefaultArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ComplaintAttachment model
   */
  interface ComplaintAttachmentFieldRefs {
    readonly id: FieldRef<"ComplaintAttachment", 'String'>
    readonly complaintId: FieldRef<"ComplaintAttachment", 'String'>
    readonly filename: FieldRef<"ComplaintAttachment", 'String'>
    readonly filepath: FieldRef<"ComplaintAttachment", 'String'>
    readonly mimetype: FieldRef<"ComplaintAttachment", 'String'>
    readonly size: FieldRef<"ComplaintAttachment", 'Int'>
    readonly createdAt: FieldRef<"ComplaintAttachment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ComplaintAttachment findUnique
   */
  export type ComplaintAttachmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintAttachment to fetch.
     */
    where: ComplaintAttachmentWhereUniqueInput
  }

  /**
   * ComplaintAttachment findUniqueOrThrow
   */
  export type ComplaintAttachmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintAttachment to fetch.
     */
    where: ComplaintAttachmentWhereUniqueInput
  }

  /**
   * ComplaintAttachment findFirst
   */
  export type ComplaintAttachmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintAttachment to fetch.
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAttachments to fetch.
     */
    orderBy?: ComplaintAttachmentOrderByWithRelationInput | ComplaintAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintAttachments.
     */
    cursor?: ComplaintAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintAttachments.
     */
    distinct?: ComplaintAttachmentScalarFieldEnum | ComplaintAttachmentScalarFieldEnum[]
  }

  /**
   * ComplaintAttachment findFirstOrThrow
   */
  export type ComplaintAttachmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintAttachment to fetch.
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAttachments to fetch.
     */
    orderBy?: ComplaintAttachmentOrderByWithRelationInput | ComplaintAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintAttachments.
     */
    cursor?: ComplaintAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAttachments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintAttachments.
     */
    distinct?: ComplaintAttachmentScalarFieldEnum | ComplaintAttachmentScalarFieldEnum[]
  }

  /**
   * ComplaintAttachment findMany
   */
  export type ComplaintAttachmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintAttachments to fetch.
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintAttachments to fetch.
     */
    orderBy?: ComplaintAttachmentOrderByWithRelationInput | ComplaintAttachmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplaintAttachments.
     */
    cursor?: ComplaintAttachmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintAttachments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintAttachments.
     */
    skip?: number
    distinct?: ComplaintAttachmentScalarFieldEnum | ComplaintAttachmentScalarFieldEnum[]
  }

  /**
   * ComplaintAttachment create
   */
  export type ComplaintAttachmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplaintAttachment.
     */
    data: XOR<ComplaintAttachmentCreateInput, ComplaintAttachmentUncheckedCreateInput>
  }

  /**
   * ComplaintAttachment createMany
   */
  export type ComplaintAttachmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplaintAttachments.
     */
    data: ComplaintAttachmentCreateManyInput | ComplaintAttachmentCreateManyInput[]
  }

  /**
   * ComplaintAttachment createManyAndReturn
   */
  export type ComplaintAttachmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * The data used to create many ComplaintAttachments.
     */
    data: ComplaintAttachmentCreateManyInput | ComplaintAttachmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintAttachment update
   */
  export type ComplaintAttachmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplaintAttachment.
     */
    data: XOR<ComplaintAttachmentUpdateInput, ComplaintAttachmentUncheckedUpdateInput>
    /**
     * Choose, which ComplaintAttachment to update.
     */
    where: ComplaintAttachmentWhereUniqueInput
  }

  /**
   * ComplaintAttachment updateMany
   */
  export type ComplaintAttachmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplaintAttachments.
     */
    data: XOR<ComplaintAttachmentUpdateManyMutationInput, ComplaintAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintAttachments to update
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * Limit how many ComplaintAttachments to update.
     */
    limit?: number
  }

  /**
   * ComplaintAttachment updateManyAndReturn
   */
  export type ComplaintAttachmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * The data used to update ComplaintAttachments.
     */
    data: XOR<ComplaintAttachmentUpdateManyMutationInput, ComplaintAttachmentUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintAttachments to update
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * Limit how many ComplaintAttachments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintAttachment upsert
   */
  export type ComplaintAttachmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplaintAttachment to update in case it exists.
     */
    where: ComplaintAttachmentWhereUniqueInput
    /**
     * In case the ComplaintAttachment found by the `where` argument doesn't exist, create a new ComplaintAttachment with this data.
     */
    create: XOR<ComplaintAttachmentCreateInput, ComplaintAttachmentUncheckedCreateInput>
    /**
     * In case the ComplaintAttachment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintAttachmentUpdateInput, ComplaintAttachmentUncheckedUpdateInput>
  }

  /**
   * ComplaintAttachment delete
   */
  export type ComplaintAttachmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
    /**
     * Filter which ComplaintAttachment to delete.
     */
    where: ComplaintAttachmentWhereUniqueInput
  }

  /**
   * ComplaintAttachment deleteMany
   */
  export type ComplaintAttachmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintAttachments to delete
     */
    where?: ComplaintAttachmentWhereInput
    /**
     * Limit how many ComplaintAttachments to delete.
     */
    limit?: number
  }

  /**
   * ComplaintAttachment without action
   */
  export type ComplaintAttachmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintAttachment
     */
    select?: ComplaintAttachmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintAttachment
     */
    omit?: ComplaintAttachmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintAttachmentInclude<ExtArgs> | null
  }


  /**
   * Model ComplaintMessage
   */

  export type AggregateComplaintMessage = {
    _count: ComplaintMessageCountAggregateOutputType | null
    _min: ComplaintMessageMinAggregateOutputType | null
    _max: ComplaintMessageMaxAggregateOutputType | null
  }

  export type ComplaintMessageMinAggregateOutputType = {
    id: string | null
    complaintId: string | null
    sender: string | null
    message: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type ComplaintMessageMaxAggregateOutputType = {
    id: string | null
    complaintId: string | null
    sender: string | null
    message: string | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type ComplaintMessageCountAggregateOutputType = {
    id: number
    complaintId: number
    sender: number
    message: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type ComplaintMessageMinAggregateInputType = {
    id?: true
    complaintId?: true
    sender?: true
    message?: true
    isRead?: true
    createdAt?: true
  }

  export type ComplaintMessageMaxAggregateInputType = {
    id?: true
    complaintId?: true
    sender?: true
    message?: true
    isRead?: true
    createdAt?: true
  }

  export type ComplaintMessageCountAggregateInputType = {
    id?: true
    complaintId?: true
    sender?: true
    message?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type ComplaintMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintMessage to aggregate.
     */
    where?: ComplaintMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintMessages to fetch.
     */
    orderBy?: ComplaintMessageOrderByWithRelationInput | ComplaintMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComplaintMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ComplaintMessages
    **/
    _count?: true | ComplaintMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComplaintMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComplaintMessageMaxAggregateInputType
  }

  export type GetComplaintMessageAggregateType<T extends ComplaintMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateComplaintMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComplaintMessage[P]>
      : GetScalarType<T[P], AggregateComplaintMessage[P]>
  }




  export type ComplaintMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComplaintMessageWhereInput
    orderBy?: ComplaintMessageOrderByWithAggregationInput | ComplaintMessageOrderByWithAggregationInput[]
    by: ComplaintMessageScalarFieldEnum[] | ComplaintMessageScalarFieldEnum
    having?: ComplaintMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComplaintMessageCountAggregateInputType | true
    _min?: ComplaintMessageMinAggregateInputType
    _max?: ComplaintMessageMaxAggregateInputType
  }

  export type ComplaintMessageGroupByOutputType = {
    id: string
    complaintId: string
    sender: string
    message: string
    isRead: boolean
    createdAt: Date
    _count: ComplaintMessageCountAggregateOutputType | null
    _min: ComplaintMessageMinAggregateOutputType | null
    _max: ComplaintMessageMaxAggregateOutputType | null
  }

  type GetComplaintMessageGroupByPayload<T extends ComplaintMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComplaintMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComplaintMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComplaintMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ComplaintMessageGroupByOutputType[P]>
        }
      >
    >


  export type ComplaintMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    sender?: boolean
    message?: boolean
    isRead?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintMessage"]>

  export type ComplaintMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    sender?: boolean
    message?: boolean
    isRead?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintMessage"]>

  export type ComplaintMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    complaintId?: boolean
    sender?: boolean
    message?: boolean
    isRead?: boolean
    createdAt?: boolean
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["complaintMessage"]>

  export type ComplaintMessageSelectScalar = {
    id?: boolean
    complaintId?: boolean
    sender?: boolean
    message?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type ComplaintMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "complaintId" | "sender" | "message" | "isRead" | "createdAt", ExtArgs["result"]["complaintMessage"]>
  export type ComplaintMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }
  export type ComplaintMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }
  export type ComplaintMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    complaint?: boolean | ComplaintDefaultArgs<ExtArgs>
  }

  export type $ComplaintMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ComplaintMessage"
    objects: {
      complaint: Prisma.$ComplaintPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      complaintId: string
      sender: string
      message: string
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["complaintMessage"]>
    composites: {}
  }

  type ComplaintMessageGetPayload<S extends boolean | null | undefined | ComplaintMessageDefaultArgs> = $Result.GetResult<Prisma.$ComplaintMessagePayload, S>

  type ComplaintMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComplaintMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComplaintMessageCountAggregateInputType | true
    }

  export interface ComplaintMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ComplaintMessage'], meta: { name: 'ComplaintMessage' } }
    /**
     * Find zero or one ComplaintMessage that matches the filter.
     * @param {ComplaintMessageFindUniqueArgs} args - Arguments to find a ComplaintMessage
     * @example
     * // Get one ComplaintMessage
     * const complaintMessage = await prisma.complaintMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComplaintMessageFindUniqueArgs>(args: SelectSubset<T, ComplaintMessageFindUniqueArgs<ExtArgs>>): Prisma__ComplaintMessageClient<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ComplaintMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComplaintMessageFindUniqueOrThrowArgs} args - Arguments to find a ComplaintMessage
     * @example
     * // Get one ComplaintMessage
     * const complaintMessage = await prisma.complaintMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComplaintMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ComplaintMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComplaintMessageClient<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintMessageFindFirstArgs} args - Arguments to find a ComplaintMessage
     * @example
     * // Get one ComplaintMessage
     * const complaintMessage = await prisma.complaintMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComplaintMessageFindFirstArgs>(args?: SelectSubset<T, ComplaintMessageFindFirstArgs<ExtArgs>>): Prisma__ComplaintMessageClient<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ComplaintMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintMessageFindFirstOrThrowArgs} args - Arguments to find a ComplaintMessage
     * @example
     * // Get one ComplaintMessage
     * const complaintMessage = await prisma.complaintMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComplaintMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ComplaintMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComplaintMessageClient<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ComplaintMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ComplaintMessages
     * const complaintMessages = await prisma.complaintMessage.findMany()
     * 
     * // Get first 10 ComplaintMessages
     * const complaintMessages = await prisma.complaintMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const complaintMessageWithIdOnly = await prisma.complaintMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComplaintMessageFindManyArgs>(args?: SelectSubset<T, ComplaintMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ComplaintMessage.
     * @param {ComplaintMessageCreateArgs} args - Arguments to create a ComplaintMessage.
     * @example
     * // Create one ComplaintMessage
     * const ComplaintMessage = await prisma.complaintMessage.create({
     *   data: {
     *     // ... data to create a ComplaintMessage
     *   }
     * })
     * 
     */
    create<T extends ComplaintMessageCreateArgs>(args: SelectSubset<T, ComplaintMessageCreateArgs<ExtArgs>>): Prisma__ComplaintMessageClient<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ComplaintMessages.
     * @param {ComplaintMessageCreateManyArgs} args - Arguments to create many ComplaintMessages.
     * @example
     * // Create many ComplaintMessages
     * const complaintMessage = await prisma.complaintMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComplaintMessageCreateManyArgs>(args?: SelectSubset<T, ComplaintMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ComplaintMessages and returns the data saved in the database.
     * @param {ComplaintMessageCreateManyAndReturnArgs} args - Arguments to create many ComplaintMessages.
     * @example
     * // Create many ComplaintMessages
     * const complaintMessage = await prisma.complaintMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ComplaintMessages and only return the `id`
     * const complaintMessageWithIdOnly = await prisma.complaintMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComplaintMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, ComplaintMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ComplaintMessage.
     * @param {ComplaintMessageDeleteArgs} args - Arguments to delete one ComplaintMessage.
     * @example
     * // Delete one ComplaintMessage
     * const ComplaintMessage = await prisma.complaintMessage.delete({
     *   where: {
     *     // ... filter to delete one ComplaintMessage
     *   }
     * })
     * 
     */
    delete<T extends ComplaintMessageDeleteArgs>(args: SelectSubset<T, ComplaintMessageDeleteArgs<ExtArgs>>): Prisma__ComplaintMessageClient<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ComplaintMessage.
     * @param {ComplaintMessageUpdateArgs} args - Arguments to update one ComplaintMessage.
     * @example
     * // Update one ComplaintMessage
     * const complaintMessage = await prisma.complaintMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComplaintMessageUpdateArgs>(args: SelectSubset<T, ComplaintMessageUpdateArgs<ExtArgs>>): Prisma__ComplaintMessageClient<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ComplaintMessages.
     * @param {ComplaintMessageDeleteManyArgs} args - Arguments to filter ComplaintMessages to delete.
     * @example
     * // Delete a few ComplaintMessages
     * const { count } = await prisma.complaintMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComplaintMessageDeleteManyArgs>(args?: SelectSubset<T, ComplaintMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ComplaintMessages
     * const complaintMessage = await prisma.complaintMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComplaintMessageUpdateManyArgs>(args: SelectSubset<T, ComplaintMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ComplaintMessages and returns the data updated in the database.
     * @param {ComplaintMessageUpdateManyAndReturnArgs} args - Arguments to update many ComplaintMessages.
     * @example
     * // Update many ComplaintMessages
     * const complaintMessage = await prisma.complaintMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ComplaintMessages and only return the `id`
     * const complaintMessageWithIdOnly = await prisma.complaintMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComplaintMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, ComplaintMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ComplaintMessage.
     * @param {ComplaintMessageUpsertArgs} args - Arguments to update or create a ComplaintMessage.
     * @example
     * // Update or create a ComplaintMessage
     * const complaintMessage = await prisma.complaintMessage.upsert({
     *   create: {
     *     // ... data to create a ComplaintMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ComplaintMessage we want to update
     *   }
     * })
     */
    upsert<T extends ComplaintMessageUpsertArgs>(args: SelectSubset<T, ComplaintMessageUpsertArgs<ExtArgs>>): Prisma__ComplaintMessageClient<$Result.GetResult<Prisma.$ComplaintMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ComplaintMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintMessageCountArgs} args - Arguments to filter ComplaintMessages to count.
     * @example
     * // Count the number of ComplaintMessages
     * const count = await prisma.complaintMessage.count({
     *   where: {
     *     // ... the filter for the ComplaintMessages we want to count
     *   }
     * })
    **/
    count<T extends ComplaintMessageCountArgs>(
      args?: Subset<T, ComplaintMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComplaintMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ComplaintMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComplaintMessageAggregateArgs>(args: Subset<T, ComplaintMessageAggregateArgs>): Prisma.PrismaPromise<GetComplaintMessageAggregateType<T>>

    /**
     * Group by ComplaintMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComplaintMessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComplaintMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComplaintMessageGroupByArgs['orderBy'] }
        : { orderBy?: ComplaintMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComplaintMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComplaintMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ComplaintMessage model
   */
  readonly fields: ComplaintMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ComplaintMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComplaintMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    complaint<T extends ComplaintDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComplaintDefaultArgs<ExtArgs>>): Prisma__ComplaintClient<$Result.GetResult<Prisma.$ComplaintPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ComplaintMessage model
   */
  interface ComplaintMessageFieldRefs {
    readonly id: FieldRef<"ComplaintMessage", 'String'>
    readonly complaintId: FieldRef<"ComplaintMessage", 'String'>
    readonly sender: FieldRef<"ComplaintMessage", 'String'>
    readonly message: FieldRef<"ComplaintMessage", 'String'>
    readonly isRead: FieldRef<"ComplaintMessage", 'Boolean'>
    readonly createdAt: FieldRef<"ComplaintMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ComplaintMessage findUnique
   */
  export type ComplaintMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintMessage to fetch.
     */
    where: ComplaintMessageWhereUniqueInput
  }

  /**
   * ComplaintMessage findUniqueOrThrow
   */
  export type ComplaintMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintMessage to fetch.
     */
    where: ComplaintMessageWhereUniqueInput
  }

  /**
   * ComplaintMessage findFirst
   */
  export type ComplaintMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintMessage to fetch.
     */
    where?: ComplaintMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintMessages to fetch.
     */
    orderBy?: ComplaintMessageOrderByWithRelationInput | ComplaintMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintMessages.
     */
    cursor?: ComplaintMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintMessages.
     */
    distinct?: ComplaintMessageScalarFieldEnum | ComplaintMessageScalarFieldEnum[]
  }

  /**
   * ComplaintMessage findFirstOrThrow
   */
  export type ComplaintMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintMessage to fetch.
     */
    where?: ComplaintMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintMessages to fetch.
     */
    orderBy?: ComplaintMessageOrderByWithRelationInput | ComplaintMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ComplaintMessages.
     */
    cursor?: ComplaintMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ComplaintMessages.
     */
    distinct?: ComplaintMessageScalarFieldEnum | ComplaintMessageScalarFieldEnum[]
  }

  /**
   * ComplaintMessage findMany
   */
  export type ComplaintMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageInclude<ExtArgs> | null
    /**
     * Filter, which ComplaintMessages to fetch.
     */
    where?: ComplaintMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ComplaintMessages to fetch.
     */
    orderBy?: ComplaintMessageOrderByWithRelationInput | ComplaintMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ComplaintMessages.
     */
    cursor?: ComplaintMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ComplaintMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ComplaintMessages.
     */
    skip?: number
    distinct?: ComplaintMessageScalarFieldEnum | ComplaintMessageScalarFieldEnum[]
  }

  /**
   * ComplaintMessage create
   */
  export type ComplaintMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a ComplaintMessage.
     */
    data: XOR<ComplaintMessageCreateInput, ComplaintMessageUncheckedCreateInput>
  }

  /**
   * ComplaintMessage createMany
   */
  export type ComplaintMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ComplaintMessages.
     */
    data: ComplaintMessageCreateManyInput | ComplaintMessageCreateManyInput[]
  }

  /**
   * ComplaintMessage createManyAndReturn
   */
  export type ComplaintMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * The data used to create many ComplaintMessages.
     */
    data: ComplaintMessageCreateManyInput | ComplaintMessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintMessage update
   */
  export type ComplaintMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a ComplaintMessage.
     */
    data: XOR<ComplaintMessageUpdateInput, ComplaintMessageUncheckedUpdateInput>
    /**
     * Choose, which ComplaintMessage to update.
     */
    where: ComplaintMessageWhereUniqueInput
  }

  /**
   * ComplaintMessage updateMany
   */
  export type ComplaintMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ComplaintMessages.
     */
    data: XOR<ComplaintMessageUpdateManyMutationInput, ComplaintMessageUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintMessages to update
     */
    where?: ComplaintMessageWhereInput
    /**
     * Limit how many ComplaintMessages to update.
     */
    limit?: number
  }

  /**
   * ComplaintMessage updateManyAndReturn
   */
  export type ComplaintMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * The data used to update ComplaintMessages.
     */
    data: XOR<ComplaintMessageUpdateManyMutationInput, ComplaintMessageUncheckedUpdateManyInput>
    /**
     * Filter which ComplaintMessages to update
     */
    where?: ComplaintMessageWhereInput
    /**
     * Limit how many ComplaintMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ComplaintMessage upsert
   */
  export type ComplaintMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the ComplaintMessage to update in case it exists.
     */
    where: ComplaintMessageWhereUniqueInput
    /**
     * In case the ComplaintMessage found by the `where` argument doesn't exist, create a new ComplaintMessage with this data.
     */
    create: XOR<ComplaintMessageCreateInput, ComplaintMessageUncheckedCreateInput>
    /**
     * In case the ComplaintMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComplaintMessageUpdateInput, ComplaintMessageUncheckedUpdateInput>
  }

  /**
   * ComplaintMessage delete
   */
  export type ComplaintMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageInclude<ExtArgs> | null
    /**
     * Filter which ComplaintMessage to delete.
     */
    where: ComplaintMessageWhereUniqueInput
  }

  /**
   * ComplaintMessage deleteMany
   */
  export type ComplaintMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ComplaintMessages to delete
     */
    where?: ComplaintMessageWhereInput
    /**
     * Limit how many ComplaintMessages to delete.
     */
    limit?: number
  }

  /**
   * ComplaintMessage without action
   */
  export type ComplaintMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComplaintMessage
     */
    select?: ComplaintMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ComplaintMessage
     */
    omit?: ComplaintMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComplaintMessageInclude<ExtArgs> | null
  }


  /**
   * Model CommitteeMember
   */

  export type AggregateCommitteeMember = {
    _count: CommitteeMemberCountAggregateOutputType | null
    _min: CommitteeMemberMinAggregateOutputType | null
    _max: CommitteeMemberMaxAggregateOutputType | null
  }

  export type CommitteeMemberMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommitteeMemberMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommitteeMemberCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CommitteeMemberMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommitteeMemberMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommitteeMemberCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommitteeMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommitteeMember to aggregate.
     */
    where?: CommitteeMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommitteeMembers to fetch.
     */
    orderBy?: CommitteeMemberOrderByWithRelationInput | CommitteeMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommitteeMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommitteeMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommitteeMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommitteeMembers
    **/
    _count?: true | CommitteeMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommitteeMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommitteeMemberMaxAggregateInputType
  }

  export type GetCommitteeMemberAggregateType<T extends CommitteeMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateCommitteeMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommitteeMember[P]>
      : GetScalarType<T[P], AggregateCommitteeMember[P]>
  }




  export type CommitteeMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommitteeMemberWhereInput
    orderBy?: CommitteeMemberOrderByWithAggregationInput | CommitteeMemberOrderByWithAggregationInput[]
    by: CommitteeMemberScalarFieldEnum[] | CommitteeMemberScalarFieldEnum
    having?: CommitteeMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommitteeMemberCountAggregateInputType | true
    _min?: CommitteeMemberMinAggregateInputType
    _max?: CommitteeMemberMaxAggregateInputType
  }

  export type CommitteeMemberGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: CommitteeMemberCountAggregateOutputType | null
    _min: CommitteeMemberMinAggregateOutputType | null
    _max: CommitteeMemberMaxAggregateOutputType | null
  }

  type GetCommitteeMemberGroupByPayload<T extends CommitteeMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommitteeMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommitteeMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommitteeMemberGroupByOutputType[P]>
            : GetScalarType<T[P], CommitteeMemberGroupByOutputType[P]>
        }
      >
    >


  export type CommitteeMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["committeeMember"]>

  export type CommitteeMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["committeeMember"]>

  export type CommitteeMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["committeeMember"]>

  export type CommitteeMemberSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CommitteeMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["committeeMember"]>

  export type $CommitteeMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommitteeMember"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: string
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["committeeMember"]>
    composites: {}
  }

  type CommitteeMemberGetPayload<S extends boolean | null | undefined | CommitteeMemberDefaultArgs> = $Result.GetResult<Prisma.$CommitteeMemberPayload, S>

  type CommitteeMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommitteeMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommitteeMemberCountAggregateInputType | true
    }

  export interface CommitteeMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommitteeMember'], meta: { name: 'CommitteeMember' } }
    /**
     * Find zero or one CommitteeMember that matches the filter.
     * @param {CommitteeMemberFindUniqueArgs} args - Arguments to find a CommitteeMember
     * @example
     * // Get one CommitteeMember
     * const committeeMember = await prisma.committeeMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommitteeMemberFindUniqueArgs>(args: SelectSubset<T, CommitteeMemberFindUniqueArgs<ExtArgs>>): Prisma__CommitteeMemberClient<$Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CommitteeMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommitteeMemberFindUniqueOrThrowArgs} args - Arguments to find a CommitteeMember
     * @example
     * // Get one CommitteeMember
     * const committeeMember = await prisma.committeeMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommitteeMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, CommitteeMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommitteeMemberClient<$Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommitteeMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitteeMemberFindFirstArgs} args - Arguments to find a CommitteeMember
     * @example
     * // Get one CommitteeMember
     * const committeeMember = await prisma.committeeMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommitteeMemberFindFirstArgs>(args?: SelectSubset<T, CommitteeMemberFindFirstArgs<ExtArgs>>): Prisma__CommitteeMemberClient<$Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CommitteeMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitteeMemberFindFirstOrThrowArgs} args - Arguments to find a CommitteeMember
     * @example
     * // Get one CommitteeMember
     * const committeeMember = await prisma.committeeMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommitteeMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, CommitteeMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommitteeMemberClient<$Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CommitteeMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitteeMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommitteeMembers
     * const committeeMembers = await prisma.committeeMember.findMany()
     * 
     * // Get first 10 CommitteeMembers
     * const committeeMembers = await prisma.committeeMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const committeeMemberWithIdOnly = await prisma.committeeMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommitteeMemberFindManyArgs>(args?: SelectSubset<T, CommitteeMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CommitteeMember.
     * @param {CommitteeMemberCreateArgs} args - Arguments to create a CommitteeMember.
     * @example
     * // Create one CommitteeMember
     * const CommitteeMember = await prisma.committeeMember.create({
     *   data: {
     *     // ... data to create a CommitteeMember
     *   }
     * })
     * 
     */
    create<T extends CommitteeMemberCreateArgs>(args: SelectSubset<T, CommitteeMemberCreateArgs<ExtArgs>>): Prisma__CommitteeMemberClient<$Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CommitteeMembers.
     * @param {CommitteeMemberCreateManyArgs} args - Arguments to create many CommitteeMembers.
     * @example
     * // Create many CommitteeMembers
     * const committeeMember = await prisma.committeeMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommitteeMemberCreateManyArgs>(args?: SelectSubset<T, CommitteeMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CommitteeMembers and returns the data saved in the database.
     * @param {CommitteeMemberCreateManyAndReturnArgs} args - Arguments to create many CommitteeMembers.
     * @example
     * // Create many CommitteeMembers
     * const committeeMember = await prisma.committeeMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CommitteeMembers and only return the `id`
     * const committeeMemberWithIdOnly = await prisma.committeeMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommitteeMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, CommitteeMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CommitteeMember.
     * @param {CommitteeMemberDeleteArgs} args - Arguments to delete one CommitteeMember.
     * @example
     * // Delete one CommitteeMember
     * const CommitteeMember = await prisma.committeeMember.delete({
     *   where: {
     *     // ... filter to delete one CommitteeMember
     *   }
     * })
     * 
     */
    delete<T extends CommitteeMemberDeleteArgs>(args: SelectSubset<T, CommitteeMemberDeleteArgs<ExtArgs>>): Prisma__CommitteeMemberClient<$Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CommitteeMember.
     * @param {CommitteeMemberUpdateArgs} args - Arguments to update one CommitteeMember.
     * @example
     * // Update one CommitteeMember
     * const committeeMember = await prisma.committeeMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommitteeMemberUpdateArgs>(args: SelectSubset<T, CommitteeMemberUpdateArgs<ExtArgs>>): Prisma__CommitteeMemberClient<$Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CommitteeMembers.
     * @param {CommitteeMemberDeleteManyArgs} args - Arguments to filter CommitteeMembers to delete.
     * @example
     * // Delete a few CommitteeMembers
     * const { count } = await prisma.committeeMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommitteeMemberDeleteManyArgs>(args?: SelectSubset<T, CommitteeMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommitteeMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitteeMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommitteeMembers
     * const committeeMember = await prisma.committeeMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommitteeMemberUpdateManyArgs>(args: SelectSubset<T, CommitteeMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommitteeMembers and returns the data updated in the database.
     * @param {CommitteeMemberUpdateManyAndReturnArgs} args - Arguments to update many CommitteeMembers.
     * @example
     * // Update many CommitteeMembers
     * const committeeMember = await prisma.committeeMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CommitteeMembers and only return the `id`
     * const committeeMemberWithIdOnly = await prisma.committeeMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommitteeMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, CommitteeMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CommitteeMember.
     * @param {CommitteeMemberUpsertArgs} args - Arguments to update or create a CommitteeMember.
     * @example
     * // Update or create a CommitteeMember
     * const committeeMember = await prisma.committeeMember.upsert({
     *   create: {
     *     // ... data to create a CommitteeMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommitteeMember we want to update
     *   }
     * })
     */
    upsert<T extends CommitteeMemberUpsertArgs>(args: SelectSubset<T, CommitteeMemberUpsertArgs<ExtArgs>>): Prisma__CommitteeMemberClient<$Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CommitteeMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitteeMemberCountArgs} args - Arguments to filter CommitteeMembers to count.
     * @example
     * // Count the number of CommitteeMembers
     * const count = await prisma.committeeMember.count({
     *   where: {
     *     // ... the filter for the CommitteeMembers we want to count
     *   }
     * })
    **/
    count<T extends CommitteeMemberCountArgs>(
      args?: Subset<T, CommitteeMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommitteeMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommitteeMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitteeMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommitteeMemberAggregateArgs>(args: Subset<T, CommitteeMemberAggregateArgs>): Prisma.PrismaPromise<GetCommitteeMemberAggregateType<T>>

    /**
     * Group by CommitteeMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommitteeMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommitteeMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommitteeMemberGroupByArgs['orderBy'] }
        : { orderBy?: CommitteeMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommitteeMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommitteeMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommitteeMember model
   */
  readonly fields: CommitteeMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommitteeMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommitteeMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommitteeMember model
   */
  interface CommitteeMemberFieldRefs {
    readonly id: FieldRef<"CommitteeMember", 'String'>
    readonly name: FieldRef<"CommitteeMember", 'String'>
    readonly email: FieldRef<"CommitteeMember", 'String'>
    readonly password: FieldRef<"CommitteeMember", 'String'>
    readonly role: FieldRef<"CommitteeMember", 'String'>
    readonly active: FieldRef<"CommitteeMember", 'Boolean'>
    readonly createdAt: FieldRef<"CommitteeMember", 'DateTime'>
    readonly updatedAt: FieldRef<"CommitteeMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CommitteeMember findUnique
   */
  export type CommitteeMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
    /**
     * Filter, which CommitteeMember to fetch.
     */
    where: CommitteeMemberWhereUniqueInput
  }

  /**
   * CommitteeMember findUniqueOrThrow
   */
  export type CommitteeMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
    /**
     * Filter, which CommitteeMember to fetch.
     */
    where: CommitteeMemberWhereUniqueInput
  }

  /**
   * CommitteeMember findFirst
   */
  export type CommitteeMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
    /**
     * Filter, which CommitteeMember to fetch.
     */
    where?: CommitteeMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommitteeMembers to fetch.
     */
    orderBy?: CommitteeMemberOrderByWithRelationInput | CommitteeMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommitteeMembers.
     */
    cursor?: CommitteeMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommitteeMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommitteeMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommitteeMembers.
     */
    distinct?: CommitteeMemberScalarFieldEnum | CommitteeMemberScalarFieldEnum[]
  }

  /**
   * CommitteeMember findFirstOrThrow
   */
  export type CommitteeMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
    /**
     * Filter, which CommitteeMember to fetch.
     */
    where?: CommitteeMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommitteeMembers to fetch.
     */
    orderBy?: CommitteeMemberOrderByWithRelationInput | CommitteeMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommitteeMembers.
     */
    cursor?: CommitteeMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommitteeMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommitteeMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommitteeMembers.
     */
    distinct?: CommitteeMemberScalarFieldEnum | CommitteeMemberScalarFieldEnum[]
  }

  /**
   * CommitteeMember findMany
   */
  export type CommitteeMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
    /**
     * Filter, which CommitteeMembers to fetch.
     */
    where?: CommitteeMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommitteeMembers to fetch.
     */
    orderBy?: CommitteeMemberOrderByWithRelationInput | CommitteeMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommitteeMembers.
     */
    cursor?: CommitteeMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommitteeMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommitteeMembers.
     */
    skip?: number
    distinct?: CommitteeMemberScalarFieldEnum | CommitteeMemberScalarFieldEnum[]
  }

  /**
   * CommitteeMember create
   */
  export type CommitteeMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
    /**
     * The data needed to create a CommitteeMember.
     */
    data: XOR<CommitteeMemberCreateInput, CommitteeMemberUncheckedCreateInput>
  }

  /**
   * CommitteeMember createMany
   */
  export type CommitteeMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommitteeMembers.
     */
    data: CommitteeMemberCreateManyInput | CommitteeMemberCreateManyInput[]
  }

  /**
   * CommitteeMember createManyAndReturn
   */
  export type CommitteeMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
    /**
     * The data used to create many CommitteeMembers.
     */
    data: CommitteeMemberCreateManyInput | CommitteeMemberCreateManyInput[]
  }

  /**
   * CommitteeMember update
   */
  export type CommitteeMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
    /**
     * The data needed to update a CommitteeMember.
     */
    data: XOR<CommitteeMemberUpdateInput, CommitteeMemberUncheckedUpdateInput>
    /**
     * Choose, which CommitteeMember to update.
     */
    where: CommitteeMemberWhereUniqueInput
  }

  /**
   * CommitteeMember updateMany
   */
  export type CommitteeMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommitteeMembers.
     */
    data: XOR<CommitteeMemberUpdateManyMutationInput, CommitteeMemberUncheckedUpdateManyInput>
    /**
     * Filter which CommitteeMembers to update
     */
    where?: CommitteeMemberWhereInput
    /**
     * Limit how many CommitteeMembers to update.
     */
    limit?: number
  }

  /**
   * CommitteeMember updateManyAndReturn
   */
  export type CommitteeMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
    /**
     * The data used to update CommitteeMembers.
     */
    data: XOR<CommitteeMemberUpdateManyMutationInput, CommitteeMemberUncheckedUpdateManyInput>
    /**
     * Filter which CommitteeMembers to update
     */
    where?: CommitteeMemberWhereInput
    /**
     * Limit how many CommitteeMembers to update.
     */
    limit?: number
  }

  /**
   * CommitteeMember upsert
   */
  export type CommitteeMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
    /**
     * The filter to search for the CommitteeMember to update in case it exists.
     */
    where: CommitteeMemberWhereUniqueInput
    /**
     * In case the CommitteeMember found by the `where` argument doesn't exist, create a new CommitteeMember with this data.
     */
    create: XOR<CommitteeMemberCreateInput, CommitteeMemberUncheckedCreateInput>
    /**
     * In case the CommitteeMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommitteeMemberUpdateInput, CommitteeMemberUncheckedUpdateInput>
  }

  /**
   * CommitteeMember delete
   */
  export type CommitteeMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
    /**
     * Filter which CommitteeMember to delete.
     */
    where: CommitteeMemberWhereUniqueInput
  }

  /**
   * CommitteeMember deleteMany
   */
  export type CommitteeMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommitteeMembers to delete
     */
    where?: CommitteeMemberWhereInput
    /**
     * Limit how many CommitteeMembers to delete.
     */
    limit?: number
  }

  /**
   * CommitteeMember without action
   */
  export type CommitteeMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommitteeMember
     */
    select?: CommitteeMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CommitteeMember
     */
    omit?: CommitteeMemberOmit<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    userId: string | null
    details: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    userId: string | null
    details: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    action: number
    entityType: number
    entityId: number
    userId: number
    details: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    action?: true
    entityType?: true
    entityId?: true
    userId?: true
    details?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    action?: true
    entityType?: true
    entityId?: true
    userId?: true
    details?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    action?: true
    entityType?: true
    entityId?: true
    userId?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    action: string
    entityType: string
    entityId: string
    userId: string | null
    details: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    userId?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    userId?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    userId?: boolean
    details?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    userId?: boolean
    details?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "entityType" | "entityId" | "userId" | "details" | "createdAt", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      action: string
      entityType: string
      entityId: string
      userId: string | null
      details: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ComplaintScalarFieldEnum: {
    id: 'id',
    protocol: 'protocol',
    type: 'type',
    unit: 'unit',
    sector: 'sector',
    shift: 'shift',
    occurrenceDate: 'occurrenceDate',
    accusedName: 'accusedName',
    accusedPosition: 'accusedPosition',
    description: 'description',
    witnesses: 'witnesses',
    isAnonymous: 'isAnonymous',
    reporterName: 'reporterName',
    reporterEmail: 'reporterEmail',
    reporterPhone: 'reporterPhone',
    wantsResponse: 'wantsResponse',
    status: 'status',
    priority: 'priority',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    closedAt: 'closedAt',
    assignedTo: 'assignedTo'
  };

  export type ComplaintScalarFieldEnum = (typeof ComplaintScalarFieldEnum)[keyof typeof ComplaintScalarFieldEnum]


  export const ComplaintAttachmentScalarFieldEnum: {
    id: 'id',
    complaintId: 'complaintId',
    filename: 'filename',
    filepath: 'filepath',
    mimetype: 'mimetype',
    size: 'size',
    createdAt: 'createdAt'
  };

  export type ComplaintAttachmentScalarFieldEnum = (typeof ComplaintAttachmentScalarFieldEnum)[keyof typeof ComplaintAttachmentScalarFieldEnum]


  export const ComplaintMessageScalarFieldEnum: {
    id: 'id',
    complaintId: 'complaintId',
    sender: 'sender',
    message: 'message',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type ComplaintMessageScalarFieldEnum = (typeof ComplaintMessageScalarFieldEnum)[keyof typeof ComplaintMessageScalarFieldEnum]


  export const CommitteeMemberScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CommitteeMemberScalarFieldEnum = (typeof CommitteeMemberScalarFieldEnum)[keyof typeof CommitteeMemberScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    userId: 'userId',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ComplaintWhereInput = {
    AND?: ComplaintWhereInput | ComplaintWhereInput[]
    OR?: ComplaintWhereInput[]
    NOT?: ComplaintWhereInput | ComplaintWhereInput[]
    id?: StringFilter<"Complaint"> | string
    protocol?: StringFilter<"Complaint"> | string
    type?: StringFilter<"Complaint"> | string
    unit?: StringNullableFilter<"Complaint"> | string | null
    sector?: StringNullableFilter<"Complaint"> | string | null
    shift?: StringNullableFilter<"Complaint"> | string | null
    occurrenceDate?: DateTimeNullableFilter<"Complaint"> | Date | string | null
    accusedName?: StringNullableFilter<"Complaint"> | string | null
    accusedPosition?: StringNullableFilter<"Complaint"> | string | null
    description?: StringFilter<"Complaint"> | string
    witnesses?: StringNullableFilter<"Complaint"> | string | null
    isAnonymous?: BoolFilter<"Complaint"> | boolean
    reporterName?: StringNullableFilter<"Complaint"> | string | null
    reporterEmail?: StringNullableFilter<"Complaint"> | string | null
    reporterPhone?: StringNullableFilter<"Complaint"> | string | null
    wantsResponse?: BoolFilter<"Complaint"> | boolean
    status?: StringFilter<"Complaint"> | string
    priority?: StringFilter<"Complaint"> | string
    createdAt?: DateTimeFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeFilter<"Complaint"> | Date | string
    closedAt?: DateTimeNullableFilter<"Complaint"> | Date | string | null
    assignedTo?: StringNullableFilter<"Complaint"> | string | null
    attachments?: ComplaintAttachmentListRelationFilter
    messages?: ComplaintMessageListRelationFilter
  }

  export type ComplaintOrderByWithRelationInput = {
    id?: SortOrder
    protocol?: SortOrder
    type?: SortOrder
    unit?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    shift?: SortOrderInput | SortOrder
    occurrenceDate?: SortOrderInput | SortOrder
    accusedName?: SortOrderInput | SortOrder
    accusedPosition?: SortOrderInput | SortOrder
    description?: SortOrder
    witnesses?: SortOrderInput | SortOrder
    isAnonymous?: SortOrder
    reporterName?: SortOrderInput | SortOrder
    reporterEmail?: SortOrderInput | SortOrder
    reporterPhone?: SortOrderInput | SortOrder
    wantsResponse?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    assignedTo?: SortOrderInput | SortOrder
    attachments?: ComplaintAttachmentOrderByRelationAggregateInput
    messages?: ComplaintMessageOrderByRelationAggregateInput
  }

  export type ComplaintWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    protocol?: string
    AND?: ComplaintWhereInput | ComplaintWhereInput[]
    OR?: ComplaintWhereInput[]
    NOT?: ComplaintWhereInput | ComplaintWhereInput[]
    type?: StringFilter<"Complaint"> | string
    unit?: StringNullableFilter<"Complaint"> | string | null
    sector?: StringNullableFilter<"Complaint"> | string | null
    shift?: StringNullableFilter<"Complaint"> | string | null
    occurrenceDate?: DateTimeNullableFilter<"Complaint"> | Date | string | null
    accusedName?: StringNullableFilter<"Complaint"> | string | null
    accusedPosition?: StringNullableFilter<"Complaint"> | string | null
    description?: StringFilter<"Complaint"> | string
    witnesses?: StringNullableFilter<"Complaint"> | string | null
    isAnonymous?: BoolFilter<"Complaint"> | boolean
    reporterName?: StringNullableFilter<"Complaint"> | string | null
    reporterEmail?: StringNullableFilter<"Complaint"> | string | null
    reporterPhone?: StringNullableFilter<"Complaint"> | string | null
    wantsResponse?: BoolFilter<"Complaint"> | boolean
    status?: StringFilter<"Complaint"> | string
    priority?: StringFilter<"Complaint"> | string
    createdAt?: DateTimeFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeFilter<"Complaint"> | Date | string
    closedAt?: DateTimeNullableFilter<"Complaint"> | Date | string | null
    assignedTo?: StringNullableFilter<"Complaint"> | string | null
    attachments?: ComplaintAttachmentListRelationFilter
    messages?: ComplaintMessageListRelationFilter
  }, "id" | "protocol">

  export type ComplaintOrderByWithAggregationInput = {
    id?: SortOrder
    protocol?: SortOrder
    type?: SortOrder
    unit?: SortOrderInput | SortOrder
    sector?: SortOrderInput | SortOrder
    shift?: SortOrderInput | SortOrder
    occurrenceDate?: SortOrderInput | SortOrder
    accusedName?: SortOrderInput | SortOrder
    accusedPosition?: SortOrderInput | SortOrder
    description?: SortOrder
    witnesses?: SortOrderInput | SortOrder
    isAnonymous?: SortOrder
    reporterName?: SortOrderInput | SortOrder
    reporterEmail?: SortOrderInput | SortOrder
    reporterPhone?: SortOrderInput | SortOrder
    wantsResponse?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrderInput | SortOrder
    assignedTo?: SortOrderInput | SortOrder
    _count?: ComplaintCountOrderByAggregateInput
    _max?: ComplaintMaxOrderByAggregateInput
    _min?: ComplaintMinOrderByAggregateInput
  }

  export type ComplaintScalarWhereWithAggregatesInput = {
    AND?: ComplaintScalarWhereWithAggregatesInput | ComplaintScalarWhereWithAggregatesInput[]
    OR?: ComplaintScalarWhereWithAggregatesInput[]
    NOT?: ComplaintScalarWhereWithAggregatesInput | ComplaintScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Complaint"> | string
    protocol?: StringWithAggregatesFilter<"Complaint"> | string
    type?: StringWithAggregatesFilter<"Complaint"> | string
    unit?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    sector?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    shift?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    occurrenceDate?: DateTimeNullableWithAggregatesFilter<"Complaint"> | Date | string | null
    accusedName?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    accusedPosition?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    description?: StringWithAggregatesFilter<"Complaint"> | string
    witnesses?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    isAnonymous?: BoolWithAggregatesFilter<"Complaint"> | boolean
    reporterName?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    reporterEmail?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    reporterPhone?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
    wantsResponse?: BoolWithAggregatesFilter<"Complaint"> | boolean
    status?: StringWithAggregatesFilter<"Complaint"> | string
    priority?: StringWithAggregatesFilter<"Complaint"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Complaint"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Complaint"> | Date | string
    closedAt?: DateTimeNullableWithAggregatesFilter<"Complaint"> | Date | string | null
    assignedTo?: StringNullableWithAggregatesFilter<"Complaint"> | string | null
  }

  export type ComplaintAttachmentWhereInput = {
    AND?: ComplaintAttachmentWhereInput | ComplaintAttachmentWhereInput[]
    OR?: ComplaintAttachmentWhereInput[]
    NOT?: ComplaintAttachmentWhereInput | ComplaintAttachmentWhereInput[]
    id?: StringFilter<"ComplaintAttachment"> | string
    complaintId?: StringFilter<"ComplaintAttachment"> | string
    filename?: StringFilter<"ComplaintAttachment"> | string
    filepath?: StringFilter<"ComplaintAttachment"> | string
    mimetype?: StringFilter<"ComplaintAttachment"> | string
    size?: IntFilter<"ComplaintAttachment"> | number
    createdAt?: DateTimeFilter<"ComplaintAttachment"> | Date | string
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
  }

  export type ComplaintAttachmentOrderByWithRelationInput = {
    id?: SortOrder
    complaintId?: SortOrder
    filename?: SortOrder
    filepath?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    complaint?: ComplaintOrderByWithRelationInput
  }

  export type ComplaintAttachmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComplaintAttachmentWhereInput | ComplaintAttachmentWhereInput[]
    OR?: ComplaintAttachmentWhereInput[]
    NOT?: ComplaintAttachmentWhereInput | ComplaintAttachmentWhereInput[]
    complaintId?: StringFilter<"ComplaintAttachment"> | string
    filename?: StringFilter<"ComplaintAttachment"> | string
    filepath?: StringFilter<"ComplaintAttachment"> | string
    mimetype?: StringFilter<"ComplaintAttachment"> | string
    size?: IntFilter<"ComplaintAttachment"> | number
    createdAt?: DateTimeFilter<"ComplaintAttachment"> | Date | string
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
  }, "id">

  export type ComplaintAttachmentOrderByWithAggregationInput = {
    id?: SortOrder
    complaintId?: SortOrder
    filename?: SortOrder
    filepath?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
    _count?: ComplaintAttachmentCountOrderByAggregateInput
    _avg?: ComplaintAttachmentAvgOrderByAggregateInput
    _max?: ComplaintAttachmentMaxOrderByAggregateInput
    _min?: ComplaintAttachmentMinOrderByAggregateInput
    _sum?: ComplaintAttachmentSumOrderByAggregateInput
  }

  export type ComplaintAttachmentScalarWhereWithAggregatesInput = {
    AND?: ComplaintAttachmentScalarWhereWithAggregatesInput | ComplaintAttachmentScalarWhereWithAggregatesInput[]
    OR?: ComplaintAttachmentScalarWhereWithAggregatesInput[]
    NOT?: ComplaintAttachmentScalarWhereWithAggregatesInput | ComplaintAttachmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComplaintAttachment"> | string
    complaintId?: StringWithAggregatesFilter<"ComplaintAttachment"> | string
    filename?: StringWithAggregatesFilter<"ComplaintAttachment"> | string
    filepath?: StringWithAggregatesFilter<"ComplaintAttachment"> | string
    mimetype?: StringWithAggregatesFilter<"ComplaintAttachment"> | string
    size?: IntWithAggregatesFilter<"ComplaintAttachment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ComplaintAttachment"> | Date | string
  }

  export type ComplaintMessageWhereInput = {
    AND?: ComplaintMessageWhereInput | ComplaintMessageWhereInput[]
    OR?: ComplaintMessageWhereInput[]
    NOT?: ComplaintMessageWhereInput | ComplaintMessageWhereInput[]
    id?: StringFilter<"ComplaintMessage"> | string
    complaintId?: StringFilter<"ComplaintMessage"> | string
    sender?: StringFilter<"ComplaintMessage"> | string
    message?: StringFilter<"ComplaintMessage"> | string
    isRead?: BoolFilter<"ComplaintMessage"> | boolean
    createdAt?: DateTimeFilter<"ComplaintMessage"> | Date | string
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
  }

  export type ComplaintMessageOrderByWithRelationInput = {
    id?: SortOrder
    complaintId?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    complaint?: ComplaintOrderByWithRelationInput
  }

  export type ComplaintMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ComplaintMessageWhereInput | ComplaintMessageWhereInput[]
    OR?: ComplaintMessageWhereInput[]
    NOT?: ComplaintMessageWhereInput | ComplaintMessageWhereInput[]
    complaintId?: StringFilter<"ComplaintMessage"> | string
    sender?: StringFilter<"ComplaintMessage"> | string
    message?: StringFilter<"ComplaintMessage"> | string
    isRead?: BoolFilter<"ComplaintMessage"> | boolean
    createdAt?: DateTimeFilter<"ComplaintMessage"> | Date | string
    complaint?: XOR<ComplaintScalarRelationFilter, ComplaintWhereInput>
  }, "id">

  export type ComplaintMessageOrderByWithAggregationInput = {
    id?: SortOrder
    complaintId?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: ComplaintMessageCountOrderByAggregateInput
    _max?: ComplaintMessageMaxOrderByAggregateInput
    _min?: ComplaintMessageMinOrderByAggregateInput
  }

  export type ComplaintMessageScalarWhereWithAggregatesInput = {
    AND?: ComplaintMessageScalarWhereWithAggregatesInput | ComplaintMessageScalarWhereWithAggregatesInput[]
    OR?: ComplaintMessageScalarWhereWithAggregatesInput[]
    NOT?: ComplaintMessageScalarWhereWithAggregatesInput | ComplaintMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ComplaintMessage"> | string
    complaintId?: StringWithAggregatesFilter<"ComplaintMessage"> | string
    sender?: StringWithAggregatesFilter<"ComplaintMessage"> | string
    message?: StringWithAggregatesFilter<"ComplaintMessage"> | string
    isRead?: BoolWithAggregatesFilter<"ComplaintMessage"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ComplaintMessage"> | Date | string
  }

  export type CommitteeMemberWhereInput = {
    AND?: CommitteeMemberWhereInput | CommitteeMemberWhereInput[]
    OR?: CommitteeMemberWhereInput[]
    NOT?: CommitteeMemberWhereInput | CommitteeMemberWhereInput[]
    id?: StringFilter<"CommitteeMember"> | string
    name?: StringFilter<"CommitteeMember"> | string
    email?: StringFilter<"CommitteeMember"> | string
    password?: StringFilter<"CommitteeMember"> | string
    role?: StringFilter<"CommitteeMember"> | string
    active?: BoolFilter<"CommitteeMember"> | boolean
    createdAt?: DateTimeFilter<"CommitteeMember"> | Date | string
    updatedAt?: DateTimeFilter<"CommitteeMember"> | Date | string
  }

  export type CommitteeMemberOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommitteeMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: CommitteeMemberWhereInput | CommitteeMemberWhereInput[]
    OR?: CommitteeMemberWhereInput[]
    NOT?: CommitteeMemberWhereInput | CommitteeMemberWhereInput[]
    name?: StringFilter<"CommitteeMember"> | string
    password?: StringFilter<"CommitteeMember"> | string
    role?: StringFilter<"CommitteeMember"> | string
    active?: BoolFilter<"CommitteeMember"> | boolean
    createdAt?: DateTimeFilter<"CommitteeMember"> | Date | string
    updatedAt?: DateTimeFilter<"CommitteeMember"> | Date | string
  }, "id" | "email">

  export type CommitteeMemberOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommitteeMemberCountOrderByAggregateInput
    _max?: CommitteeMemberMaxOrderByAggregateInput
    _min?: CommitteeMemberMinOrderByAggregateInput
  }

  export type CommitteeMemberScalarWhereWithAggregatesInput = {
    AND?: CommitteeMemberScalarWhereWithAggregatesInput | CommitteeMemberScalarWhereWithAggregatesInput[]
    OR?: CommitteeMemberScalarWhereWithAggregatesInput[]
    NOT?: CommitteeMemberScalarWhereWithAggregatesInput | CommitteeMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CommitteeMember"> | string
    name?: StringWithAggregatesFilter<"CommitteeMember"> | string
    email?: StringWithAggregatesFilter<"CommitteeMember"> | string
    password?: StringWithAggregatesFilter<"CommitteeMember"> | string
    role?: StringWithAggregatesFilter<"CommitteeMember"> | string
    active?: BoolWithAggregatesFilter<"CommitteeMember"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CommitteeMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CommitteeMember"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    details?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    userId?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    details?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    userId?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    details?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type ComplaintCreateInput = {
    id?: string
    protocol: string
    type: string
    unit?: string | null
    sector?: string | null
    shift?: string | null
    occurrenceDate?: Date | string | null
    accusedName?: string | null
    accusedPosition?: string | null
    description: string
    witnesses?: string | null
    isAnonymous?: boolean
    reporterName?: string | null
    reporterEmail?: string | null
    reporterPhone?: string | null
    wantsResponse?: boolean
    status?: string
    priority?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    assignedTo?: string | null
    attachments?: ComplaintAttachmentCreateNestedManyWithoutComplaintInput
    messages?: ComplaintMessageCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUncheckedCreateInput = {
    id?: string
    protocol: string
    type: string
    unit?: string | null
    sector?: string | null
    shift?: string | null
    occurrenceDate?: Date | string | null
    accusedName?: string | null
    accusedPosition?: string | null
    description: string
    witnesses?: string | null
    isAnonymous?: boolean
    reporterName?: string | null
    reporterEmail?: string | null
    reporterPhone?: string | null
    wantsResponse?: boolean
    status?: string
    priority?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    assignedTo?: string | null
    attachments?: ComplaintAttachmentUncheckedCreateNestedManyWithoutComplaintInput
    messages?: ComplaintMessageUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    shift?: NullableStringFieldUpdateOperationsInput | string | null
    occurrenceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accusedName?: NullableStringFieldUpdateOperationsInput | string | null
    accusedPosition?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    witnesses?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    reporterName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reporterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    wantsResponse?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: ComplaintAttachmentUpdateManyWithoutComplaintNestedInput
    messages?: ComplaintMessageUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    shift?: NullableStringFieldUpdateOperationsInput | string | null
    occurrenceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accusedName?: NullableStringFieldUpdateOperationsInput | string | null
    accusedPosition?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    witnesses?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    reporterName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reporterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    wantsResponse?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: ComplaintAttachmentUncheckedUpdateManyWithoutComplaintNestedInput
    messages?: ComplaintMessageUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintCreateManyInput = {
    id?: string
    protocol: string
    type: string
    unit?: string | null
    sector?: string | null
    shift?: string | null
    occurrenceDate?: Date | string | null
    accusedName?: string | null
    accusedPosition?: string | null
    description: string
    witnesses?: string | null
    isAnonymous?: boolean
    reporterName?: string | null
    reporterEmail?: string | null
    reporterPhone?: string | null
    wantsResponse?: boolean
    status?: string
    priority?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    assignedTo?: string | null
  }

  export type ComplaintUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    shift?: NullableStringFieldUpdateOperationsInput | string | null
    occurrenceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accusedName?: NullableStringFieldUpdateOperationsInput | string | null
    accusedPosition?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    witnesses?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    reporterName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reporterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    wantsResponse?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComplaintUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    shift?: NullableStringFieldUpdateOperationsInput | string | null
    occurrenceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accusedName?: NullableStringFieldUpdateOperationsInput | string | null
    accusedPosition?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    witnesses?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    reporterName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reporterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    wantsResponse?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ComplaintAttachmentCreateInput = {
    id?: string
    filename: string
    filepath: string
    mimetype: string
    size: number
    createdAt?: Date | string
    complaint: ComplaintCreateNestedOneWithoutAttachmentsInput
  }

  export type ComplaintAttachmentUncheckedCreateInput = {
    id?: string
    complaintId: string
    filename: string
    filepath: string
    mimetype: string
    size: number
    createdAt?: Date | string
  }

  export type ComplaintAttachmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filepath?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaint?: ComplaintUpdateOneRequiredWithoutAttachmentsNestedInput
  }

  export type ComplaintAttachmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    complaintId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filepath?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintAttachmentCreateManyInput = {
    id?: string
    complaintId: string
    filename: string
    filepath: string
    mimetype: string
    size: number
    createdAt?: Date | string
  }

  export type ComplaintAttachmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filepath?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintAttachmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    complaintId?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filepath?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintMessageCreateInput = {
    id?: string
    sender: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
    complaint: ComplaintCreateNestedOneWithoutMessagesInput
  }

  export type ComplaintMessageUncheckedCreateInput = {
    id?: string
    complaintId: string
    sender: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ComplaintMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    complaint?: ComplaintUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type ComplaintMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    complaintId?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintMessageCreateManyInput = {
    id?: string
    complaintId: string
    sender: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ComplaintMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    complaintId?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitteeMemberCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommitteeMemberUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommitteeMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitteeMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitteeMemberCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommitteeMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommitteeMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    userId?: string | null
    details?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    userId?: string | null
    details?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    action: string
    entityType: string
    entityId: string
    userId?: string | null
    details?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ComplaintAttachmentListRelationFilter = {
    every?: ComplaintAttachmentWhereInput
    some?: ComplaintAttachmentWhereInput
    none?: ComplaintAttachmentWhereInput
  }

  export type ComplaintMessageListRelationFilter = {
    every?: ComplaintMessageWhereInput
    some?: ComplaintMessageWhereInput
    none?: ComplaintMessageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ComplaintAttachmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComplaintMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComplaintCountOrderByAggregateInput = {
    id?: SortOrder
    protocol?: SortOrder
    type?: SortOrder
    unit?: SortOrder
    sector?: SortOrder
    shift?: SortOrder
    occurrenceDate?: SortOrder
    accusedName?: SortOrder
    accusedPosition?: SortOrder
    description?: SortOrder
    witnesses?: SortOrder
    isAnonymous?: SortOrder
    reporterName?: SortOrder
    reporterEmail?: SortOrder
    reporterPhone?: SortOrder
    wantsResponse?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    assignedTo?: SortOrder
  }

  export type ComplaintMaxOrderByAggregateInput = {
    id?: SortOrder
    protocol?: SortOrder
    type?: SortOrder
    unit?: SortOrder
    sector?: SortOrder
    shift?: SortOrder
    occurrenceDate?: SortOrder
    accusedName?: SortOrder
    accusedPosition?: SortOrder
    description?: SortOrder
    witnesses?: SortOrder
    isAnonymous?: SortOrder
    reporterName?: SortOrder
    reporterEmail?: SortOrder
    reporterPhone?: SortOrder
    wantsResponse?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    assignedTo?: SortOrder
  }

  export type ComplaintMinOrderByAggregateInput = {
    id?: SortOrder
    protocol?: SortOrder
    type?: SortOrder
    unit?: SortOrder
    sector?: SortOrder
    shift?: SortOrder
    occurrenceDate?: SortOrder
    accusedName?: SortOrder
    accusedPosition?: SortOrder
    description?: SortOrder
    witnesses?: SortOrder
    isAnonymous?: SortOrder
    reporterName?: SortOrder
    reporterEmail?: SortOrder
    reporterPhone?: SortOrder
    wantsResponse?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    closedAt?: SortOrder
    assignedTo?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ComplaintScalarRelationFilter = {
    is?: ComplaintWhereInput
    isNot?: ComplaintWhereInput
  }

  export type ComplaintAttachmentCountOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    filename?: SortOrder
    filepath?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplaintAttachmentAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type ComplaintAttachmentMaxOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    filename?: SortOrder
    filepath?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplaintAttachmentMinOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    filename?: SortOrder
    filepath?: SortOrder
    mimetype?: SortOrder
    size?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplaintAttachmentSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ComplaintMessageCountOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplaintMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplaintMessageMinOrderByAggregateInput = {
    id?: SortOrder
    complaintId?: SortOrder
    sender?: SortOrder
    message?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type CommitteeMemberCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommitteeMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommitteeMemberMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    userId?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type ComplaintAttachmentCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput> | ComplaintAttachmentCreateWithoutComplaintInput[] | ComplaintAttachmentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintAttachmentCreateOrConnectWithoutComplaintInput | ComplaintAttachmentCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintAttachmentCreateManyComplaintInputEnvelope
    connect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
  }

  export type ComplaintMessageCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintMessageCreateWithoutComplaintInput, ComplaintMessageUncheckedCreateWithoutComplaintInput> | ComplaintMessageCreateWithoutComplaintInput[] | ComplaintMessageUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintMessageCreateOrConnectWithoutComplaintInput | ComplaintMessageCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintMessageCreateManyComplaintInputEnvelope
    connect?: ComplaintMessageWhereUniqueInput | ComplaintMessageWhereUniqueInput[]
  }

  export type ComplaintAttachmentUncheckedCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput> | ComplaintAttachmentCreateWithoutComplaintInput[] | ComplaintAttachmentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintAttachmentCreateOrConnectWithoutComplaintInput | ComplaintAttachmentCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintAttachmentCreateManyComplaintInputEnvelope
    connect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
  }

  export type ComplaintMessageUncheckedCreateNestedManyWithoutComplaintInput = {
    create?: XOR<ComplaintMessageCreateWithoutComplaintInput, ComplaintMessageUncheckedCreateWithoutComplaintInput> | ComplaintMessageCreateWithoutComplaintInput[] | ComplaintMessageUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintMessageCreateOrConnectWithoutComplaintInput | ComplaintMessageCreateOrConnectWithoutComplaintInput[]
    createMany?: ComplaintMessageCreateManyComplaintInputEnvelope
    connect?: ComplaintMessageWhereUniqueInput | ComplaintMessageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ComplaintAttachmentUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput> | ComplaintAttachmentCreateWithoutComplaintInput[] | ComplaintAttachmentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintAttachmentCreateOrConnectWithoutComplaintInput | ComplaintAttachmentCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintAttachmentUpsertWithWhereUniqueWithoutComplaintInput | ComplaintAttachmentUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintAttachmentCreateManyComplaintInputEnvelope
    set?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    disconnect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    delete?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    connect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    update?: ComplaintAttachmentUpdateWithWhereUniqueWithoutComplaintInput | ComplaintAttachmentUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintAttachmentUpdateManyWithWhereWithoutComplaintInput | ComplaintAttachmentUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintAttachmentScalarWhereInput | ComplaintAttachmentScalarWhereInput[]
  }

  export type ComplaintMessageUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintMessageCreateWithoutComplaintInput, ComplaintMessageUncheckedCreateWithoutComplaintInput> | ComplaintMessageCreateWithoutComplaintInput[] | ComplaintMessageUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintMessageCreateOrConnectWithoutComplaintInput | ComplaintMessageCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintMessageUpsertWithWhereUniqueWithoutComplaintInput | ComplaintMessageUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintMessageCreateManyComplaintInputEnvelope
    set?: ComplaintMessageWhereUniqueInput | ComplaintMessageWhereUniqueInput[]
    disconnect?: ComplaintMessageWhereUniqueInput | ComplaintMessageWhereUniqueInput[]
    delete?: ComplaintMessageWhereUniqueInput | ComplaintMessageWhereUniqueInput[]
    connect?: ComplaintMessageWhereUniqueInput | ComplaintMessageWhereUniqueInput[]
    update?: ComplaintMessageUpdateWithWhereUniqueWithoutComplaintInput | ComplaintMessageUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintMessageUpdateManyWithWhereWithoutComplaintInput | ComplaintMessageUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintMessageScalarWhereInput | ComplaintMessageScalarWhereInput[]
  }

  export type ComplaintAttachmentUncheckedUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput> | ComplaintAttachmentCreateWithoutComplaintInput[] | ComplaintAttachmentUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintAttachmentCreateOrConnectWithoutComplaintInput | ComplaintAttachmentCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintAttachmentUpsertWithWhereUniqueWithoutComplaintInput | ComplaintAttachmentUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintAttachmentCreateManyComplaintInputEnvelope
    set?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    disconnect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    delete?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    connect?: ComplaintAttachmentWhereUniqueInput | ComplaintAttachmentWhereUniqueInput[]
    update?: ComplaintAttachmentUpdateWithWhereUniqueWithoutComplaintInput | ComplaintAttachmentUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintAttachmentUpdateManyWithWhereWithoutComplaintInput | ComplaintAttachmentUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintAttachmentScalarWhereInput | ComplaintAttachmentScalarWhereInput[]
  }

  export type ComplaintMessageUncheckedUpdateManyWithoutComplaintNestedInput = {
    create?: XOR<ComplaintMessageCreateWithoutComplaintInput, ComplaintMessageUncheckedCreateWithoutComplaintInput> | ComplaintMessageCreateWithoutComplaintInput[] | ComplaintMessageUncheckedCreateWithoutComplaintInput[]
    connectOrCreate?: ComplaintMessageCreateOrConnectWithoutComplaintInput | ComplaintMessageCreateOrConnectWithoutComplaintInput[]
    upsert?: ComplaintMessageUpsertWithWhereUniqueWithoutComplaintInput | ComplaintMessageUpsertWithWhereUniqueWithoutComplaintInput[]
    createMany?: ComplaintMessageCreateManyComplaintInputEnvelope
    set?: ComplaintMessageWhereUniqueInput | ComplaintMessageWhereUniqueInput[]
    disconnect?: ComplaintMessageWhereUniqueInput | ComplaintMessageWhereUniqueInput[]
    delete?: ComplaintMessageWhereUniqueInput | ComplaintMessageWhereUniqueInput[]
    connect?: ComplaintMessageWhereUniqueInput | ComplaintMessageWhereUniqueInput[]
    update?: ComplaintMessageUpdateWithWhereUniqueWithoutComplaintInput | ComplaintMessageUpdateWithWhereUniqueWithoutComplaintInput[]
    updateMany?: ComplaintMessageUpdateManyWithWhereWithoutComplaintInput | ComplaintMessageUpdateManyWithWhereWithoutComplaintInput[]
    deleteMany?: ComplaintMessageScalarWhereInput | ComplaintMessageScalarWhereInput[]
  }

  export type ComplaintCreateNestedOneWithoutAttachmentsInput = {
    create?: XOR<ComplaintCreateWithoutAttachmentsInput, ComplaintUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutAttachmentsInput
    connect?: ComplaintWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ComplaintUpdateOneRequiredWithoutAttachmentsNestedInput = {
    create?: XOR<ComplaintCreateWithoutAttachmentsInput, ComplaintUncheckedCreateWithoutAttachmentsInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutAttachmentsInput
    upsert?: ComplaintUpsertWithoutAttachmentsInput
    connect?: ComplaintWhereUniqueInput
    update?: XOR<XOR<ComplaintUpdateToOneWithWhereWithoutAttachmentsInput, ComplaintUpdateWithoutAttachmentsInput>, ComplaintUncheckedUpdateWithoutAttachmentsInput>
  }

  export type ComplaintCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ComplaintCreateWithoutMessagesInput, ComplaintUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutMessagesInput
    connect?: ComplaintWhereUniqueInput
  }

  export type ComplaintUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ComplaintCreateWithoutMessagesInput, ComplaintUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ComplaintCreateOrConnectWithoutMessagesInput
    upsert?: ComplaintUpsertWithoutMessagesInput
    connect?: ComplaintWhereUniqueInput
    update?: XOR<XOR<ComplaintUpdateToOneWithWhereWithoutMessagesInput, ComplaintUpdateWithoutMessagesInput>, ComplaintUncheckedUpdateWithoutMessagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ComplaintAttachmentCreateWithoutComplaintInput = {
    id?: string
    filename: string
    filepath: string
    mimetype: string
    size: number
    createdAt?: Date | string
  }

  export type ComplaintAttachmentUncheckedCreateWithoutComplaintInput = {
    id?: string
    filename: string
    filepath: string
    mimetype: string
    size: number
    createdAt?: Date | string
  }

  export type ComplaintAttachmentCreateOrConnectWithoutComplaintInput = {
    where: ComplaintAttachmentWhereUniqueInput
    create: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintAttachmentCreateManyComplaintInputEnvelope = {
    data: ComplaintAttachmentCreateManyComplaintInput | ComplaintAttachmentCreateManyComplaintInput[]
  }

  export type ComplaintMessageCreateWithoutComplaintInput = {
    id?: string
    sender: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ComplaintMessageUncheckedCreateWithoutComplaintInput = {
    id?: string
    sender: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ComplaintMessageCreateOrConnectWithoutComplaintInput = {
    where: ComplaintMessageWhereUniqueInput
    create: XOR<ComplaintMessageCreateWithoutComplaintInput, ComplaintMessageUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintMessageCreateManyComplaintInputEnvelope = {
    data: ComplaintMessageCreateManyComplaintInput | ComplaintMessageCreateManyComplaintInput[]
  }

  export type ComplaintAttachmentUpsertWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintAttachmentWhereUniqueInput
    update: XOR<ComplaintAttachmentUpdateWithoutComplaintInput, ComplaintAttachmentUncheckedUpdateWithoutComplaintInput>
    create: XOR<ComplaintAttachmentCreateWithoutComplaintInput, ComplaintAttachmentUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintAttachmentUpdateWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintAttachmentWhereUniqueInput
    data: XOR<ComplaintAttachmentUpdateWithoutComplaintInput, ComplaintAttachmentUncheckedUpdateWithoutComplaintInput>
  }

  export type ComplaintAttachmentUpdateManyWithWhereWithoutComplaintInput = {
    where: ComplaintAttachmentScalarWhereInput
    data: XOR<ComplaintAttachmentUpdateManyMutationInput, ComplaintAttachmentUncheckedUpdateManyWithoutComplaintInput>
  }

  export type ComplaintAttachmentScalarWhereInput = {
    AND?: ComplaintAttachmentScalarWhereInput | ComplaintAttachmentScalarWhereInput[]
    OR?: ComplaintAttachmentScalarWhereInput[]
    NOT?: ComplaintAttachmentScalarWhereInput | ComplaintAttachmentScalarWhereInput[]
    id?: StringFilter<"ComplaintAttachment"> | string
    complaintId?: StringFilter<"ComplaintAttachment"> | string
    filename?: StringFilter<"ComplaintAttachment"> | string
    filepath?: StringFilter<"ComplaintAttachment"> | string
    mimetype?: StringFilter<"ComplaintAttachment"> | string
    size?: IntFilter<"ComplaintAttachment"> | number
    createdAt?: DateTimeFilter<"ComplaintAttachment"> | Date | string
  }

  export type ComplaintMessageUpsertWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintMessageWhereUniqueInput
    update: XOR<ComplaintMessageUpdateWithoutComplaintInput, ComplaintMessageUncheckedUpdateWithoutComplaintInput>
    create: XOR<ComplaintMessageCreateWithoutComplaintInput, ComplaintMessageUncheckedCreateWithoutComplaintInput>
  }

  export type ComplaintMessageUpdateWithWhereUniqueWithoutComplaintInput = {
    where: ComplaintMessageWhereUniqueInput
    data: XOR<ComplaintMessageUpdateWithoutComplaintInput, ComplaintMessageUncheckedUpdateWithoutComplaintInput>
  }

  export type ComplaintMessageUpdateManyWithWhereWithoutComplaintInput = {
    where: ComplaintMessageScalarWhereInput
    data: XOR<ComplaintMessageUpdateManyMutationInput, ComplaintMessageUncheckedUpdateManyWithoutComplaintInput>
  }

  export type ComplaintMessageScalarWhereInput = {
    AND?: ComplaintMessageScalarWhereInput | ComplaintMessageScalarWhereInput[]
    OR?: ComplaintMessageScalarWhereInput[]
    NOT?: ComplaintMessageScalarWhereInput | ComplaintMessageScalarWhereInput[]
    id?: StringFilter<"ComplaintMessage"> | string
    complaintId?: StringFilter<"ComplaintMessage"> | string
    sender?: StringFilter<"ComplaintMessage"> | string
    message?: StringFilter<"ComplaintMessage"> | string
    isRead?: BoolFilter<"ComplaintMessage"> | boolean
    createdAt?: DateTimeFilter<"ComplaintMessage"> | Date | string
  }

  export type ComplaintCreateWithoutAttachmentsInput = {
    id?: string
    protocol: string
    type: string
    unit?: string | null
    sector?: string | null
    shift?: string | null
    occurrenceDate?: Date | string | null
    accusedName?: string | null
    accusedPosition?: string | null
    description: string
    witnesses?: string | null
    isAnonymous?: boolean
    reporterName?: string | null
    reporterEmail?: string | null
    reporterPhone?: string | null
    wantsResponse?: boolean
    status?: string
    priority?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    assignedTo?: string | null
    messages?: ComplaintMessageCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUncheckedCreateWithoutAttachmentsInput = {
    id?: string
    protocol: string
    type: string
    unit?: string | null
    sector?: string | null
    shift?: string | null
    occurrenceDate?: Date | string | null
    accusedName?: string | null
    accusedPosition?: string | null
    description: string
    witnesses?: string | null
    isAnonymous?: boolean
    reporterName?: string | null
    reporterEmail?: string | null
    reporterPhone?: string | null
    wantsResponse?: boolean
    status?: string
    priority?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    assignedTo?: string | null
    messages?: ComplaintMessageUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutAttachmentsInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutAttachmentsInput, ComplaintUncheckedCreateWithoutAttachmentsInput>
  }

  export type ComplaintUpsertWithoutAttachmentsInput = {
    update: XOR<ComplaintUpdateWithoutAttachmentsInput, ComplaintUncheckedUpdateWithoutAttachmentsInput>
    create: XOR<ComplaintCreateWithoutAttachmentsInput, ComplaintUncheckedCreateWithoutAttachmentsInput>
    where?: ComplaintWhereInput
  }

  export type ComplaintUpdateToOneWithWhereWithoutAttachmentsInput = {
    where?: ComplaintWhereInput
    data: XOR<ComplaintUpdateWithoutAttachmentsInput, ComplaintUncheckedUpdateWithoutAttachmentsInput>
  }

  export type ComplaintUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    shift?: NullableStringFieldUpdateOperationsInput | string | null
    occurrenceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accusedName?: NullableStringFieldUpdateOperationsInput | string | null
    accusedPosition?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    witnesses?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    reporterName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reporterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    wantsResponse?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: ComplaintMessageUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutAttachmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    shift?: NullableStringFieldUpdateOperationsInput | string | null
    occurrenceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accusedName?: NullableStringFieldUpdateOperationsInput | string | null
    accusedPosition?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    witnesses?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    reporterName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reporterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    wantsResponse?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    messages?: ComplaintMessageUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintCreateWithoutMessagesInput = {
    id?: string
    protocol: string
    type: string
    unit?: string | null
    sector?: string | null
    shift?: string | null
    occurrenceDate?: Date | string | null
    accusedName?: string | null
    accusedPosition?: string | null
    description: string
    witnesses?: string | null
    isAnonymous?: boolean
    reporterName?: string | null
    reporterEmail?: string | null
    reporterPhone?: string | null
    wantsResponse?: boolean
    status?: string
    priority?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    assignedTo?: string | null
    attachments?: ComplaintAttachmentCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintUncheckedCreateWithoutMessagesInput = {
    id?: string
    protocol: string
    type: string
    unit?: string | null
    sector?: string | null
    shift?: string | null
    occurrenceDate?: Date | string | null
    accusedName?: string | null
    accusedPosition?: string | null
    description: string
    witnesses?: string | null
    isAnonymous?: boolean
    reporterName?: string | null
    reporterEmail?: string | null
    reporterPhone?: string | null
    wantsResponse?: boolean
    status?: string
    priority?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    closedAt?: Date | string | null
    assignedTo?: string | null
    attachments?: ComplaintAttachmentUncheckedCreateNestedManyWithoutComplaintInput
  }

  export type ComplaintCreateOrConnectWithoutMessagesInput = {
    where: ComplaintWhereUniqueInput
    create: XOR<ComplaintCreateWithoutMessagesInput, ComplaintUncheckedCreateWithoutMessagesInput>
  }

  export type ComplaintUpsertWithoutMessagesInput = {
    update: XOR<ComplaintUpdateWithoutMessagesInput, ComplaintUncheckedUpdateWithoutMessagesInput>
    create: XOR<ComplaintCreateWithoutMessagesInput, ComplaintUncheckedCreateWithoutMessagesInput>
    where?: ComplaintWhereInput
  }

  export type ComplaintUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ComplaintWhereInput
    data: XOR<ComplaintUpdateWithoutMessagesInput, ComplaintUncheckedUpdateWithoutMessagesInput>
  }

  export type ComplaintUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    shift?: NullableStringFieldUpdateOperationsInput | string | null
    occurrenceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accusedName?: NullableStringFieldUpdateOperationsInput | string | null
    accusedPosition?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    witnesses?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    reporterName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reporterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    wantsResponse?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: ComplaintAttachmentUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    protocol?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    shift?: NullableStringFieldUpdateOperationsInput | string | null
    occurrenceDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    accusedName?: NullableStringFieldUpdateOperationsInput | string | null
    accusedPosition?: NullableStringFieldUpdateOperationsInput | string | null
    description?: StringFieldUpdateOperationsInput | string
    witnesses?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    reporterName?: NullableStringFieldUpdateOperationsInput | string | null
    reporterEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reporterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    wantsResponse?: BoolFieldUpdateOperationsInput | boolean
    status?: StringFieldUpdateOperationsInput | string
    priority?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    closedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    assignedTo?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: ComplaintAttachmentUncheckedUpdateManyWithoutComplaintNestedInput
  }

  export type ComplaintAttachmentCreateManyComplaintInput = {
    id?: string
    filename: string
    filepath: string
    mimetype: string
    size: number
    createdAt?: Date | string
  }

  export type ComplaintMessageCreateManyComplaintInput = {
    id?: string
    sender: string
    message: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type ComplaintAttachmentUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filepath?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintAttachmentUncheckedUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filepath?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintAttachmentUncheckedUpdateManyWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    filename?: StringFieldUpdateOperationsInput | string
    filepath?: StringFieldUpdateOperationsInput | string
    mimetype?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintMessageUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintMessageUncheckedUpdateWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ComplaintMessageUncheckedUpdateManyWithoutComplaintInput = {
    id?: StringFieldUpdateOperationsInput | string
    sender?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}