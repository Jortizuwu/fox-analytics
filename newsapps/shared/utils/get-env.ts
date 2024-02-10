type Tname = 'EXPO_PUBLIC_API_KEY'

export const getEnv = (name: Tname) => {
  const env = process.env[name]

  if (!env) {
    throw new Error(`Env ${name} no set`)
  }

  return env
}
