import { createContext, useState, type ReactNode } from "react"
import type { Children } from "../types/Children"
import type { User } from "../types/UserType"
import type { ContextUserType } from "../types/ContextType"


const UserContext = createContext<ContextUserType|null>(null)

function ContextProvider({ children }: Children): ReactNode {
    const [user, setUser] = useState<User | null>({
        id: 0,
        agentCode: "",
        fullName: "",
        role: "",
    })
    return (
        <div>
            <UserContext.Provider value={{user, setUser }} >
                {children}
            </UserContext.Provider>
        </div>
    )
}

export { ContextProvider, UserContext}
