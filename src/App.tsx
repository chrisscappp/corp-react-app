import { RootStoreContext } from "./hooks/rootStoreContext"
import RootStore from "store/root-store"
import AppLayout from "./layouts/AppLayout"

function App() {
    return (
        <RootStoreContext.Provider value = {new RootStore()}>
            <div className="App">
                <AppLayout/>
            </div>
        </RootStoreContext.Provider>
    )
}

export default App
