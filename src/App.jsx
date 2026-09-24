import ProductList from './components/ProductList'
import ShoppingCart from './components/ShoppingCart'

function App() {
  return (
    <div className="container-fluid">
      <header className="py-3 mb-4">
        <h1 className="text-center">🎮 GameZone</h1>
      </header>

      <main className="container">
        <ProductList />
        <ShoppingCart />
      </main>
    </div>
  )
}

export default App