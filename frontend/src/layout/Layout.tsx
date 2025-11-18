import "react";
//UserButton用于可以点击查看用户的资料的组件，并允许你退出登录
import { SignedIn,SignedOut,UserButton } from "@clerk/clerk-react";
import { Outlet,Link,Navigate } from "react-router-dom";

export function Layout() {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

        {/* 头部导航栏 */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo 和标题 */}
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">C</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                            Code Challenge Generator
                        </h1>
                    </div>

                    {/* 导航菜单 */}
                    <nav className="flex items-center space-x-1 sm:space-x-2">
                        <SignedIn>
                            <Link
                                to="/"
                                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 ease-in-out"
                            >
                                生成挑战
                            </Link>
                            <Link
                                to="/history"
                                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 ease-in-out"
                            >
                                历史记录
                            </Link>
                            <div className="ml-2 pl-8 border-l border-slate-200">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-8 h-8",
                                            userButtonPopoverCard: "shadow-lg border-0",
                                            userButtonPopoverActionButton: "hover:bg-slate-50"
                                        }
                                    }}
                                />
                            </div>
                        </SignedIn>
                    </nav>
                </div>
            </div>
        </header>

        {/* 主内容区域，渲染子路由组件 */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
            <SignedOut>
                {/* 如果用户未登录，则重定向到登录页面  replace直接在当前标签页*/}
                <Navigate to="/sign-in" replace={true} />
            </SignedOut>

            <SignedIn>
                {/* 如果用户已登录，则渲染子路由组件 */}
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <Outlet />
                </div>
            </SignedIn>
        </main>

    </div>
}