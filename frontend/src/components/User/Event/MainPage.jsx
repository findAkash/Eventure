import React, { useState } from 'react';
import EventCard from './EventCard';
import FilterSection from './FilterSection';

const events = [
  {
    id: 1,
    title: 'Sample Event 1',
    images: [
      'https://via.placeholder.com/600x400?text=Event+1',
      'https://via.placeholder.com/600x400?text=Event+2',
    ],
    date: '2024-08-15',
    time: '18:00',
    location: 'Venue 1',
    description:
      'This is a detailed description of sdaf sdflsadkf sadlfksdalkfsa adflk flsda l kl aslf salfjsdl fjlsa ldsjlkajfdlsdf.mla lfsf msam lkdsmfskdmf lmdsl k the event that should be long enough to demonstrate the view more functionality. The description should include all relevant details about the event, its highlights, and any additional information that may interest potential attendees. It could also mention any special features of the event or what makes it unique.',
    charge: '$25',
    postedBy: 'John Doe',
    participants: 120,
  },
  {
    id: 2,
    title: 'Sample Event 2',
    images: [
      'https://via.placeholder.com/600x400?text=Event+3',
      'https://via.placeholder.com/600x400?text=Event+4',
    ],
    date: '2024-08-20',
    time: '20:00',
    location: 'Venue 2',
    description:
      'Another detailed description of an event. This description should also be lengthy to fully demonstrate the view more functionality. It should provide all necessary information about the event, including its features, benefits, and any other details that might be of interest to attendees.',
    charge: '$25',
    postedBy: 'John Doe',
    participants: 120,
  },
  {
    id: 1,
    title: 'Sample Event 1',
    images: [
      'https://via.placeholder.com/600x400?text=Event+1',
      'https://via.placeholder.com/600x400?text=Event+2',
    ],
    date: '2024-08-15',
    time: '18:00',
    location: 'Venue 1',
    description:
      'This is a detailed description of sdaf sdflsadkf sadlfksdalkfsa adflk flsda l kl aslf salfjsdl fjlsa ldsjlkajfdlsdf.mla lfsf msam lkdsmfskdmf lmdsl k the event that should be long enough to demonstrate the view more functionality. The description should include all relevant details about the event, its highlights, and any additional information that may interest potential attendees. It could also mention any special features of the event or what makes it unique.',
    charge: '$25',
    postedBy: 'John Doe',
    participants: 120,
  },
  {
    id: 2,
    title: 'Sample Event 2',
    images: [
      'https://via.placeholder.com/600x400?text=Event+3',
      'https://via.placeholder.com/600x400?text=Event+4',
    ],
    date: '2024-08-20',
    time: '20:00',
    location: 'Venue 2',
    description:
      'Another detailed description of an event. This description should also be lengthy to fully demonstrate the view more functionality. It should provide all necessary information about the event, including its features, benefits, and any other details that might be of interest to attendees.',
    charge: '$25',
    postedBy: 'John Doe',
    participants: 120,
  },
  {
    id: 1,
    title: 'Sample Event 1',
    images: [
      'https://via.placeholder.com/600x400?text=Event+1',
      'https://via.placeholder.com/600x400?text=Event+2',
    ],
    date: '2024-08-15',
    time: '18:00',
    location: 'Venue 1',
    description:
      'This is a detailed description of sdaf sdflsadkf sadlfksdalkfsa adflk flsda l kl aslf salfjsdl fjlsa ldsjlkajfdlsdf.mla lfsf msam lkdsmfskdmf lmdsl k the event that should be long enough to demonstrate the view more functionality. The description should include all relevant details about the event, its highlights, and any additional information that may interest potential attendees. It could also mention any special features of the event or what makes it unique.',
    charge: '$25',
    postedBy: 'John Doe',
    participants: 120,
  },
  {
    id: 2,
    title: 'Sample Event 2',
    images: [
      'https://via.placeholder.com/600x400?text=Event+3',
      'https://via.placeholder.com/600x400?text=Event+4',
    ],
    date: '2024-08-20',
    time: '20:00',
    location: 'Venue 2',
    description:
      'Another detailed description of an event. This description should also be lengthy to fully demonstrate the view more functionality. It should provide all necessary information about the event, including its features, benefits, and any other details that might be of interest to attendees.',
    charge: '$25',
    postedBy: 'John Doe',
    participants: 120,
  },
];

const HomePage = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    showPersonal: false,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Here, you would typically fetch and filter the events based on the new filters
    console.log('Filters applied:', newFilters);
  };

  return (
    <div className="p-4 flex space-x-6 pt-20">
      {/* Filter Section */}
      {/* <div className="w-80 flex-shrink-0">
        <FilterSection onFilterChange={handleFilterChange} />
      </div> */}

      {/* Event Container */}
      <div className="flex-1 mx-auto max-w-7xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
