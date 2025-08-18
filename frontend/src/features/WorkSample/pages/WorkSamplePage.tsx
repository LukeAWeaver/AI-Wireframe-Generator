import { Input } from '@components/Input'
import styled from '@emotion/styled'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  border: 4px solid #ccc;
  border-radius: 8px;
  gap: 1rem;
  box-sizing: border-box;
`

const SubmitButton = styled('button')`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #1976d2;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #1565c0;
  }
`

const StatusTag = styled('div')`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  background-color: #efefef;
`

const ErrorText = styled('div')`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #b00020;
`

const FormError = styled('div')`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #b00020;
`

interface IFormValues {
  username: string
  email: string
}

const queryProfile = async (): Promise<IFormValues> => {
  await new Promise<void>(resolve => setTimeout(resolve, 2000))
  return { username: 'current_username', email: 'current_email@example.com' }
}

const mutateProfile = async (payload: IFormValues): Promise<IFormValues> => {
  await new Promise<void>(resolve => setTimeout(resolve, 500))
  return payload
}

const WorkSamplePage = (): JSX.Element => {
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<IFormValues>({
    defaultValues: { username: '', email: '' }
  })

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: queryProfile,
    staleTime: 5000
  })

  const profileMutation = useMutation({
    mutationFn: mutateProfile,
    onSuccess: updated => {
      queryClient.setQueryData(['profile'], updated)
      reset(updated, { keepDirtyValues: true })
    }
  })

  const onSubmit = async (values: IFormValues): Promise<void> => {
    await profileMutation.mutateAsync(values)
  }

  useEffect(() => {
    if (profileQuery.data) {
      reset(profileQuery.data, { keepDirtyValues: true })
    }
  }, [profileQuery.data, reset])

  const disableInputs: boolean = profileMutation.isPending || isSubmitting

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="username"
        rules={{
          required: 'Username is required',
          minLength: { value: 3, message: 'Username must be at least 3 characters' }
        }}
        render={({ field }) => (
          <>
            <Input {...field} disabled={disableInputs} aria-invalid={!!errors.username} />
            {errors.username && <ErrorText>{errors.username.message as string}</ErrorText>}
          </>
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
        }}
        render={({ field }) => (
          <>
            <Input {...field} disabled={disableInputs} aria-invalid={!!errors.email} />
            {errors.email && <ErrorText>{errors.email.message as string}</ErrorText>}
          </>
        )}
      />

      <StatusTag>
        {profileQuery.isLoading
          ? 'Loading…'
          : profileQuery.data && (!profileQuery.isFetchedAfterMount || profileQuery.isFetching)
          ? 'From cache'
          : 'From network'}
        {profileQuery.isFetching && !profileQuery.isLoading ? ' (refreshing)' : ''}
        {profileQuery.isError ? ' • Load failed' : ''}
      </StatusTag>

      {profileMutation.isError ? <FormError>Save failed</FormError> : null}

      <SubmitButton type="submit" disabled={disableInputs}>
        {disableInputs ? 'Saving…' : 'Submit'}
      </SubmitButton>
    </StyledForm>
  )
}

export default WorkSamplePage
