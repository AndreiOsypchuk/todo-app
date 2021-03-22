import './App.css';
import {Route, Redirect, useLocation} from 'react-router-dom';
import {AuthPage, TodoPage} from './pages';
import {useSelector} from 'react-redux'
function App() {
  const loggedIn = useSelector(store => store.loggedIn)
  const path = useLocation().pathname;
  return (
    <>
      <Route exact path="/" component={AuthPage} />
      <Route exact path="/login" component={AuthPage}/>
      <Route exact path='/todos' component={TodoPage}/>
      {loggedIn && (path === '/' || path === '/login') ? <Redirect to='/todos'/>: null}
      {!loggedIn && (path !== '/' || path !== '/login') ? <Redirect to='/'/>: null}
    </>
  );
}

export default App;
