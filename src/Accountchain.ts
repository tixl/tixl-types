import { Blockchain } from './Blockchain'
import { Stealthchain } from './Stealthchain'

export type Accountchain = Blockchain & {
  stealthchains: Stealthchain[]

  addStealthchain(stealthchain: Stealthchain): Accountchain
}
