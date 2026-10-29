/// <reference types="vite/client" />
declare module '*as=picture' {
  import type { Picture } from 'vite-imagetools'
  const picture: Picture
  export default picture
}