import { funfacts } from "./facts";
import FactCard from "./FactCard";

const Facts = ({ country }) => {
  const facts = funfacts.find((obj) => obj.country === country);

  return (
    <>
    { facts ? (
    <section
    aria-labelledby="testimonial-heading"
    className="relative mx-auto max-w-7xl p-4 sm:px-6 mb-10 "
  >
    <div className="mx-auto max-w-2xl lg:max-w-none">
      <h2
        id="testimonial-heading"
        className="text-2xl font-bold tracking-tight text-gray-900"
      >
        Did you know?
      </h2>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:space-y-0">
        {facts.facts.map((fact, index) => (
          <FactCard fact={fact} key={index}/>
        ))}
      </div>
    </div>
  </section>
    ) : (
      <></>
    )}
    </>

  );
};

export default Facts;
