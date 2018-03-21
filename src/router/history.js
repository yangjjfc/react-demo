import createHistory from 'history/createBrowserHistory';
const history = createHistory();
export const unlisten = history.listen((location, action) => {
    console.log(location);
});
export default history;