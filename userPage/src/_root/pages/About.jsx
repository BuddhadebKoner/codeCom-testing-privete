import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Apply GSAP ScrollTrigger animations on page load
    const animateOnScroll = () => {
      // Animate the header text on scroll
      gsap.from('.header-text', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.header-text',
          start: 'top 80%',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Animate each section title
      gsap.from('.section-title', {
        opacity: 0,
        y: 50,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 75%',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Animate list items with a fade-in and slide-up effect
      gsap.from('.list-item', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.list-item',
          start: 'top 80%',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Animate card-like components with rotation and scaling effects
      gsap.from('.card', {
        opacity: 0,
        scale: 0.8,
        rotationX: 90,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.card',
          start: 'top 85%',
          end: 'bottom top',
          scrub: true,
        },
      });
    };

    animateOnScroll();
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About CodeComm</title>
      </Helmet>
      <div className="w-full h-fit text-gray-800 dark:text-gray-200 pb-10 px-5 lg:px-10">
        <div className="max-w-full">
          {/* Header */}
          <header className="mb-10">
            <div className='w-fit h-fit flex items-center justify-center gap-2 border-b-4 border-indigo-500'>
              <img
                onClick={() => navigate('/')}
                width={40}
                src="/assets/arrow_back.svg"
                className='cursor-pointer'
                alt="arrowback" />
              <h1 className="text-4xl font-bold inline-block pb-2 header-text opacity-100"> {/* Added opacity 100 */}
                About CodeComm
              </h1>
            </div>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Welcome to CodeComm, where innovation meets collaboration. Explore our mission, vision, and core values.
            </p>
          </header>

          {/* Vision and Mission */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4 section-title">Vision and Mission</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li className="list-item">Create a collaborative and innovative ecosystem for students to excel in technology and creativity.</li>
              <li className="list-item">Foster skill development through workshops, hackathons, and hands-on projects.</li>
              <li className="list-item">Inspire innovation and promote knowledge sharing among all expertise levels.</li>
              <li className="list-item">Bridge academia and industry with expert sessions and networking events.</li>
              <li className="list-item">Leverage technology to address societal challenges and promote inclusivity.</li>
            </ul>
          </section>

          {/* Club Hierarchy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4 section-title">Club Hierarchy and Roles</h2>
            <div className="space-y-6">
              {[
                { title: 'Faculty Mentors & HOD', description: 'Provide guidance and mentorship, aligning the club with academic policies.' },
                { title: 'President', description: 'Oversees club activities and represents it at official events.' },
                { title: 'Vice President', description: 'Supports the President and manages operations in their absence.' },
                { title: 'Tech Leads', description: 'Head technical projects and organize workshops on programming and emerging technologies.' },
                { title: 'Specialization Leads', description: 'Focus on specific domains like AI, web development, and cybersecurity.' },
                { title: 'Treasurer', description: 'Manages the club’s financial records and oversees budgets.' },
                { title: 'Documentation Handler', description: 'Maintains records and prepares reports for club activities.' },
                { title: 'Student Coordinators', description: 'Promote events and assist in logistical tasks for smooth execution.' },
              ].map((role, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 card"
                >
                  <h3 className="text-xl font-medium mb-2">{role.title}</h3>
                  <p>{role.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Membership Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4 section-title">Membership Policy</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li className="list-item">Eligibility: Open to all college students from all departments and faculties.</li>
              <li className="list-item">Registration Fee: Annual membership fee of Rs. 21.</li>
              <li className="list-item">Benefits: E-certificates, goodies, and access to exclusive club activities.</li>
            </ul>
          </section>

          {/* Footer */}
          <footer className="text-center mt-10">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              For more information, contact the CodeComm team or visit our events.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default About;
