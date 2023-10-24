import { leslie } from '@/assets/char'

const love = () => {
  const begin = new Date('2022-01-18').getTime()
  const now = new Date().getTime()
  const beenTogether = parseInt(String((now - begin) / 1000 / 60 / 60 / 24)) + 1
  return `Leslie and Cabbage have been together for \x1b[41m\x1b[30m\x1b[1m ${beenTogether} \x1b[0m days!`
}

const logChar = () => {
  console.log(leslie)
  console.log(love())
}

export default logChar
