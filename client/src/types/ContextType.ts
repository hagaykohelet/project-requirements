import type { Dispatch, SetStateAction } from "react"
import type { User } from "./UserType"

export type ContextUserType = {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
}