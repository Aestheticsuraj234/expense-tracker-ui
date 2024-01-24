import React from 'react'
import {ExpenseGraph} from '../_components/home/expense-graph'
import ExpenseForm from '../_components/home/expense-form'

const Home = () => {
// this is protected route, you can get user info like this



  return (
    <main className="px-4 py-4 flex flex-col ">
      <div className="mt-10 mx-4">
      <ExpenseGraph />
      </div>
      <div className="mt-10 mx-4">
      <ExpenseForm />
      </div>
    </main>
  )
}

export default Home