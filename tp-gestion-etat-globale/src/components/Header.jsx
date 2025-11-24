import { useCharacters } from "../context/CharactersContext";
function Header() {
  const { likedIds} = useCharacters();
    return (
        <header className="header">
            <h1>Rick and Morty Characters (Context)</h1>
            <div className="likes-badge">
                {likedIds.length} personnages likés
            </div>
        </header>
    );
}
export default Header;