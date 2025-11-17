import './App.css'
import ClerkProviderWithRoutes from './auth/ClerkProviderWithRoutes'
//导入路由
import { Route,Routes } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { ChallengeGenerator } from './challenge/ChallengeGenerator'
import { HistoryPanel } from './history/HIstoryPanel'
import { AuthenticationPage } from './auth/AuthenticationPage'

function App() {


  return (
    <>
      <ClerkProviderWithRoutes>
        <Routes>
          {/* 只要是sign-in路径就会渲染AuthenticationPage组件 /*是防止有额外参数 */}
          <Route path='/sign-in/*' element={<AuthenticationPage />} />
          {/* 注册不需要携带参数,sign-up会跳转同一个认证页面但Clerk会自动处理显示正确的页面 */}
          <Route path='/sign-up' element={<AuthenticationPage />} />
          {/* 我们将渲染一个布局 意味着这个路由下的所有子路由都会被Layout包裹
          这样可以确保布局的一致性
          例如导航栏 页脚等 */}
          <Route element={<Layout />}>
              <Route path='/' element={<ChallengeGenerator />} />
              <Route path='/history' element={<HistoryPanel />} />
          </Route>
        </Routes>
      </ClerkProviderWithRoutes>
    </>
  )
}

export default App
