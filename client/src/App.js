import {AuthPage, TodoPage} from './pages';
import {useLocation, Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
function App() {
  const loggedIn = useSelector(state => state.loggedIn)
  const path = useLocation().pathname;
  console.log(loggedIn);
  return (
    <>
      <Route exact path='/auth' component={AuthPage}/>
      <Route exact path='/todos' component={TodoPage}/>
      {!loggedIn && (path !== '/auth') ? <Redirect to="/auth"/> : null}
      {loggedIn && (path !== '/todos') ? <Redirect to="/todos"/> : null}
    </>
  );
}

export default App;
