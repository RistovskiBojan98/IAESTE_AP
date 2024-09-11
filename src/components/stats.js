import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { classNames } from "./global_functions";

const metrics = [
  { id: 1, stat: "18", emphasis: "Member countries" },
  { id: 2, stat: "50+", emphasis: "Local Committees" },
  { id: 3, stat: "1K+", emphasis: "Internships" },
  { id: 4, stat: "1.5K+", emphasis: "Student Members" },
];

export default function Stats() {
  return (
    <div className="bg-white">
      <main>
        {/* Stats section */}
        <div className="relative bg-[#0B3D59]">
          <div className="absolute inset-x-0 bottom-0 h-80 xl:top-0 xl:h-full">
            <div className="h-full w-full xl:grid xl:grid-cols-2">
              <div className="h-full xl:relative xl:col-start-2 hidden xl:block">
                <img
                  className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                  src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100"
                  alt="People working on laptops"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r to-[#49C0B5] mix-blend-multiply"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">
            <div className="relative py-12 xl:col-start-1">
              <h2 className="text-white text-3xl font-semibold">
                About us
              </h2>
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button
                        className="flex w-full items-start justify-between text-left text-gray-400 mt-5"
                        style={{ width: "16.5rem" }}
                      >
                        <span
                          className="bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] bg-clip-text text-transparent"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                          }}
                        >
                          IAESTE CER & CoRe
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-6 w-6 transform"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p
                        className="mt-5 text-lg text-gray-300"
                        style={{ fontSize: "1rem" }}
                      >
                        The International Association for the Exchange of Students for
                        Technical Experience (IAESTE) provides young science and
                        engineering students with career-focused professional
                        internships abroad and employers with highly skilled, highly
                        motivated trainees. IAESTE Central European Region (IAESTE CER)
                        and Connect Region (CoRe) are two regional initiatives, focused
                        on the development of IAESTE in Europe.
                      </p>
                      <p
                        className="mt-5 text-lg text-gray-300"
                        style={{ fontSize: "1rem" }}
                      >
                        <b>
                          Feel like applying to one of the hundreds of our internships?
                        </b>
                        <br />
                        Visit:{" "}
                        <a
                          href="https://iaeste.org/internships"
                          className="text-white font-medium underline"
                        >
                          IAESTE.org/internships
                        </a>
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              <div className="mt-12 grid grid-cols-2 gap-y-12 gap-x-6 sm:grid-cols-2">
                {metrics.map((item) => (
                  <p key={item.id}>
                    <span
                      className="block text-4xl font-semibold text-white"
                    >
                      {item.stat}
                    </span>
                    <span className="mt-1 block text-base text-gray-300">
                      <span
                        className="font-medium text-white"
                      >
                        {item.emphasis}
                      </span>{" "}
                      {item.rest}
                    </span>
                  </p>
                ))}
              </div>
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button
                        className="flex w-full items-start justify-between text-left text-gray-400"
                        style={{ width: "13rem", marginTop: "50px" }}
                      >
                        <span
                          className="bg-gradient-to-r from-[#1B75BB] via-[#27A9E1] to-[#49C0B5] bg-clip-text text-transparent"
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "600",
                          }}
                        >
                          Website's idea
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-6 w-6 transform"
                            )}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-lg text-gray-300">
                        The International Association for the Exchange of
                        Students for Technical Experience (IAESTE) provides
                        young science and engineering students with
                        career-focused professional internships abroad and
                        employers with highly skilled, highly motivated
                        trainees. IAESTE Central European Region (CER) and
                        IAESTE Connect Region (CoRe) are two regional
                        initiatives focused on the development of IAESTE in
                        Europe. <br /> Ten European countries met in January
                        1948 at the initiative of the Imperial College Vacation
                        Work Committee, London led by Mr James Newby, hoping to
                        change the lives of young people through an
                        international exchange programme. Have they succeeded?
                        Let's find out! <br />
                        The idea for this website came from our own years of
                        experience in providing abroad internships. You will
                        find here emergency contacts, public transport
                        directions, and even fun facts (in case you're not sure
                        how to start a conversation with a newly met intern
                        while <i>travelling with IAESTE</i>)!
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
