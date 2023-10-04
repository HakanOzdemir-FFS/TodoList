const NewTodo = () => {
  return (
    <div className="max-w-full flex p-10">
      <div className="mx-auto flex items-center space-x-10  whitespace-nowrap">
        <button className="lnr lnr-arrow-left text-7xl font-bold hover:text-sky-500 duration-150"></button>
        <button className="bg-sky-500 py-6 px-40 text-4xl font-bold text-white rounded-3xl shadow-xl">
          Add New Todo
        </button>
        <button className="lnr lnr-arrow-right text-7xl font-bold hover:text-sky-500 duration-150"></button>
      </div>
    </div>
  );
};

export default NewTodo;
