import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeBuilder = () => {
  const resumeRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    address: "",
    phone: "",
    email: "",
    skills: "",
    experience: "",
    education: "",
    awards: "",
    projects: "",
    certifications: "",
    languages: "",
    hobbies: "",
  });

  const fields = [
    { name: "name", type: "text", placeholder: "Full Name" },
    { name: "title", type: "text", placeholder: "Title (e.g., Creative Director)" },
    { name: "address", type: "text", placeholder: "Address" },
    { name: "phone", type: "text", placeholder: "Phone Number" },
    { name: "email", type: "email", placeholder: "Email" },
  ];

  const textAreas = [
    { name: "skills", placeholder: "Skills (comma-separated)" },
    { name: "experience", placeholder: "Experience (bullet points)" },
    { name: "education", placeholder: "Education (bullet points)" },
    { name: "awards", placeholder: "Awards (comma-separated)" },
    { name: "projects", placeholder: "Projects (comma-separated)" },
    { name: "certifications", placeholder: "Certifications (comma-separated)" },
    { name: "languages", placeholder: "Languages (comma-separated)" },
    { name: "hobbies", placeholder: "Hobbies (comma-separated)" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generatePDF = () => {
    const element = resumeRef.current;
    html2canvas(element, {
      scale: 2, // Improves quality
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      // Set the background color of the PDF to bg-gray-900
      pdf.setFillColor(26, 32, 44); // RGB equivalent of #1a202c (bg-gray-900)
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight > pageHeight ? pageHeight : imgHeight);
      pdf.save("resume.pdf");
    });
  };


  const clearForm = () => {
    setFormData({
      name: "",
      title: "",
      address: "",
      phone: "",
      email: "",
      skills: "",
      experience: "",
      education: "",
      awards: "",
      projects: "",
      certifications: "",
      languages: "",
      hobbies: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Form Section */}
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Resume Builder</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field, index) => (
            <input
              key={index}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              className="p-3 rounded bg-gray-800 border border-gray-700"
              value={formData[field.name]}
              onChange={handleChange}
            />
          ))}
          {textAreas.map((area, index) => (
            <textarea
              key={index}
              name={area.name}
              placeholder={area.placeholder}
              className="p-3 rounded bg-gray-800 border border-gray-700 col-span-1 md:col-span-2"
              value={formData[area.name]}
              onChange={handleChange}
            ></textarea>
          ))}
        </form>
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={clearForm}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded shadow hover:bg-red-600"
          >
            Clear Form
          </button>
          <button
            onClick={generatePDF}
            className="px-6 py-2 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600"
          >
            Generate Resume PDF
          </button>
        </div>
      </div>

      {/* Resume Preview Section */}
      <div
        className="max-w-[210mm] mx-auto bg-gray-900 p-6 rounded-lg shadow-lg"
        ref={resumeRef}
        style={{ width: "210mm", height: "297mm" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
          <div>
            <h1 className="text-4xl font-semibold text-white">{formData.name || "Your Name"}</h1>
            <h2 className="text-xl text-orange-500">{formData.title || "Your Title"}</h2>
          </div>
          <div className="text-right text-white">
            <p>{formData.address || "Your Address"}</p>
            <p>{formData.phone || "Your Phone"}</p>
            <p>{formData.email || "Your Email"}</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Skills</h3>
          <ul className="list-disc list-inside space-y-2 mt-2 text-white">
            {(formData.skills || "").split(",").map((skill, index) => (
              <li key={index}>{skill.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Experience */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Experience</h3>
          <ul className="list-disc list-inside space-y-2 mt-2 text-white">
            {(formData.experience || "").split("\n").map((exp, index) => (
              <li key={index}>{exp.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Education</h3>
          <ul className="list-disc list-inside space-y-2 mt-2 text-white">
            {(formData.education || "").split("\n").map((edu, index) => (
              <li key={index}>{edu.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Awards */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Awards</h3>
          <ul className="list-disc list-inside space-y-2 mt-2 text-white">
            {(formData.awards || "").split(",").map((award, index) => (
              <li key={index}>{award.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Projects</h3>
          <ul className="list-disc list-inside space-y-2 mt-2 text-white">
            {(formData.projects || "").split(",").map((project, index) => (
              <li key={index}>{project.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Certifications */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Certifications</h3>
          <ul className="list-disc list-inside space-y-2 mt-2 text-white">
            {(formData.certifications || "").split(",").map((certification, index) => (
              <li key={index}>{certification.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Languages</h3>
          <ul className="list-disc list-inside space-y-2 mt-2 text-white">
            {(formData.languages || "").split(",").map((language, index) => (
              <li key={index}>{language.trim()}</li>
            ))}
          </ul>
        </div>

        {/* Hobbies */}
        <div>
          <h3 className="text-2xl font-semibold text-white border-b border-gray-700 pb-2">Hobbies</h3>
          <ul className="list-disc list-inside space-y-2 mt-2 text-white">
            {(formData.hobbies || "").split(",").map((hobby, index) => (
              <li key={index}>{hobby.trim()}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
