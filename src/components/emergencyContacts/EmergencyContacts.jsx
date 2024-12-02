import React, { useState, useEffect } from 'react';
import css from "../app.module.css"

const EmergencyContacts = ({ country }) => {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setContacts(country.emergencyContacts ?? []);
    setLoading(false);
  }, [country])

  if (!loading && contacts) {
    const cols = contacts.length;
    const mobCols = contacts.length === 3 ? 3 : 2;

    return (
      <div className="bg-gray-100 pt-12">
        <div className={`${css.containerPosition} text-center px-4 sm:px-6 lg:px-8`}>
            <h2 className={css.title}>
              Emergency numbers
            </h2>
        </div>
        <div className="mt-10 bg-white">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-100" />
            <div className={`relative ${css.containerPosition} px-4 sm:px-6 lg:px-8`}>
              <div className="mx-auto max-w-4xl">
                <dl className={`rounded-lg bg-white shadow-lg grid grid-cols-${mobCols} sm:grid-cols-${cols}`}>
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
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EmergencyContacts;
