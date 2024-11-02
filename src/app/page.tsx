"use client"

import {  ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import data from "@/data.json"

interface Employee {
  id: string;
  name: string;
  email: string;
  status: string;
  position: string;
}

export default function Home() {
  const [searchParam, setSearchParam] = useState('')
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  useEffect(()=>{
    setEmployees(data.employees)
  },[] )
  const filteredEmployees = employees.filter((employee) => {
    const isMatchingSearch = employee.name.toLowerCase().includes(searchParam);
    const isActive = filter === 'active' ? employee.status === 'active' : true;
    const isInactive = filter === 'inactive' ? employee.status === 'inactive' : true;

    return isMatchingSearch && isActive && isInactive;
  });
 
  console.log(employees)
  return (
    <div className=" flex relative p-6 flex-col w-[100vw] h-[100vh] gap-6 text-gray-600 bg-gradient-to-r from-violet-200 to-pink-200">
      {/* navbar */}
      <div className="flex items-center w-full relative justify-between">
        {/* search bar */}
        <div className="px-3 py-1.5 h-10  bg-white flex gap-2 rounded-xl border-gray-400 border-2 ">
          <Search  color="#a8a8a8" />
          <input placeholder="search..." className="border-none outline-nonex focus:outline-none" type="text" onChange={(event)=>setSearchParam(event.target.value.toLowerCase())} />

        </div>
        {/* user info */}
        <div className="flex gap-3 py-.15 items-center justify-center">
          {/* userImage */}
          <div className="h-[52px] w-[52px] rounded-full overflow-hidden border-2 border-red-400">
            <Image src={"/profile.jpg"} height={100} width={180} alt={""} />
          </div>
          {/* userInfo */}
          <div className="text-xl items-center justify-center  flex gap-2 tracking-wide">
            Tanishk Dhaka
            <ChevronDown color="black" />
          </div>
        </div>
      </div>

      {/* Employee section */}
      <div className="flex justify-between pr-5">
        <h1 className="text-2xl font-extrabold">Employees</h1>
        {/* filter */}
        <div className="gap-8 flex text-xl">

        <button onClick={() => setFilter('all')} className={`p-2 rounded-xl w-20  ${filter === 'all' ? 'bg-purple-500 text-black' :""}`}>All</button>
          <button onClick={() => setFilter('active')} className={`p-2  rounded-xl w-20 ${filter === 'active' ? 'bg-purple-500 text-black' : ''}`}>Active</button>
          <button onClick={() => setFilter('inactive')} className={`p-2 rounded-xl  ${filter === 'inactive' ? 'bg-purple-500 text-black' : ''}`}>Inactive</button>


        </div>
      </div>

      {/* Employee cards */}
      <div className="grid grid-cols-3 gap-10">
          {
           filteredEmployees.map((items,i)=>(
              <div key={i} className="flex p-4 bg-[#E8F0F1] rounded-xl gap-3">
              {/* Employee Image */}
              <div className="h-[60px] w-[60px] rounded-full overflow-hidden border-2 border-red-400">
            <Image src={"/profile.jpg"} height={100} width={180} alt={""} />
          </div>
              <div className="flex flex-col ">
                {/* employeename */}
                <h1 className="text-xl font-semibold">{items.name}</h1>

                {/* employeeProfile */}
                <h2 className="text-sm">{items.position}</h2>
                {/* email */}
                <h2 className="text-sm pt-6"> Email:-{'  '}{" "}{items.email}</h2>

                {/* buttons */}

                <div className="flex justify-evenly pt-6 tracking-widest">
                  <button className="border-2  border-black p-2 rounded-lg">Block</button>
                  <button className="bg-black text-white p-2 rounded-lg ">Details</button>
                </div>
              </div>
            </div>
            ))
          }
      </div>
    </div>
  );
}
