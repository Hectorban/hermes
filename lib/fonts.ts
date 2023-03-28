import { Playfair_Display, Source_Sans_Pro } from 'next/font/google'

export const main_font = Source_Sans_Pro({
  subsets: ["latin"],
  weight: "400"
})

export const secondary_font = Playfair_Display({
  subsets: ["latin"],
  weight: "400"
})
