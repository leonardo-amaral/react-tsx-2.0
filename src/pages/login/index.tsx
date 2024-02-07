import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { useAuth } from '../../context/AuthContext'

const newLoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type NewLoginFormInputs = z.infer<typeof newLoginFormSchema>

function Login() {
  const { register, handleSubmit, reset } = useForm<NewLoginFormInputs>({
    resolver: zodResolver(newLoginFormSchema)
  })

  const { login } = useAuth()

  async function handleMakeLogin(data: NewLoginFormInputs) {
    const { email, password } = data
    login({ email, password, channel: 'ui' })
    reset()
  }

  return (
    <>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(handleMakeLogin)}>
        <div>
          <p>Email: </p>
          <input
            type="email"
            placeholder="jhondoe@gmail.com"
            {...register('email')}
          />
        </div>
        <div>
          <p>Password:</p>
          <input placeholder="*******" {...register('password')} />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login
