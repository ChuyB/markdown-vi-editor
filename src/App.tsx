import styles from "styles/app.module.scss"
import Editor from './components/Editor/';

const App: React.FC  = () => {

  return (
    <div className={styles.App}>
      <Editor />
    </div>
  )
}

export default App
