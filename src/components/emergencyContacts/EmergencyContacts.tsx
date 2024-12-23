import React, { useState, useEffect } from 'react';
import { EmergencyContactsType, CountryComponent } from '../../types/Types';

const EmergencyContacts: React.FC<CountryComponent> = ({ country }) => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<EmergencyContactsType[]>([]);
  const [secondRowContacts, setSecondRowContacts] = useState<EmergencyContactsType[]>([])

  useEffect(() => {
    const emergencyContacts = country?.emergencyContacts ?? []
    if (emergencyContacts.length <= 3) {
      const mappedContants = emergencyContacts.map(contact => ({
        ...contact,
        title: contact.title !== "Fire Department" ? contact.title : "Fire Dpt."
      }))
      setContacts(mappedContants)
    }
    else {
      setContacts([emergencyContacts[0], emergencyContacts[1]])
      setSecondRowContacts([emergencyContacts[2], emergencyContacts[3]])
    }
    setLoading(false);
  }, [country])

  if (!loading && contacts) {
    return (
      <div className="bg-gray-100 pt-12">
        <div className="containerPosition text-center px-4 sm:px-6 lg:px-8">
          <h2 className="title">
            <i className='fa fa-phone mr-4'></i>
            Emergency numbers
          </h2>
        </div>
        <div className="mt-10 bg-white">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-100" />
            <div className="relative containerPosition} px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <dl className={`rounded-lg bg-white shadow-lg grid ${!secondRowContacts.length ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'}`}>
                  {contacts.map((contact, index) =>
                    <div key={index} className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 border-r">
                      <dd className="text-3xl sm:text-5xl font-bold text-[#0B3D59]">
                        {contact.number}
                      </dd>
                      <dt className="mt-2 text-base sm:text-lg font-medium leading-6 text-gray-500">
                        {contact.title}
                      </dt>
                    </div>
                  )}
                  {secondRowContacts.map((contact, index) =>
                    <div key={index} className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 border-r">
                      <dd className="text-3xl sm:text-5xl font-bold text-[#0B3D59]">
                        {contact.number}
                      </dd>
                      <dt className="mt-2 text-base sm:text-lg font-medium leading-6 text-gray-500">
                        {contact.title}
                      </dt>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } return <></>
};

export default EmergencyContacts;
