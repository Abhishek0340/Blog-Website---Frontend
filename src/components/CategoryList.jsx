import React from 'react';
import { Link } from 'react-router-dom';


const categories = [
  { name: 'Nature', slug: 'nature' , icon: "🌳"},
  { name: 'Travel', slug: 'travel' , icon: "✈️"},
  { name: 'Science', slug: 'science' , icon: "🔬"},
  { name: 'Technology', slug: 'technology',  icon: "💻"},
  { name: 'Finance', slug: 'finance', icon: "₹"},
];


const CategoryList = () => (
  <div className=''>
    
  <div className="flex flex-wrap gap-3 justify-center my-5">
    {categories.map(cat => (
      <Link
        key={cat.slug}
        to={`/category/${cat.slug}`}
        className="inline-flex items-center gap-3 px-6 py-2 rounded-md font-semibold shadow-sm border border-blue-100 hover:bg-gray-100  transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <span className="text-xl">{cat.icon}</span>
        <span className="text-base">{cat.name}</span>
      </Link>
    ))}
  </div>
  
  </div>
);

export default CategoryList;
