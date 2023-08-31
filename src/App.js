import './App.css';
import ProposalList from './features/proposal/ProposalList';
import ProposalForm from './features/proposal/ProposalForm';
import { ToastAlert } from './utils/features/alert/Toast';


function App() {
  return (
    <div className="App max-h-[100vh]">
      <div className='w-full p-5'>
        <h1 className='text-3xl font-bold'>Loans For Good</h1>
      </div>
      <div className='flex px-10'>
        <div className="w-1/2 p-5 max-h-[90vh] overflow-y-auto">
          <h1 className="text-xl py-2">Request your proposal with us right now!</h1>
          <ProposalForm />
        </div>
        <div className="w-1/2 p-5 max-h-[90vh] overflow-y-auto">
          <h1 className="text-xl py-2">Check out our recent Proposals!</h1>
          <ProposalList />
        </div>
      </div>
      <div className="fixed left-2 bottom-2">
        <ToastAlert />
      </div>
    </div>
  );
}

export default App;
