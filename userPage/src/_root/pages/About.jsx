import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About CodeComm</title>
      </Helmet>
      <div className=" text-gray-800 dark:text-gray-200 pb-10">
        <div className="max-w-full">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl font-bold border-b-4 border-indigo-500 inline-block pb-2">
              About CodeComm
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
              Welcome to CodeComm, where innovation meets collaboration. Explore our mission, vision, and core values.
            </p>
          </header>

          {/* Vision and Mission */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">Vision and Mission</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>Create a collaborative and innovative ecosystem for students to excel in technology and creativity.</li>
              <li>Foster skill development through workshops, hackathons, and hands-on projects.</li>
              <li>Inspire innovation and promote knowledge sharing among all expertise levels.</li>
              <li>Bridge academia and industry with expert sessions and networking events.</li>
              <li>Leverage technology to address societal challenges and promote inclusivity.</li>
            </ul>
          </section>

          {/* Club Hierarchy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">Club Hierarchy and Roles</h2>
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
                  className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="text-xl font-medium mb-2">{role.title}</h3>
                  <p>{role.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Membership Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-4">Membership Policy</h2>
            <ul className="space-y-3 list-disc list-inside">
              <li>Eligibility: Open to all college students from all departments and faculties.</li>
              <li>Registration Fee: Annual membership fee of Rs. 21.</li>
              <li>Benefits: E-certificates, goodies, and access to exclusive club activities.</li>
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
