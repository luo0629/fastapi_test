import "react";
import { SignIn,SignUp,SignedIn,SignedOut } from "@clerk/clerk-react";

export function AuthenticationPage() {
    return <div className="min-h-scree flex items-center justify-center">
        <div className="w-full max-w-md p-6">
            {/* 用户未登录时显示该容器中的内容 */}
            <SignedOut>
                {/* 显示登录和注册按钮 点击跳转到对应页面 */}
                <SignIn routing="path" path="/sign-in"/>
                <SignUp routing="path" path="/sign-up"/>
            </SignedOut>
            {/* 用户已登录时显示该容器中的内容 */}
            <SignedIn>
                <div className="text-center p-8  rounded-lg shadow-sm border">
                    <h2 className="text-xl font-semibold text-gray-800">您已成功登录！</h2>
                </div>
            </SignedIn>
        </div>
    </div>
}