import { funfacts } from "./facts";
import FactCard from "./FactCard";

const Facts = ({ country }) => {
  const facts = funfacts.find((obj) => obj.country === country);

  return (
    <>
    { facts.length ? (
    <section
    aria-labelledby="testimonial-heading"
    className="relative mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:py-32 lg:px-8"
  >
    <div className="mx-auto max-w-2xl lg:max-w-none">
      <h2
        id="testimonial-heading"
        className="text-2xl font-bold tracking-tight text-gray-900"
      >
        Did you know?
      </h2>

      <div className="mt-4 space-y-16 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
        {facts.facts.map((fact) => (
          <FactCard fact={fact} />
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
