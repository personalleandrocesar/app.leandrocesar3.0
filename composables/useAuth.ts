export default function useAuth() {
  async function login({ email, password }: { email: string, password: string }) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: 'Erro' }))
      throw new Error(err?.message || 'Falha ao autenticar')
    }
    const data = await res.json()
    // aqui normalmente salvaria token (cookie HttpOnly ideal)
    // localStorage.setItem('token', data.token)
    return data
  }

  return { login }
}

