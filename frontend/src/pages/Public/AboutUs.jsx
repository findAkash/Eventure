// AboutSection.js
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" name="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://scontent-cdg4-1.xx.fbcdn.net/v/t1.6435-9/78636550_1274926956042964_6998408050713296896_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=c7cdda&_nc_ohc=22kkjbLm2GgQ7kNvgE3fIzl&_nc_ht=scontent-cdg4-1.xx&oh=00_AYC5iq7xYD71FdSh3PlqWogEk8XSaB2IBcEJkKhlu9GQDQ&oe=66E239BB"
              alt="Team Member 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Akash Karmacharya</h3>
              <p className="text-gray-600">
                Akash is the founder and CEO, with a passion for innovation and
                technology.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://qph.cf2.quoracdn.net/main-qimg-c8f84675171d0f9c3536b47f3e8f059d-lq"
              alt="Team Member 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
              <p className="text-gray-600">
                Jane is the lead designer, known for her creative and
                user-focused designs.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://media.bizj.us/view/img/12487351/alex-johnsonpp*2000xx4480-2524-0-415.jpg"
              alt="Team Member 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Alex Johnson</h3>
              <p className="text-gray-600">
                Alex is the CTO, bringing expertise in technology and
                development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
