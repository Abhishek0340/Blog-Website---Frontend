import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryList from '../components/CategoryList';
import PostCard from '../components/PostCard';
import Hero from '../components/Hero';
import { Helmet } from "react-helmet";


const Home = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Home | trendyblogs</title>
        <meta name="description" content="Welcome to the trendyblogs homepage. Discover trending posts, categories, and join our blogging community." />
        <meta name="keywords" content="blog, homepage, trending, categories, posts, community" />
        <meta property="og:title" content="Home | trendyblogs" />
        <meta property="og:description" content="Discover trending posts and categories on our blog homepage." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourblogwebsite.com" />
      
      </Helmet>
      <Navbar />
      <div className="w-full" style={{ background: '#fff' }}>
        <div className=" mx-auto">
          <Hero />
        </div>
      </div>
      <div className="min-h-screen flex flex-col" style={{ background: '#fff' }}>
        <main className="flex-1 container mx-auto px-4 py-8">
          <CategoryList />
          <div id="post" className=" " style={{}}>
            <PostCard />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Home;
