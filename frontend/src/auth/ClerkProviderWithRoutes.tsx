import { ClerkProvider } from "@clerk/clerk-react"
import { BrowserRouter } from "react-router-dom"
import type { ReactNode } from "react"

//用于身份验证

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

interface ClerkProviderWithRoutesProps {
    children: ReactNode
}

export default function ClerkProviderWithRoutes({children}: ClerkProviderWithRoutesProps){
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <BrowserRouter>{children}</BrowserRouter>
        </ClerkProvider>
    )
}