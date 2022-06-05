import { Navbar } from "../components"
import { Footer } from "../components/Footer"

export const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="container xl:max-w-6xl mx-auto p-5 text-center border-t">
      <h2 className="text-4xl font-semibold mt-24">Boost your productivity with one tool</h2>
      <p className="text-gray-600 text-sm m-4">Plan and organize your notes on any platform for free</p>
      <button className="btn-primary px-6 py-2">Sign Up Now</button>
    </div>
    <Footer/>
    </>
  )
}
