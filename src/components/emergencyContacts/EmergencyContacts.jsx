import { emergencyContacts } from "./emergencyContacts";
import css from "../app.module.css"

const EmergencyContacts = ({ country }) => {
  const contacts = emergencyContacts.find((obj) => obj.country === country);

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
              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-base sm:text-lg font-medium leading-6 text-gray-500">
                    Police
                  </dt>
                  <dd className="order-1 text-5xl font-bold  text-[#0B3D59]">
                    {contacts.police}
                  </dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Ambulance
                  </dt>
                  <dd className="order-1 text-5xl font-bold  text-[#0B3D59]">
                    {contacts.ambulance}
                  </dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">
                    Fire department
                  </dt>
                  <dd className="order-1 text-5xl font-bold  text-[#0B3D59]">
                    {contacts.fire}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;
