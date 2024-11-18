import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

export type UseMutation<TData, TVariables, TContext = unknown> = (
  options?: Pick<
    UseMutationOptions<
      Awaited<TData>,
      Error,
      TVariables,
      TContext
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  >,
) => UseMutationResult<Awaited<TData>, Error, TVariables>;
