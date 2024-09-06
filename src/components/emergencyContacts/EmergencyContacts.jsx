import React, { useState, useEffect } from 'react';
import { emergencyContacts } from "./emergencyContacts";
import css from "../app.module.css"

const EmergencyContacts = ({ country }) => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const eContacts = emergencyContacts.find((obj) => obj.country === country);
    const mappedContacts = Object.entries(eContacts).filter((obj) => obj[0] !== 'country').map(([key, value]) => {
      const getTitle = () => {
        switch (key) {
          case 'police':
            return 'Police'

          case 'ambulance':
            return 'Ambulance'

          case 'fire':
            return 'Fire department'

          default:
            return 'Emergency line'
        }
      }

      return {
        title: getTitle(),
        number: value
      }
    })

    setContacts(mappedContacts);
    setLoading(false);
  }, [country])

  if (!loading && contacts)
    return (
      <div className="bg-gray-100 pt-12 sm:pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className={css.title}>
              Emergency numbers
            </h2>
          </div>
        </div>
        <div className="mt-10 bg-white pb-12 sm:pb-16">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-100" />
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <dl className={`rounded-lg bg-white shadow-lg grid grid-cols-1 sm:grid-cols-${contacts.length}`}>
                  {contacts.map((contact, index) =>
                    <div key={index} className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                      <dt className="order-2 mt-2 text-base sm:text-lg font-medium leading-6 text-gray-500">
                        {contact.title}
                      </dt>
                      <dd className="order-1 text-5xl font-bold  text-[#0B3D59]">
                        {contact.number}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default EmergencyContacts;
