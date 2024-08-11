import naveen from "../assets/naveen.jpg";
const About = () => {
  return (
    <section className="about py-12 px-4 bg-gray-100  ">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">About Me</h2>
        <div className="flex flex-col items-center">
          <img
            src={naveen}
            alt="Your Name"
            className="w-48 h-48 rounded-full mb-4"
          />
          <h1 className="text-2xl w-[80%] font-bold ">
            Hello! I'm Naveen Vinod Kumar{" "}
            <p className="text-start text-lg mt-1 font-normal ">
              a passionate writer with a deep love for technology, travel,
              anime, video editing, photography . I’ve created this blog to
              share my insights, experiences, and discoveries with you. Whether
              it's [specific interests, e.g., exploring the latest tech trends,
              uncovering hidden travel gems, or perfecting a new recipe], I dive
              into topics that spark curiosity and inspire action. My mission is
              to [briefly state your blog's mission or goal, e.g., help you stay
              informed about cutting-edge technology, provide travel tips that
              make your next adventure unforgettable, or share recipes that
              bring joy to your kitchen]. Join me on this journey as we explore
              [mention what readers can expect, e.g., groundbreaking
              innovations, exciting travel destinations, or delightful culinary
              experiments]. Let’s discover new things together and make every
              moment count!
            </p>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default About;
