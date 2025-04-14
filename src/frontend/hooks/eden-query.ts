import {
  DefaultError,
  useMutation,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export type EdenMutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = unknown
> = {
  /**
   * The key for the mutation, used to cache the result
   */
  key: string[];
  /**
   * The function that will be called to perform the mutation
   */
  throwOnError?: boolean | ((error: unknown) => boolean);
} & Omit<
  UseMutationOptions<TData, TError, TVariables, unknown>,
  "mutationKey" | "mutationFn"
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEdenMutation<T extends (...args: any) => any>(
  treatyApi: T,
  options: EdenMutationOptions<Awaited<ReturnType<T>>>
) {
  type FunctionVariables = Parameters<T>[0];
  type FunctionReturnType = Awaited<ReturnType<T>>;

  const mutate = useMutation<
    FunctionReturnType,
    DefaultError,
    FunctionVariables
  >({
    mutationKey: options.key,
    mutationFn: (variables: FunctionVariables) => treatyApi(variables),

    // extra options
    ...options,
  });

  return mutate;
}

export type EdenQueryOptions<
  TFnData = unknown,
  TError = unknown,
  TData = unknown
> = {
  /**
   * The key for the query, used to cache the result
   */
  key: string[];
  /**
   * The function that will be called to perform the query
   */
} & Omit<UseQueryOptions<TFnData, TError, TData>, "queryKey" | "queryFn">;
