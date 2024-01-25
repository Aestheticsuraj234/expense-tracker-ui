
import { ExpenseGraph } from '../_components/home/expense-graph';
import ExpenseForm from '../_components/home/expense-form';


const Home = () => {
  


  return (
    
      <main className="px-4 py-4 flex flex-col justify-start items-center">
        {/* <h1 className="text-3xl">
          Dashboard
        </h1> */}
        <div className="mt-10 mx-4">
          <ExpenseGraph />
        </div>
        <div className="mt-10 mx-4">
          <ExpenseForm />
        </div>
      </main>
      );
};

export default Home;
