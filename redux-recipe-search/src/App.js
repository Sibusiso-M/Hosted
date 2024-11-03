import "./App.css";
import RecipeSearchPage from "./components/RecipeSearchPage/RecipeSearchPage.js";

export default function App() {
  return (
    <div data-testid="app-wrapper" className="App">
      <RecipeSearchPage />
    </div>
  );
}
