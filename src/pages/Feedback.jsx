import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react"
import axios from "axios";

const Feedback = () => {
    const [form , setForm] = useState({
        name : '',
        email : '',
        message : ''    
    })

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:5000/api/feedback', form);
            setForm({name: '', email: '', message: ''})
            
        }
        catch (error){
            console.alert('something went wrong')
        }
        
    }

  return (
    <>
      <Navbar />

      <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
            Send Us Your Feedback
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                onChange={handleChange}
                value={form.name}
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                onChange={handleChange}
                value={form.email}
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Message</label>
              <textarea
              name="message"
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your feedback..."
                onChange={handleChange}
                value={form.message}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Feedback;