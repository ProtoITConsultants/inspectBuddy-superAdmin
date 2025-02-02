import Navbar from "./../components/Navbar";

const UserDetailsLayout = ({ children }) => {
  return (
    <main className="App overflow-x-hidden">
      <section className="fixed top-0 z-[10] flex">
        <Navbar withSidebar={false} />
      </section>
      <section className="md:p-[24px] p-[20px]">{children}</section>
    </main>
  );
};

export default UserDetailsLayout;
