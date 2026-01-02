export default function Section({ id, children }) {
  return (
    <section
      id={id}
      className="py-28 md:py-36 scroll-mt-28"
    >
      {children}
    </section>
  );
}
