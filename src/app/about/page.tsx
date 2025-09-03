'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../components/landingPage/navBar';
import Footer from '../components/landingPage/footer';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'David Ayim Obuobi',
      role: 'Lead Developer',
      description: 'Full-stack developer with expertise in building scalable web applications and implementing robust backend systems.',
      image: '/images/david.jpeg',
    },
    {
      name: 'Daniella Asiedu',
      role: 'UI/UX Designer',
      description: 'Creative designer specializing in user-centered design, creating intuitive and beautiful user interfaces.',
      image: '/images/daniella.png',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl font-poppins tracking-tight">
              About <span className="text-red-600">Lifeline</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Empowering communities with life-saving knowledge and emergency resources
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-black shadow-lg p-6 sm:p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At Lifeline, we believe that access to emergency information and first aid knowledge should be available to everyone, 
              everywhere. Our mission is to provide reliable, easy-to-understand emergency resources that can help save lives.
            </p>
            <p className="text-gray-700">
              Whether you&apos;re looking for first aid instructions, emergency contact numbers, or life-saving courses, 
              Lifeline is your trusted companion in times of need.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl border-2 border-black overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                      <div className="w-full sm:w-40 md:w-48 flex-shrink-0">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <Image
                            src={member.image} 
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/woman.png';
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{member.name}</h3>
                        <p className="text-red-600 font-semibold mt-1 mb-3 text-lg">{member.role}</p>
                        <p className="text-gray-600 text-sm sm:text-base">{member.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-black shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              <span className="relative inline-block">
                Get Involved
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-red-600 transform scale-x-75"></span>
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Volunteer</h3>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Join our team of volunteers and help us make a difference in your community.
                </p>
                <Link 
                  href="/volunteer" 
                  className="inline-flex items-center text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Donate</h3>
                <p className="text-gray-600 mb-5 leading-relaxed">
                  Support our mission by making a contribution to help us reach more people.
                </p>
                <Link 
                  href="/donate" 
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Donate now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
