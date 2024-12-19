import React from "react";
import { Disclosure } from "@headlessui/react";
import DownIcon from "../global/DownIcon";
import { bgGradient } from "../global/global_functions";

interface StatsInfoProps {
  id: number;
}

const StatsInfo: React.FC<StatsInfoProps> = ({ id }) => {

  const statInfo = [
    {
      id: 1,
      title: "IAESTE CER & CoRe",
      info: `The International Association for the Exchange of Students for Technical Experience (IAESTE) provides young science and engineering students with career-focused professional internships abroad and employers with highly skilled, highly motivated trainees. IAESTE Central European Region (IAESTE CER) and Connect Region (CoRe) are two regional initiatives, focused on the development of IAESTE in Europe.`
    },
    {
      id: 2,
      title: "Website's idea",
      info: `The idea for this website came from our own years of experience in providing abroad internships and a development workshop on one of our conferences. You will find here emergency contacts, public transport directions, and even fun facts (in case you're not sure how to start a conversation with a newly met intern while travelling with IAESTE)!\n
                    The International Association for the Exchange of Students for Technical Experience (IAESTE) provides young science and engineering students with career-focused professional internships abroad and employers with highly skilled, highly motivated trainees. IAESTE Central European Region (CER) and IAESTE Connect Region (CoRe) are two regional initiatives focused on the development of IAESTE in Europe.  Ten European countries met in January 1948 at the initiative of the Imperial College Vacation Work Committee, London led by Mr James Newby, hoping to change the lives of young people through an international exchange programme. Have they succeeded? Let's find out!`
    }
  ]

  const data = statInfo.find(stat => stat.id === id)

  return (
    <Disclosure as="div">
      {({ open }) => (
        <div>
          <dt>
            <Disclosure.Button className="flex w-64 items-start justify-between text-left text-gray-400 my-5">
              <span className={`hover:${bgGradient} bg-clip-text text-white hover:text-transparent text-xl font-semibold`}>
                {data?.title}
              </span>
              <DownIcon isOpen={open} />
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel as="dd" className="mt-2 pr-12">
            <p className="mt-5 text-lg text-gray-300">
              {data?.info.split('\n').map((paragraph: string, index: number) => (
                <span key={index}>{paragraph}<br></br></span>
              ))}
            </p>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}

export default StatsInfo;