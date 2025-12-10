import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar";


function App(){
  return(
    <div>
    <Navbar/>
      
      {/* <section id="home">This a Home Page</section>
      <section id="plans">This is a Plans Page</section>
      <section id="login">This is a Login Page</section>
      <section id="signup">This is a Signup Page</section> */}
    <Sidebar/>
    <Footer/>

</div>
  );
}

export default App;