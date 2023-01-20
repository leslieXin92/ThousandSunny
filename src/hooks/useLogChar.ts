import { leslie } from '@/assets/char'

const love = () => {
  const begin = new Date('2022-01-18').getTime()
  const now = new Date().getTime()
  const beenTogether = parseInt(String((now - begin) / 1000 / 60 / 60 / 24)) + 1
  return `Leslie and Cabbage have been together for ${beenTogether} days!`
}

const useLogChar = () => {
  console.log(leslie)
  console.log(love())
}

export default useLogChar
