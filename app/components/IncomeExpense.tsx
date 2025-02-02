import { Separator } from '@/components/ui/separator';
import { getIncomeExpence } from '../actions/getIncomeExpense';

const IncomeExpense = async () => {

    const {income,expense} = await getIncomeExpence()
    return (
        <div className='flex m-3 h-16 justify-center'>
            <div className='w-28 flex flex-col justify-center items-center bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105'>
                <h1>Income</h1>
                <div>
                    <h1 className='text-green-500'>Rs.{income}</h1>
                </div>
            </div>
            <Separator orientation="vertical" className="mx-4" />
            <div className='w-28 flex flex-col justify-center items-center bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105'>
                <h1>Expense</h1>
                <div>
                    <h1 className='text-red-500'>Rs.{expense !== undefined ? Math.abs(expense) : 0}</h1>
                </div>
            </div>
        </div>
    );
};

export default IncomeExpense;